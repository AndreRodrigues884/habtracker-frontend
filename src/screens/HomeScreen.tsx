import React, { useContext, useEffect, useState  } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { useXpAchievements } from "../hooks/useXpAchievements";
import WeekCalendar from "../components/Weekday";
import { UserXPHeader } from "../components/UserXPHeader";
import { HabitCard } from "../components/HabitCard";
import { getUserHabits } from "../services/habitService";

export const HomeScreen = () => {
  const { fetchXpAchievements } = useXpAchievements();
   const [habits, setHabits] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

   useEffect(() => {
    const initData = async () => {
      if (!user) return;

      // 🔹 Buscar XP e conquistas
      fetchXpAchievements();

      // 🔹 Buscar hábitos do backend
      try {
        const data = await getUserHabits(user.token);
        setHabits(data);
      } catch (err) {
        console.error("Erro ao buscar hábitos:", err);
      }
    };

    initData();
  }, [user, fetchXpAchievements]);


  const handleDaySelect = (date: Date) => {
    console.log("Dia selecionado:", date);
    // aqui você filtra hábitos desse dia
  };

  const handleComplete = (habitId: string) => {
    console.log("Complete habit:", habitId);
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.progressBar}>
        {user && (
          <UserXPHeader
            name={user.name}
            currentXp={user.currentXp ?? 0}
            level={user.level ?? 1}
          />
        )}
      </View>
      <WeekCalendar onDaySelect={handleDaySelect} />
      <Text style={styles.title}>Daily Habits</Text>
        <View style={styles.habitContainer}>
        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            category={habit.category || "no image"}
            title={habit.title}
            currentStreak={habit.currentStreak || 0}
            onComplete={() => handleComplete(habit._id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.padding.horizontal.xxl,
    paddingTop: theme.padding.vertical.xxl.paddingVertical,
    ...theme.align["top-left"],
    ...theme.size.full,
    ...theme.flex.column,
    gap: theme.gap.lg,
    backgroundColor: theme.colors.background,
    ...theme.size.full_width,
  },
  xpText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.dark_text,
  },
  progressBar: {
    ...theme.align["center"],
    ...theme.size.full_width,
  },
  title: {
    color: theme.colors.dark_text,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  habitContainer: {
    ...theme.size.full_width,
     gap: theme.gap.md,
  },
});
