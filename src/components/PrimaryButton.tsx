import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Props {
  title: string;
  onPress: () => void;
}

export const PrimaryButton: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
    activeOpacity={0.8}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    ...theme.shadows.small,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
});
