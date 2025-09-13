import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { theme } from "../styles/theme";

interface DatePickerInputProps {
  label: string;
  date: Date | null;
  onDateChange: (date: Date) => void;
  optional?: boolean;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  date,
  onDateChange,
  optional = false,
}) => {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setVisible(false);
    onDateChange(selectedDate);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.label}>{label} {optional ? "" : "*"}</Text>

      <Pressable style={styles.button} onPress={() => setVisible(true)}>
        <Text>{date ? date.toDateString() : "Select date"}</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        date={date ?? new Date()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.dark_text,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: 10,
    marginTop: 4,
  },
});