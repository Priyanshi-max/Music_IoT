// UploadForm.js
import React from 'react';

const UploadForm = ({ onUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".mp3" onChange={handleChange} />
    </div>
  );
};

export default UploadForm;
