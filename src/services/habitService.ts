import { CreateHabitPayload } from "../types/Habit";
import api from "./api";

// Criar hábito
export const createHabit = async (payload: CreateHabitPayload, token: string) => {
  const { data } = await api.post("/habtracker/habits", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Buscar enums (categorias e frequências)
export const getHabitEnums = async (token: string) => {
  const { data } = await api.get("/habtracker/habits/enums", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getUserHabits = async (token: string) => {
  const response = await api.get("/habtracker/users/habits", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.habits; 
};

export const deleteUserHabit = async (token: string, habitId: string) => {
  await api.delete(`/habtracker/habits/${habitId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}