import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/chatInterface.css'; // Import CSS file for chat styling

const ChatInterface = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [isBotProcessing, setIsBotProcessing] = useState(false);

  useEffect(() => {
    const fetchProjectTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/`);
        const project = response.data.find(project => project.id === parseInt(projectId));
        if (project) {
          setProjectTitle(project.title);
        } else {
          console.error('Project not found with ID:', projectId);
        }
      } catch (error) {
        console.error('Error fetching project title:', error);
      }
    };

    fetchProjectTitle();
  }, [projectId]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { message: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setIsBotProcessing(true); // Set flag to indicate bot is processing

    try {
      const response = await axios.post(`http://localhost:5000/api/projects/${projectId}/chat`, { message: input });
      const botMessage = { message: response.data.message, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsBotProcessing(false); // Reset flag after processing
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="project-name">{projectTitle}</div>
        <img src="/path/to/logo.png" alt="Logo" className="project-logo" />
      </div>
      <div className="chat-body">
      <div className="chat-history">
  <h2>Chat History</h2>
  {messages.length > 0 && messages[0].sender === 'user' && (
    <div className={`chat-message ${messages[0].sender}`}>
      {messages[0].message}
    </div>
  )}
</div>
        <div className="chat-window-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.message}
              </div>
            )).reverse()} {/* Reverse the order of messages */}
            {isBotProcessing && <div className="processing-indicator">...</div>}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="chat-send-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ChatInterface = () => {
//   const { projectId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSendMessage = async () => {
//     const newMessage = { message: input, sender: 'user' };
//     setMessages([...messages, newMessage]);

//     try {
//       // Update the URL to include the full path to the backend server
//       const response = await axios.post(`http://localhost:5000/api/projects/${projectId}/chat`, { message: input });
//       setMessages([...messages, newMessage, { message: response.data.message, sender: 'bot' }]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     setInput('');
//   };

//   return (
//     <div>
//       <h1>Chat for Project {projectId}</h1>
//       <div className="chat-window">
//         {messages.map((msg, index) => (
//           <div key={index} className={`chat-message ${msg.sender}`}>
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatInterface;

// src/components/ChatInterface.js
// src/components/ChatInterface.js
// src/components/ChatInterface.js
// src/components/ChatInterface.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../styles/chatInterface.css'; // Import CSS file for chat styling

// const ChatInterface = () => {
//   const { projectId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [projectTitle, setProjectTitle] = useState('');

//   useEffect(() => {
//     const fetchProjectTitle = async () => {
//       try {
//         // Fetch the list of projects
//         const response = await axios.get(`http://localhost:5000/api/projects/`);
//         console.log('All Projects:', response.data); // Log all projects for debugging

//         // Find the project with the matching ID
//         console.log('Project ID:', projectId); // Log the project ID for debugging
//         const project = response.data.find(project => project.id === parseInt(projectId));
//         console.log('Found Project:', project); // Log the found project for debugging

//         if (project) {
//           setProjectTitle(project.title); // Set the project title if project is found
//         } else {
//           console.error('Project not found with ID:', projectId);
//         }
//       } catch (error) {
//         console.error('Error fetching project title:', error);
//       }
//     };

//     fetchProjectTitle();
//   }, [projectId]);

//   const handleSendMessage = async () => {
//     if (input.trim() === '') return;
  
//     const userMessage = { message: input, sender: 'user' };
    
//     try {
//       const response = await axios.post(`http://localhost:5000/api/projects/${projectId}/chat`, { message: input });
//       const botMessage = { message: response.data.message, sender: 'bot' };
//       setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
  
//     setInput('');
//   };
  
  
  
  
//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <div className="project-name">{projectTitle}</div>
//         <img src="/path/to/logo.png" alt="Logo" className="project-logo" />
//       </div>
//       <div className="chat-body">
//         <div className="chat-history">
//           <h2>Chat History</h2>
//           {messages.map((msg, index) => (
//             <div key={index} className={`chat-message ${msg.sender}`}>
//               {msg.message}
//             </div>
//           ))}
//         </div>
//         <div className="chat-window-container">
//         <div className="chat-window">
//   {messages.map((msg, index) => (
//     <div key={index} className={`chat-message ${msg.sender}`}>
//       {msg.message}
//     </div>
//   )).reverse()} {/* Reverse the order of messages */}
// </div>
//           <div className="chat-input-container">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="chat-input"
//             />
//             <button onClick={handleSendMessage} className="chat-send-button">Send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
