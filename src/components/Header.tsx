import React, { useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { theme } from "../styles/theme";
import MenuIcon from "../assets/icons/menu.svg";
import { useUserLevel } from "../hooks/useUserLevel";
import { AuthContext } from "../contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/router";
import { useNavigation } from "@react-navigation/native";

export const Header: React.FC = () => {
    const { level, loading } = useUserLevel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { logout } = useContext(AuthContext);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const handleMenuPress = () => {
        setSidebarVisible(true);
    };

    const handleLogout = async () => {
        setSidebarVisible(false); // fecha sidebar antes de logout
        await logout();
        navigation.replace("Login");
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
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


            {/* Sidebar Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={sidebarVisible}
                onRequestClose={closeSidebar}
            >
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSidebar}>
                    <View style={styles.sidebar}>
                        <Text style={styles.logoutText} onPress={handleLogout}>Logout</Text>
                        {/* Aqui você pode adicionar mais botões ou links */}
                    </View>
                </TouchableOpacity>
            </Modal>
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
        ...theme.align["center"],
        minWidth: 32,
        minHeight: 32,
    },
    levelText: {
        fontSize: theme.typography.sizes.sm,
        fontFamily: theme.typography.fontFamily.semibold,
        color: theme.colors.primary,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        ...theme.size.full,
        backgroundColor: theme.colors.primary + "10",
    },
    sidebar: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 250,
        backgroundColor: theme.colors.primary,
        ...theme.padding.horizontal.md,
        ...theme.padding.vertical.md,
    },
    logoutText: {
        color: theme.colors.white,
        fontSize: theme.typography.sizes.sm,
        fontFamily: theme.typography.fontFamily.medium,
    },
});
