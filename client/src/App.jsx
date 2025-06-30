import React, { useState } from "react";
import "./styles/App.css";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setWelcomeMessage(
          `Hi! Welcome ${formData.name}. Thanks for choosing us!`
        );
        setFormData({ name: "", email: "", phone: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>📇 Contact Manager</h1>

        <form className="contact-form" onSubmit={handleAddContact}>
          <div className="input-group">
            <FaUser />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-group">
            <FaPhone />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>

          <button type="submit">Add Contact</button>
        </form>

        {welcomeMessage && <p className="welcome">{welcomeMessage}</p>}
      </div>
    </div>
  );
}

export default App;
