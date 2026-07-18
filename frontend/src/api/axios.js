import axios from "axios";

const api = axios.create({
  baseURL: "https://callixa-api.onrender.com",
});

export default api;
