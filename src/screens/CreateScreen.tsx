import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "../components/Header";
import {InputField} from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";

import { theme } from "../styles/theme";

export const CreateScreen = () => {
   const createHabit = async () => {
          console.log('Create Habit');
          
      };
  return (

    <View style={styles.container}>
      <Header></Header>
      <PrimaryButton title="Create Habit" onPress={createHabit}></PrimaryButton>
      <View>
        <Text>Title</Text>
        <InputField placeholder="Title" />
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
  },
});