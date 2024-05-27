import React from 'react';
import Navbar from './NavBar'; // Import your Navbar component
import '../styles/layout.css'; // Import CSS file for layout styling



function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;

// src/components/layout.js

// import React from 'react';
// import Navbar from './Navbar'; // Import your Navbar component
// import ChatInterface from './ChatInterface'; // Import your ChatInterface component
// import '../styles/layout.css'; // Import CSS file for layout styling

// function Layout({ children }) {
//   return (
//     <div className="layout">
//       <Navbar />
//       <div className="content">
//         <ChatInterface />
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Layout;


