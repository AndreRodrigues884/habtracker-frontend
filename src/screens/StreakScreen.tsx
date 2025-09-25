import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/router";

export const StreakScreen = () => {
  return (

    <View style={styles.container}>
      <Header></Header>
       <Text style={styles.title}>Habits Streaks</Text>
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
   title: {
    color: theme.colors.dark_text,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily.semibold,
  },
});