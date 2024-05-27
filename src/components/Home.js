import React, { useState } from 'react';
import Typist from 'react-typist';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import CSS file for styling

const HomePage = () => {
    const [typingComplete, setTypingComplete] = useState(false); // State to track if typing has completed

    // Function to handle typing completion
    const handleTypingComplete = () => {
        setTypingComplete(true); // Set typingComplete to true when typing is complete
    };
    const navigate = useNavigate();

    const handleUploadClick = () => {
      navigate('/upload-pdf');
    };
  
    const handleAskClick = () => {
      navigate('/dashboard');
    };

    return (
        <div className="home-page">
            <div className="typing-container">
                {/* Typist component for typing effect */}
                {!typingComplete && (
                    <Typist
                        className="project-description"
                        avgTypingDelay={40} // Adjust typing speed as needed
                        cursor={{ show: false }}
                        onTypingDone={handleTypingComplete}
                        startDelay={500} // Delay before typing starts
                    >
                        <span>Welcome to ChatPod, where the future of research-based studies unfolds! Unlock the power of efficiency as we illuminate your documents with clarity and insight. Say goodbye to confusion and hello to understanding with just a click. Join us on the forefront of innovation, where knowledge meets convenience. Embrace the future - start exploring the magic by uploading your PDF files today. We are the pioneers. We are the future..</span>
                    </Typist>
                )}
                {/* Render buttons after typing is complete */}
                {typingComplete && (
                    <div>
                    <p className="project-description">Welcome to ChatPod, where the future of research-based studies unfolds! Unlock the power of efficiency as we illuminate your documents with clarity and insight. Say goodbye to confusion and hello to understanding with just a click. Join us on the forefront of innovation, where knowledge meets convenience. Embrace the future - start exploring the magic by uploading your PDF files today. We are the pioneers. We are the future..</p>
                    <div className="button-container">
                    <button className="upload-button" onClick={handleUploadClick}>Upload your PDF</button>
              <button className="ask-button" onClick={handleAskClick}>Ask questions using others' PDFs</button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
