import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContestantUpload = () => {
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5100/api/userFiles");
      setUploadedFiles(response.data.urls || []); // Ensure uploadedFiles is an array
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchSignedURL = async () => {
    try {
      const response = await axios.get("http://localhost:5100/api/images");
      const { uploadURL, key } = response.data;
      if (!uploadURL) {
        throw new Error('Received an invalid signed URL');
      }
      return { uploadURL, key };
    } catch (error) {
      console.error('Error fetching signed URL:', error);
      setStatusMessage("Failed to get upload URL. Please try again.");
      return null;
    }
  };

  const uploadUserFile = async (uploadURL, key) => {
    try {
      const response = await axios.put(uploadURL, file, {
        headers: {
          "Content-Type": file.type
        }
      });

      if (response.status === 200 || response.status === 201) {
        await saveImageURL(uploadURL, key);
        setStatusMessage("File uploaded successfully!");
        setFile(null);
        fetchUploadedFiles(); // Refresh the list of uploaded files
      } else {
        setStatusMessage(`File upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatusMessage("Error uploading file. Please try again.");
    }
  };

  const saveImageURL = async (uploadURL, key) => {
    try {
      await axios.post("http://localhost:5100/api/save-image", { url: uploadURL, key });
    } catch (error) {
      console.error('Error saving image URL:', error);
      setStatusMessage("Error saving image URL. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await fetchSignedURL();

    if (result) {
      const { uploadURL, key } = result;
      await uploadUserFile(uploadURL, key);
    }
  };

  const deleteFile = async (key) => {
    try {
      const response = await axios.delete("http://localhost:5100/api/deleteFile", {
        data: { key }
      });
      if (response.status === 200) {
        setUploadedFiles((prevFiles) => prevFiles.filter(file => file.key !== key));
        setStatusMessage("File deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setStatusMessage("Error deleting file. Please try again.");
    }
  };

  return (
    <div className='bg-pink div flex flex-col justify-center items-center text-gray-700 font-semibold py-5'>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className='bg-blue-600 rounded-lg py-4 px-6 text-white font-semibold'>Upload</button>
      </form>
      <p>{statusMessage}</p>

      <div>
        <h3>Uploaded Files:</h3>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.key}>
              {file.key}
              <button onClick={() => deleteFile(file.key)} className='bg-red-600 rounded-lg py-2 px-4 text-white font-semibold ml-2'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContestantUpload;
