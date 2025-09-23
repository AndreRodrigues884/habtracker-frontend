import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { theme } from "../styles/theme";
import { HabitListProps } from "../types/Habit";
import HealthIcon from '../assets/icons/health.svg';
import ProductivityIcon from '../assets/icons/productivity.svg';
import LearningIcon from '../assets/icons/learning.svg';
import LifestyleIcon from '../assets/icons/lifestyle.svg';
import SocialIcon from '../assets/icons/social.svg';
import CreativityIcon from '../assets/icons/creativity.svg';
import FireIcon from '../assets/icons/fire.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import { deleteUserHabit } from "../services/habitService"; // API call para deletar
import { AuthContext } from "../contexts/AuthContext";

const CategoryIcons: Record<string, any> = {
  health: HealthIcon,
  productivity: ProductivityIcon,
  learning: LearningIcon,
  creativity: CreativityIcon,
  lifestyle: LifestyleIcon,
  social: SocialIcon,
};

export const HabitList: React.FC<HabitListProps> = ({
  habitId,
  category,
  title,
  currentStreak,
  onDeleted,
}) => {
  const Icon = CategoryIcons[category];
  const { user } = React.useContext(AuthContext);

  const handleDelete = async () => {
    if (!user) return;

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this habit?",
      [
        {
          text: "Cancel",
          style: "cancel", // estilo especial para botão de cancelamento
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteUserHabit(user.token, habitId);
              if (onDeleted) onDeleted(habitId); // atualiza a lista no frontend
            } catch (err) {
              console.error("Erro ao deletar hábito:", err);
            }
          },
          style: "destructive", // vermelho no iOS, indica ação perigosa
        },
      ],
      { cancelable: true } // permite fechar clicando fora da modal
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left}>
          {Icon && <Icon width={20} height={20} />}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.streakContainer}>
              <Text style={styles.streak}>{currentStreak}</Text>
              <FireIcon width={16} height={16} />
            </View>
          </View>
        </View>
        <View style={styles.ButtonContainer}>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <View style={styles.deleteButtonContent}>
              <Text style={styles.deleteButtonText}>Delete</Text>
              <DeleteIcon width={16} height={16} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.size.full_width,
  },
  card: {
    backgroundColor: theme.colors.white,
    ...theme.flex.row,
    ...theme.align["space-between"],
    ...theme.align["center"],
    ...theme.padding.horizontal.sm,
    ...theme.padding.vertical.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.size.full_width,
  },
  left: {
    ...theme.flex.row,
    ...theme.align["center-left"],
    gap: theme.gap.s,
  },
  textContainer: {
    ...theme.flex.row,
    ...theme.align["center-left"],
    gap: theme.gap.sm,
  },
  title: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.dark_text,
  },
  streak: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.dark_text,
    fontFamily: theme.typography.fontFamily.medium,
  },
  streakContainer: {
    ...theme.flex.row,
    ...theme.align["center"],
    gap: theme.gap.xs,
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,

  },
  deleteButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily.medium,
  },
  ButtonContainer: {
    flex: 1,
    ...theme.align["center-right"],
  },
  deleteButtonContent: {
    ...theme.flex.row,
    ...theme.align["center"],
    gap: theme.gap.xs,
  }
});
