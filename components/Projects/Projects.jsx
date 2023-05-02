import React from "react";
import ProjectItem from "./ProjectItem";
import { projetos } from "../../core/Projetos";

function Projects(props) {
  return (
    <div className="page-projects">
      <div className="projects">
        {projetos.map((project, index) => (
          <ProjectItem  key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
