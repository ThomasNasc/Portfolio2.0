import React from "react";
import Image from "next/image";
import dados from "core/data.json";
function About(props) {
  return (
    <div className="about">
      <div className="about-photo">{/* <Image /> */}</div>
      <section className="about-section-resume">
        <div className="about-section">
          <h2>FORMAÇÃO</h2>
          {dados.formacao.map((item, index) => (
            <div key={index} className="about-section-item">
              <p className="text-format title">{item.curso}</p>
              <p className="text-format subtitle">{item.escola}</p>
              <p className="text-format content-text">{item.periodo}</p>
            </div>
          ))}
        </div>
        <div className="about-section">
          <h2>EXPERIÊNCIA</h2>
          {dados.experiencia.map((item, index) => (
            <div key={index} className="about-section-item">
              <h4 className="title">{item.cargo}</h4>
              <p className="subtitle">{item.empresa}</p>
              <p className="subtitle">{item.periodo}</p>
              <h5>ATRIBUIÇÕES</h5>
              {item.atribuicoes.map((atribuicao, index) => (
                <p key={index} className="subtitle">-{atribuicao}</p>
              ))}
              <h5>TECNOLOGIAS UTILIZADAS</h5>
              <div className="subtitle container-technologies">
                {item.tecnologias.map((tecnologia, index) => (
                  <p key={index} className="technologie">
                    {tecnologia}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section-description">
        <p>
          <strong>Resumo:</strong>
          <span>{dados.resumo}</span>
        </p>
      </section>
      <a href="/Thomas do Nascimento Rosa - 2023.pdf" download>
        DOWNLOAD CURRICULO
      </a>
    </div>
  );
}

export default About;
