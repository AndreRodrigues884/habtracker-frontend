import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Props extends TextInputProps {
  placeholder: string;
}

export const InputField: React.FC<Props> = ({ placeholder, ...props }) => (
  <TextInput
    placeholder={placeholder}
    style={styles.input}
    placeholderTextColor={theme.colors.gray[50]}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    width: '100%',
    maxWidth: 320,
    ...theme.typography.body,
    backgroundColor: theme.colors.white,
  },
});
