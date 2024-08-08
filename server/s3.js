import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import { promisify } from "util";

dotenv.config();

const region = "eu-north-1";
const bucketName = "votesy-files";
const accessKeyId = process.env.MY_AWS_ACCESS_KEY;
const secretAccessKey = process.env.MY_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS_ACCESS_KEY and SECRET_ACCESS_KEY must be set in the .env file");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const randomBytesAsync = promisify(randomBytes);

export async function generateUploadURL() {
  try {
    const rawBytes = await randomBytesAsync(16);
    const imageName = rawBytes.toString('hex');

    const params = {
      Bucket: bucketName,
      Key: imageName,
    };

    const command = new PutObjectCommand(params);
    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });


    return { key: imageName, uploadURL }; // Return both key and URL
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}


// Example usage
// generateUploadURL()
//   .then(url => console.log('Signed URL:', url))
//   .catch(error => console.error('Error:', error));
