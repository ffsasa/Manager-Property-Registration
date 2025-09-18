import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectName, setProjectName] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectName, setProjectName }}>
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProject = () => useContext(ProjectContext);
