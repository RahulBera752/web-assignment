import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLanding = () => API.get("/landing");
export const saveLanding = (data) => API.post("/landing", data);
