import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/router";
import { Header } from "../components/Header";
import { useXpAchievements } from "../hooks/useXpAchievements";
import WeekCalendar from "../components/Weekday";
import { UserXPHeader } from "../components/UserXPHeader";

export const HomeScreen = () => {
  const { fetchXpAchievements } = useXpAchievements();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchXpAchievements();
    }
  }, [user, fetchXpAchievements]);


  const handleDaySelect = (date: Date) => {
    console.log("Dia selecionado:", date);
    // aqui você filtra hábitos desse dia
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
  }
});
