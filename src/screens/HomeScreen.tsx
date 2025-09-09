import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/router";
import { Header } from "../components/Header";
import { useXpAchievements } from "../hooks/useXpAchievements";

export const HomeScreen = () => {
  const { handleClaim, fetchXpAchievements } = useXpAchievements();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchXpAchievements();
    }
  }, [user, fetchXpAchievements]);


  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };



  return (
    <View style={styles.container}>
      <Header></Header>
      {user && (
        <Text style={styles.xpText}>
          {user.currentXp ?? 0} XP
        </Text>
      )}
      <Button title="Logout" onPress={handleLogout} color={theme.colors.primary} />

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
  xpText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.dark_text,
  },
});
