import React, { useState, useEffect } from 'react';
import { createUser, getUser, updateUser} from '../../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const UserComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateUser(event) {
    event.preventDefault();

    if (validateForm()) {
      const user = { name, email, phone };
      console.log(user);

      if (id) {
        updateUser(id, user)
          .then((response) => {
            console.log(response.data);
            navigate('/users');
          })
          .catch((error) => {
            console.error('There was an error updating the user:', error);
          });
      } else {
        createUser(user)
          .then((response) => {
            console.log(response.data);
            navigate('/users');
          })
          .catch((error) => {
            console.error('There was an error creating the user:', error);
            alert('Failed to create user. Please try again.');
          });
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (phone.trim()) {
      errorsCopy.phone = '';
    } else {
      errorsCopy.phone = 'Phone is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h3 className="text-center">Update User</h3>;
    } else {
      return <h3 className="text-center">Add User</h3>;
    }
  }

  function cancel() {
    navigate('/users');
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateUser}>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  onChange={(event) => setName(event.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  placeholder="Enter your phone"
                  name="phone"
                  value={phone}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  onChange={(event) => setPhone(event.target.value)}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button type="button" className="btn btn-danger" onClick={cancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;