import React, { useEffect, useState } from 'react';
import { listUsers, deleteUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchId, setSearchId] = useState(''); // State for search by ID
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const navigator = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNewUser() {
    navigator('/add-user');
  }

  function updateUser(id) {
    navigator(`/edit-user/${id}`);
  }

  function handleDeleteUser(id) {
    deleteUser(id)
      .then((response) => {
        console.log(`User with id ${id} deleted successfully.`);
        getAllUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

  // Handle search by name
  function handleSearchByName() {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  // Handle search by ID
  function handleSearchById() {
    const filtered = users.filter((user) => user.id.toString() === searchId);
    setFilteredUsers(filtered);
  }

  return (
    <div className="container">
      <h2 className="text-center">List of users</h2>

      {/* Search by Name */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <button className="btn btn-secondary mt-2" onClick={handleSearchByName}>
          Search by Name
        </button>
      </div>

      {/* Search by ID */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Update search ID
        />
        <button className="btn btn-secondary mt-2" onClick={handleSearchById}>
          Search by ID
        </button>
      </div>

      <button className="btn btn-primary mb-2" onClick={addNewUser}>
        Add User
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateUser(user.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserComponent;