import axios from "axios";

const API = "http://localhost:5000/api/users";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getProfile = async () => {
  const res = await axios.get(`${API}/profile`, { headers: getAuthHeader() });
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/`, { headers: getAuthHeader() });
  return res.data;
};
