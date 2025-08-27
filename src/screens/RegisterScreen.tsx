import React, { useState, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { AuthContext } from "../contexts/AuthContext";
import { theme } from "../styles/theme";



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
    <View style={[styles.mainContainer]}>
      <View style={[styles.secondContainer]}>
        <View style={[styles.thirdContainer]}>
          <View style={[styles.textsContainer]}>
            <Text style={styles.title}>Create an account!</Text>
            <Text style={styles.subtitle}>Already have an account?{" "}<Text style={styles.link}>Sign in</Text></Text>
          </View>

          <View style={[styles.inputsContainer]}>
            <View style={[styles.inputs]}>
              <InputField placeholder="Name" value={name} onChangeText={setName} />
              <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            </View>
            <View style={[styles.link_passwordContainer]}>
              <Text style={styles.link_password}>Forgot your password?</Text>
            </View>
          </View>
          <PrimaryButton title="Sign Up" onPress={handleRegister} />
        </View>
        <View style={[styles.logoContainer]}>
          <Text style={styles.logo}>HabTracker</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...theme.padding.horizontal.xxl,
    ...theme.padding.vertical.xxl,
    ...theme.align["top-left"],
    ...theme.size.full,
    ...theme.flex.column,
    gap: theme.gap.lg,
    backgroundColor: theme.colors.background,
  },
  secondContainer: {
    ...theme.align["center-left"],
    ...theme.size.full,
    ...theme.flex.column,
  },
  thirdContainer: {
    ...theme.align["center-left"],
    ...theme.size.full,
    ...theme.flex.column,
    gap: theme.gap.lg,
  },
  textsContainer: {
    ...theme.size.hug,
    gap: theme.gap.sm,
  },
  inputsContainer: {
    ...theme.size.full_width,
    gap: theme.gap.sm,
  },
  inputs: {
    gap: theme.gap.md,
  },
  title: {
    color: theme.colors.dark_text,
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  subtitle: {
    color: theme.colors.dark_text,
    fontFamily: theme.typography.fontFamily.medium,
  },
  link: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  link_password: {
    color: theme.colors.dark_text,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fontFamily.regular,
  },
  link_passwordContainer: {
    ...theme.align["center-right"],
    ...theme.size.full_width,
  },
  logo: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fontFamily.bold,
    ...theme.padding.vertical.sm
  },
  logoContainer: {
     ...theme.size.full_width,
    ...theme.size.hug_height,
    ...theme.align["center"],
  }
});
