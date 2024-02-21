import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const FileUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          onUploadComplete(url)
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default FileUploader;
