import React, { useEffect, useState, useContext   } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../styles/theme";
import { AuthContext } from "../contexts/AuthContext";
import MenuIcon from "../assets/icons/menu.svg";
import { getUserLevel } from "../services/userService";

export const Header: React.FC = () => {
    const { token } = useContext(AuthContext);
    const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    const fetchLevel = async () => {
      if (!token) return; // se não tiver token, não faz nada

      try {
        const res = await getUserLevel(token);
        setLevel(res.level);
      } catch (err: any) {
        console.log("Erro ao buscar level:", err.response?.data || err.message);
      }
    };

    fetchLevel();
  }, [token]);
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
                <Text style={styles.levelText}>{level}</Text>
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
