import axios from "axios";

const API_URL = "http://localhost:8081/users";

export const registerUser = (user) => axios.post(API_URL, user);
export const loginUser = (user) => axios.post(`${API_URL}/login`, user);
export const getAllUsers = () => axios.get(API_URL);
export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
