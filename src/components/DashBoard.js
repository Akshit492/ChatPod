import React, { useEffect, useState } from 'react';
import api from '../api'; 
import ProjectList from './ProjectList';
import '../styles/DashBoard.css'
const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
    };

    fetchProjects();
  }, []);

  console.log('Projects:', projects); // Log projects state
  return (
    <div className='dashboard-container'>
      <h1>Project Dashboard</h1>
      <ProjectList projects={projects} />
    </div>
  );
};
//   return (
//     <div>
//       <h1>Project Dashboard</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project) => (
//             <tr key={project.id}>
//               <td>{project.title}</td>
//               <td>{project.description}</td>
//               <td>{project.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Dashboard;
