import api from "./api";
import { UserLevelResponse, UserXpAchievementsResponse } from "../types/Achievements";
import { CompleteHabitResponse } from "../types/Habit";

export const getUserLevel = async (token: string): Promise<UserLevelResponse> => {
  const res = await api.get("/habtracker/users/level", {
     headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  return res.data;
};

export const getUserXpAchievements = async (token: string): Promise<UserXpAchievementsResponse> => {
  const res = await api.get("/habtracker/users/xp-achievements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const completeHabit = async (token: string, habitId: string): Promise<CompleteHabitResponse> => {
  const res = await api.post(
    `/habtracker/users/habits/${habitId}/complete`,{
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
