import AnimatedCicle from "../../components/AnimatedCicle/AnimatedCicle";
import ScrollerMenu from "../../components/ScrollerMenu";
import About from "../../components/About";
import Projects from "../../components/Projects/Projects";
import Contact from "../../components/Contato";
import { useRef } from "react";

export default function Home() {
  const positionY = useRef();
  const propsBiggerCicle = {
    size: 400,
    miniItems: [1, 2, 3, 4, 8, 9, 8, 56, 2],
  };
  const propsLittleCicle = {
    size: 300,
    miniItems: [1, 2, 3, 4, 8, 9, 8, 56, 2],
  };
  return (
    <div className="main">
      <div className="page-initial-about">
        <div className="page-menu-about">
          <div className=" page-menu">
            <ScrollerMenu />
          </div>
          <div className=" page-about ">
            <About />
          </div>
        </div>
        <div className="page page-initial-about-cicles ">
          <div>
            <AnimatedCicle {...propsLittleCicle} />
          </div>
          <div style={{ marginTop: "50px" }}>
            <AnimatedCicle {...propsBiggerCicle} />{" "}
          </div>
        </div>
      </div>
      <Projects />
      <div className="page page-contact ">
        <h4 style={{ textAlign: "center" }}>
          Para entrar em contato me envie um email atraves do formulario abaixo
        </h4>
        <Contact />
        <h4 style={{ textAlign: "center" }}>
          Ou entre em contato atravez do Linkedin
        </h4>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/thomasnasc/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            fill="currentColor"
            class="mercado-match"
            width="50"
            height="50"
            focusable="false"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        </a>
        </div>
       
    </div>
  );
}
