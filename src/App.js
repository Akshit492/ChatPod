import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/Home';
import ProjectForm from './components/ProjectForm';
import Dashboard from './components/DashBoard';
import ChatInterface from './components/ChatInterface'; // Import ChatInterface component
import Layout from './components/layout';
import UploadSuccess from './components/UploadSuccess';

function App() {
  const [typingStarted, setTypingStarted] = useState(false); // State to track if typing has started

  // Function to handle typing start
  const handleTypingStart = () => {
    setTypingStarted(true); // Set typingStarted to true when typing starts
  };
  return (
    <Router>    
      <div className="App">
      <Layout handleTypingStart={handleTypingStart}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route exact path="/upload-pdf" element={<ProjectForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:projectId/chat" element={<ChatInterface />} /> {/* Route for ChatInterface */}
          <Route path="/upload-success" element={<UploadSuccess />}/>
        </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Layout from './components/layout'; // Import your Layout component
// import HomePage from './components/Home'; // Import your HomePage component
// import UploadPdfPage from './components/Project'; // Import your UploadPdfPage component
// import DashboardPage from './DashboardPage'; // Import your DashboardPage component

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Route exact path="/" component={HomePage} />
//         <Route path="/upload-pdf" component={UploadPdfPage} />
//         <Route path="/dashboard" component={DashboardPage} />
//       </Layout>
//     </Router>
//   );
// }

// export default App;
