import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/contact.css";

function Contact() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (

    <div className="contact-page">

      {/* NAVBAR */}

      <div className="contact-navbar">

        <h2
          className="contact-logo"
          onClick={() => navigate("/")}
        >
          LearnHub
        </h2>

        <div className="contact-nav-buttons">

          <button onClick={() => navigate("/")}>
            Home
          </button>

         

        </div>

      </div>

      {/* HERO */}

      <div className="contact-hero">

        <h1>Contact Us</h1>

        <p>
          Have questions about LearnHub courses or platform?
          Send us a message and we will get back to you.
        </p>

      </div>

      {/* CONTACT FORM */}

      <div className="contact-container">

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            required
          ></textarea>

          <button className="contact-btn" type="submit">
            Send Message
          </button>

        </form>

      </div>

      {/* FOOTER */}

      <footer className="contact-footer">

        <p>© 2026 LearnHub. All rights reserved.</p>

      </footer>

    </div>

  );

}

export default Contact;