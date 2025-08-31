import api from "./api";
import { UserLevelResponse, UserXpAchievementsResponse } from "../types/Achievements";

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
