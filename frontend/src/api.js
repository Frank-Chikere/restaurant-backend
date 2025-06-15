import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-backend-6evn.onrender.com", // Change if backend URL differs
});

export default api;
