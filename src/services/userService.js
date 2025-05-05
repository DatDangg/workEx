import axios from 'axios';

const API = 'https://6201f90eb8735d00174cb67a.mockapi.io/Lists';

export const getUsers = () => axios.get(API);
export const getUserById = (id) => axios.get(`${API}/${id}`);
export const createUser = (data) => axios.post(API, data);
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);