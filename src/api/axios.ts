import axios from "axios";

export const AxiosCall = axios.create({
  baseURL: "http://localhost:3366/",
});
