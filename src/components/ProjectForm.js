
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectForm.css'; // Import the CSS file

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
      setFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.length < 15) {
      alert("Title must be at least 15 words.");
      return;
    }
    if (description.length < 50) {
      alert("Description must be at least 50 words.");
      return;
    }
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      // Replace with your backend endpoint
      const response = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Project created successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
        navigate('/upload-success'); // Redirect to success page
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter at least 15 words"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter at least 50 words"
          />
        </div>
        <div className="form-group">
          <label>PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="submit-button">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
// import React, { useState } from 'react';
// import axios from 'axios';

// const ProjectForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!title || !description || !file) {
//       alert("All fields are required.");
//       return;
//     }

//     // Create form data
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('file', file);

//     try {
//       // Replace with your backend endpoint
//       const response = await axios.post('http://localhost:5000/api/projects', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         alert('Project created successfully!');
//         setTitle('');
//         setDescription('');
//         setFile(null);
//       }
//     } catch (error) {
//       console.error("There was an error uploading the file!", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>PDF File</label>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//       </div>
//       <button type="submit">Create Project</button>
//     </form>
//   );
// };

// export default ProjectForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/ProjectForm.css'; // Import the CSS file

// const ProjectForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!title || !description || !file) {
//       alert("All fields are required.");
//       return;
//     }

//     // Create form data
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('file', file);

//     try {
//       // Replace with your backend endpoint
//       const response = await axios.post('http://localhost:5000/api/projects', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         alert('Project created successfully!');
//         setTitle('');
//         setDescription('');
//         setFile(null);
//       }
//     } catch (error) {
//       console.error("There was an error uploading the file!", error);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Create a New Project</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>PDF File</label>
//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button type="submit" className="submit-button">Create Project</button>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;
