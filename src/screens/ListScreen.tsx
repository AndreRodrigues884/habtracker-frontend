import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import { getUserHabits } from "../services/habitService";
import { HabitList } from "../components/HabitList";

export const ListScreen = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) return;

      try {
        const data = await getUserHabits(user.token);
        setHabits(data);
      } catch (err) {
        console.error("Erro ao buscar hábitos:", err);
      }
    };

    fetchHabits();
  }, [user]);

  return (
    <View style={styles.container}>
      <Header />
      {habits.map((habit) => (
        <HabitList
          key={habit._id}
          habitId={habit._id}
          category={habit.category}
          title={habit.title}
          currentStreak={habit.currentStreak}
          onDeleted={(id) => setHabits(prev => prev.filter(h => h._id !== id))}
        />
      ))}
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
  },
  habitContainer: {
    ...theme.flex.column,
    gap: theme.gap.lg,
    paddingBottom: 20,
  },
});