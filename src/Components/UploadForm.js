// UploadForm.js
import React from 'react';
import "./UploadForm.css"

const UploadForm = ({ onUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div className='upload-form-container'>
      <label htmlFor="uploadInput">Choose a file</label>
      <input type="file" id="uploadInput" accept=".mp3" onChange={handleChange} />
    </div>
  );
};

export default UploadForm;
