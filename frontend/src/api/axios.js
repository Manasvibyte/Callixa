import axios from "axios";

const api = axios.create({
  baseURL: "https://callixa-api.onrender.com/api",
});

export default api;
