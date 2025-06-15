import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Change if backend URL differs
});

export default api;
