import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../services/UserService'; // Assuming these are API services

const UpdateUserComponent = ({ userId }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    getUser(userId)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user:', error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userId, user)
      .then((response) => {
        console.log('User updated successfully', response);
        // Navigate or display success message
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserComponent;
