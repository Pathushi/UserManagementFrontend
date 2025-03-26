import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";

const RegisterComponent = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(user);
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <input type="text" placeholder="Phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
