import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "../styles/theme";

interface CustomDropdownProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  optional?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  optional = false,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    <View style={{ marginTop: 12, width: '100%' }}>
      <Text style={styles.label}>
        {label} {optional ? "" : "*"}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        <Text>{selectedValue || `Select ${label.toLowerCase()}`}</Text>
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    ...theme.size.full_width, 
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 10,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    maxHeight: 300,
  },
  option: {
    padding: 16,
    borderBottomColor: theme.colors.secondary,
  },
  optionText: {
    fontSize: theme.typography.sizes.sm,
  },
});
