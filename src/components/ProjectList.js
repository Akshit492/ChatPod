// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProjectList = ({ projects = [] }) => {
//   return (
//     <div>
//       <ul>
//         {projects.map((project) => (
//           <li key={project.id}>
//             <Link to={`/projects/${project.id}/chat`}>{project.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectList.css'; // Import the CSS file

const ProjectList = ({ projects = [] }) => {
  return (
    <div>
      <div className="project-list-header">
        <span className="header-title">Title</span>
        <span className="header-status">Status</span>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            {project.status === 'created' ? (
              <Link to={`/projects/${project.id}/chat`}>
                <span className="project-title">{project.title}</span>
              </Link>
            ) : (
              <span className="project-title">{project.title}</span>
            )}
            <span className="project-status">{project.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
