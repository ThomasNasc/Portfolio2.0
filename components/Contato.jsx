import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
function Contact(props) {
  const form = useRef();
  const [FormInfo, setFormInfo] = useState({
    nome: "",
    email: "",
    mensagem: "",
    status: "",
  });

  const handleFormInfo = (param, value) => {
    setFormInfo({ ...FormInfo, [param]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "gmailMessage",
        "template_ejidxde",
        form.current,
        "qLvooy9XbNlOuL_kt"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormInfo({
            nome: "",
            email: "",
            mensagem: "",
            status: "EMAIL ENVIADO",
          });
        },
        (error) => {
          console.log(error.text);
          handleFormInfo("status", "ERRO");
        }
      );
  };

  return (
    <form className="form-contact" ref={form} onSubmit={sendEmail}>
      <input
        className="input-contact"
        type="text"
        placeholder="Nome"
        onChange={(e) => handleFormInfo("nome", e.target.value)}
        value={FormInfo.nome}
        name="name"
      />
      <input
        className="input-contact"
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => handleFormInfo("email", e.target.value)}
        value={FormInfo.email}
      />
      <textarea
        className="input-contact"
        type="textarea"
        height={1}
        name="message"
        placeholder="Mensagem"
        onChange={(e) => handleFormInfo("mensagem", e.target.value)}
        value={FormInfo.mensagem}
      />
      <button className="submit-button" type="submit">
        ENVIAR
      </button>
      <p>{FormInfo.status}</p>
    </form>
  );
}

export default Contact;
