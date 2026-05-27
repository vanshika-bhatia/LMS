import axios from "axios";

const API = "http://localhost:5000/api/enrollments";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const enrollInCourse = async (courseId) => {
  const res = await axios.post(`${API}/${courseId}`, {}, { headers: getAuthHeader() });
  return res.data;
};

export const getMyCourses = async () => {
  const res = await axios.get(`${API}/my-courses`, { headers: getAuthHeader() });
  return res.data;
};
