// hooks/useXpAchievements.tsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserXpAchievements } from "../services/userService";
import { Achievement } from "../types/Achievements";

export const useXpAchievements = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [xpAchievements, setXpAchievements] = useState<Achievement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  const fetchXpAchievements = async () => {
    if (!token || !user || !setUser) return; // garante que temos tudo

    try {
      const res = await getUserXpAchievements(token); // chama o backend
      if (!res) return;

      // Atualiza o user context com nível e XP
      setUser({
        id: user.id,
        token: user.token,
        level: res.level,
        currentXp: res.xp,
        xpGrantedToday: user.xpGrantedToday,
      });

      // Se houver achievements desbloqueados, mostra a modal
      if (res.unlockedAchievements?.length > 0) {
        setXpAchievements(res.unlockedAchievements);
        setCurrentAchievement(res.unlockedAchievements[0]);
        setModalVisible(true);
      }
    } catch (err: any) {
      console.log("Erro ao buscar achievements XP:", err.response?.data || err.message);
    }
  };

  // Executa na primeira montagem
  useEffect(() => {
    fetchXpAchievements();
  }, []);

  const handleClaim = () => {
    const remaining = xpAchievements.slice(1);
    if (remaining.length > 0) {
      setCurrentAchievement(remaining[0]);
      setXpAchievements(remaining);
    } else {
      setCurrentAchievement(null);
      setXpAchievements([]);
      setModalVisible(false);
    }
  };

  return { modalVisible, currentAchievement, handleClaim };
};
