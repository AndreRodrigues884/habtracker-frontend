import React, { useState, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { AuthContext } from "../contexts/AuthContext";
import { theme } from "../styles/theme";
import { commonStyles } from "../styles/common";

export const RegisterScreen = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const error = await register(name, email, password);
    if (error) {
      return Alert.alert("Erro", error);
    }
    Alert.alert("Sucesso", "Registado com sucesso!");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={[commonStyles.flexCenter, styles.container]}>
      <Text style={styles.title}>Habtracker</Text>

      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <PrimaryButton title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xl,
    color: theme.colors.primary,
    ...commonStyles.textCenter,
  },
});
