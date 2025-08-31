import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Achievement } from "../types/Achievements";
import { theme } from "../styles/theme";

interface AchievementModalProps {
    achievement: Achievement;
    onClaim: () => void;
    isVisible: boolean;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClaim, isVisible }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClaim}
            style={styles.modalWrapper}
        >
            <View style={styles.modal}>
                <Text style={styles.type}>{achievement.type}</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Achievement Unlocked! 🎉</Text>
                    <Text style={styles.name}>{achievement.name}</Text>
                </View>
                <Pressable style={styles.button} onPress={onClaim}>
                    <Text style={styles.buttonText}>Claim</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
     modalWrapper: {
        ...theme.align["bottom-center"],
    },
    overlay: {
        ...theme.size.full_width_flex,
        ...theme.size.full_height_flex,
        ...theme.align["bottom-center"],
        backgroundColor: "rgba(0,0,0,0.05)", // leve transparência
    },
    modal: {
        ...theme.size.full_width,
        backgroundColor: theme.colors.white,
        ...theme.padding.horizontal.xxl,
        ...theme.padding.vertical.md,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        ...theme.flex.column,
        ...theme.align["space-between"],
        gap: theme.gap.lg
    },
    titleContainer: {
        gap: theme.gap.sm,
        ...theme.align["center"],
        ...theme.padding.vertical.sm,
    },
    title: {
        fontSize: theme.typography.sizes.lg,
        color: theme.colors.primary,
        fontFamily: theme.typography.fontFamily.semibold,
    },
    name: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.dark_text,
        fontFamily: theme.typography.fontFamily.medium,
    },
    type: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.dark_text,
        fontFamily: theme.typography.fontFamily.semibold,
        ...theme.align["top-center"],
    },
    button: {
        backgroundColor: theme.colors.primary,
        ...theme.size.full_width,
        ...theme.typography.align.center,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: theme.borderRadius.md,
    },
    buttonText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.background,
        fontFamily: theme.typography.fontFamily.semibold,
        ...theme.typography.align.center,
    },

});

