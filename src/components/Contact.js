import React, { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firebase";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function Contact() {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    messageText: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { language } = useContext(GlobalContext);

  function handleChange(e) {
    message[e.target.id] = e.target.value;
    setMessage({ ...message });

    if (
      message.name !== "" &&
      message.email !== "" &&
      message.messageText !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const add = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "messages"), {
      name: message.name,
      email: message.email,
      messageText: message.messageText,
    });

    setMessage({
      name: "",
      email: "",
      messageText: "",
    });
    setDisabled(true);
    alert("Your message has been sent! Thank you!");
  };

  return (
    <div className="formContainer" id="formContainer">
      {language === "English" ? <h2>Contact Us</h2> : <h2>İletişim</h2>}
      <div className="formItems">
        <div>
          <label htmlFor="name">
            <input
              required
              type="text"
              id="name"
              value={message.name}
              onChange={handleChange}
              placeholder={language === "English" ? "Full Name*" : "Ad Soyad*"}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <input
              required
              type="email"
              id="email"
              value={message.email}
              onChange={handleChange}
              placeholder="E-mail*"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="messageText">
            <textarea
              className="textAreaArea"
              required
              id="messageText"
              value={message.messageText}
              onChange={handleChange}
              placeholder={language === "English" ? "Message*" : "Mesaj*"}
              cols="21"
            ></textarea>
          </label>
        </div>
      </div>
      <div className="policy">
        I confirm that I have read&nbsp;
        <Link to="/privacy">Privacy Policy</Link>&nbsp;and I agree to the use of
        my data in line therewith.
      </div>
      <div className="sendButton">
        <button type="submit" disabled={disabled} onClick={add}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Contact;
