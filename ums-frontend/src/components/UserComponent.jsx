import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/UserService";

const UserComponent = () => {
  const userId = 1; // Replace with actual logged-in user's ID
  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "" });

  useEffect(() => {
    getUserById(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userId, user)
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          disabled
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserComponent;
