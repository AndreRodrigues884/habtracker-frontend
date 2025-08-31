import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/router";
import { Header } from "../components/Header";
import { useXpAchievements } from "../hooks/useXpAchievements";
import { AchievementModal } from "../components/AchievementModal";

export const HomeScreen = () => {
  const { modalVisible, currentAchievement, handleClaim } = useXpAchievements();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);


  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };


  return (
    <View style={styles.container}>
      <Header></Header>
      <Button title="Logout" onPress={handleLogout} color={theme.colors.primary} />

      {currentAchievement && (
        <AchievementModal
          achievement={currentAchievement}
          isVisible={modalVisible}   // aqui passa a prop
          onClaim={handleClaim}
        />
      )}

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
});
