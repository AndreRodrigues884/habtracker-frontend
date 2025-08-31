import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import MenuIcon from "../assets/icons/menu.svg";
import { useUserLevel } from "../hooks/useUserLevel";

export const Header: React.FC = () => {
    const { level, loading } = useUserLevel();
    const handleMenuPress = () => {
        console.log("Menu clicked");
    };

    return (
        <View style={styles.container}>

            {/* Botão de Navbar */}
            <Pressable onPress={handleMenuPress} style={styles.leftButton}>
                <MenuIcon width={28} height={28} />
            </Pressable>

            {/* Título central */}
            <Text style={styles.title}>HabTracker</Text>

            {/* Level */}
            <View style={styles.levelContainer}>
                 <Text style={styles.levelText}>{loading ? "" : level}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...theme.size.full_width,
        ...theme.align["space-between"],
        ...theme.flex.row,
    },
    leftButton: {
        ...theme.align["center-left"],
    },
    title: {
        fontSize: theme.typography.sizes.md,
        fontFamily: theme.typography.fontFamily.semibold,
        color: theme.colors.primary,
        ...theme.typography.align.center
    },
    levelContainer: {
        borderWidth: theme.borderColor.borderSecondWidth,
        borderColor: theme.borderColor.borderSecondColor,
        borderRadius: theme.borderRadius.full,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 32,
        minHeight: 32,
    },
    levelText: {
        fontSize: theme.typography.sizes.sm,
        fontFamily: theme.typography.fontFamily.semibold,
        color: theme.colors.primary,
    },

});
