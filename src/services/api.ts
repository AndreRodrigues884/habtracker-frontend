import axios from "axios";
import { RegisterData, AuthResponse } from "../types/User";

const api = axios.create({
  baseURL: "http://192.168.1.6:3000", // backend
});

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/habtracker/users/register", data);
  return response.data;
};

export default api;
