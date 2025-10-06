import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // consumir api del backend
});

export default api;
