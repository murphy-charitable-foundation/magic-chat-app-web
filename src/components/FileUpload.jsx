import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { FileUpload } from "@mui/icons-material";


const FileUploader = ({ onUploadComplete, chatId }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile)
  };

  const handleUpload = async (file) => {
    if (file) {
      console.log('uploading')
      const storageRef = ref(storage, `attachments/${chatId}/${file.name}`);
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
          onUploadComplete(url)
        }
      );
    }
  };

  return (
    <div>
      <input type="file" hidden onChange={handleChange} disabled={uploadProgress > 0 && uploadProgress < 100} id="raised-button-file" />
      <label htmlFor="raised-button-file">
        <FileUpload style={{cursor: "pointer"}}/>
      </label> 
      {uploadProgress > 0 && uploadProgress < 100 && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default FileUploader;
