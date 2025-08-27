import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterData, LoginData, AuthResponse } from "../types/User";

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post("/habtracker/users/register", data);
  return res.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post("/habtracker/users/login", data);
  await AsyncStorage.setItem("token", res.data.token);
  return res.data;
};

// Refresh token
export const refreshToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await api.post("/habtracker/users/refresh", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await AsyncStorage.setItem("token", res.data.token);
    return res.data.token;
  } catch (err) {
    console.error("Erro ao atualizar token", err);
    return null;
  }
};
