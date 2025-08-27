import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "./authService";

api.interceptors.request.use(async (config) => {
  let token = await AsyncStorage.getItem("token");
  if (!token) return config;

  // Aqui podes adicionar lógica de expiração se quiser
  const newToken = await refreshToken();
  if (newToken) token = newToken;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
