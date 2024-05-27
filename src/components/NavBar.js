// import React from 'react';
// import { Link } from 'react-router-dom';

// import '../styles/navbar.css'; // Import the CSS file for Navbar styling

// function Navbar() {
//   return (
// <nav className="navbar">
//       <ul className="navbar-list">
//         <li className="navbar-item">
//         <Link to="/">Home</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/upload-pdf">Upload PDF</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faOpera } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css'; // Import the CSS file for Navbar styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">CHATPOD</h1>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/upload-pdf">Upload PDF</Link>
        </li>
        <li className="navbar-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <a href="https://github.com/Akshit492" target="_blank" rel="noopener noreferrer" className="navbar-icon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://akshitsportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="navbar-icon">
          <FontAwesomeIcon icon={faOpera} />
        </a>
        <a href="https://www.linkedin.com/in/akshit-singla492/" target="_blank" rel="noopener noreferrer" className="navbar-icon">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
