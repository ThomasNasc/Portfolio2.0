import React, { useEffect, useState } from "react";
import Image from "next/image";

function ProjectItem(props) {
  const ProjectInfo = props.project;
  const [bigImageId, setBigImageId] = useState(0);

  useEffect(() => {}, [bigImageId]);
  return (
    <div className="project">
      <img
        className="project-img"
        width={320}
        height={200}
        alt={""}
        src={ProjectInfo.src[bigImageId]}
      />

      <div className="container">
        {ProjectInfo.src.map((item, index) => (
          <img
            key={index}
            width={100}
            height={55}
            src={ProjectInfo.src[index]}
            onClick={() => {
              setBigImageId(index);
            }}
            alt={""}
            className="project-mini-img"
          />
        ))}
      </div>
      <h3>{ProjectInfo.nome.toUpperCase()}</h3>
      <div className="container" style={{justifyContent: 'flex-start'}}>
        {ProjectInfo.skills.map((icon, index) => (
          <Image
            key={index}
            width={30}
            height={30}
            src={icon}
            alt={""}
            className="icon-technologie"
          />
        ))}
      </div>
      <a href={ProjectInfo.href} target="blank">
        Link
      </a>
    </div>
  );
}

export default ProjectItem;
