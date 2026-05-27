import axios from "axios";

const API = "http://localhost:5000/api/progress";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getProgress = async (courseId) => {
  const res = await axios.get(`${API}/${courseId}`, { headers: getAuthHeader() });
  return res.data;
};

export const updateProgress = async (courseId, lectureId) => {
  const res = await axios.post(`${API}/${courseId}`, { lectureId }, { headers: getAuthHeader() });
  return res.data;
};
