import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { DEFAULT_PROJECT_NAME } from '../constants/index.js';

const ProjectContext = createContext({
  projectName: DEFAULT_PROJECT_NAME,
  setProjectName: () => undefined
});

export const ProjectProvider = ({ children }) => {
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);

  return (
    <ProjectContext.Provider value={{ projectName, setProjectName }}>
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useProject = () => useContext(ProjectContext);
