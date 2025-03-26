import React, { useEffect, useState } from 'react';
import { listUsers } from '../services/UserService'; // Assuming this service is handling API requests

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="user-list">
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUserComponent;
