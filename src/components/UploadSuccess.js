import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UploadSuccess.css'; // Import the CSS file

const UploadSuccess = () => {
  return (
    <div className="success-container">
      <h2>File Uploaded Successfully!</h2>
      <p>Check the status in the Dashboard.</p>
      <Link to="/dashboard" className="dashboard-link">Go to Dashboard</Link>
    </div>
  );
};

export default UploadSuccess;
