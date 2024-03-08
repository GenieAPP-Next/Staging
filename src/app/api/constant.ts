import axios from "axios";

// BASE_URL later need to be moved to env file
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
