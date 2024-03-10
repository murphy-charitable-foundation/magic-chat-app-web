import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const FileUploader = ({ onUploadComplete, chatId }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile)
  };

  const handleUpload = async (file) => {
    if (file) {
      console.log('uploading')
      const storageRef = ref(storage, `uploads/letterbox/${chatId}/${file.name}`);
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
      <input type="file" onChange={handleChange} disabled={uploadProgress > 0 && uploadProgress < 100} />
      {uploadProgress > 0 && uploadProgress < 100 && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default FileUploader;
