import api from "./api";

export interface UserLevelResponse {
  level: number;
}

export const getUserLevel = async (token: string): Promise<UserLevelResponse> => {
  const res = await api.get("/habtracker/users/level", {
     headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  return res.data;
};
