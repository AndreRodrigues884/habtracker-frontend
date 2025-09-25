import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Header } from "../components/Header";
import { theme } from "../styles/theme";
import { getUserProfile, uploadUserAvatar } from "../services/userService";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";


export const ProfileScreen = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState<User | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar || null);

  // Carrega dados do usuário ao montar
  useEffect(() => {
    if (!token) return;
    getUserProfile(token).then((data) => {
      setProfile(data);
      setAvatarUri(data.avatar);
    });
  }, [token]);

  // Escolher imagem
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert("Permissão necessária", "Permita acesso às fotos");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (token) {
        const data = await uploadUserAvatar(token, uri);
        setAvatarUri(data.avatar);          // URL completa
        setProfile(prev => prev ? { ...prev, avatar: data.avatar } : prev);
        setUser(prev => prev ? { ...prev, avatar: data.avatar } : prev);
      }
    }
  };

  if (!profile) return <Text>Carregando...</Text>;


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.picContainer}>
        <TouchableOpacity onPress={pickImage}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text>Add Picture</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Habits in Progress Tab */}
      {profile && (
        <View style={styles.tabContainer}>
          <View style={styles.progressContainer}>
            <Text style={styles.tabText}>Habits in Progress</Text>
            <Text style={styles.tabCount}>{profile.associatedhabits.length}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.padding.horizontal.xxl,
    paddingTop: theme.padding.vertical.xxl.paddingVertical,
    ...theme.align["top-left"],
    ...theme.size.full,
    ...theme.flex.column,
    gap: theme.gap.lg,
    backgroundColor: theme.colors.background,
    ...theme.size.full_width,
  },
  picContainer: {
    ...theme.align["center"],
    ...theme.size.full_width,
    ...theme.padding.vertical.md,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: theme.borderRadius.full,
    borderWidth: theme.borderColor.borderThirdWidth,
    borderColor: theme.borderColor.borderThirdColor,
  },
  placeholder: {
    width: 130,
    height: 130,
    borderRadius: theme.borderRadius.full,
    backgroundColor: "rgba(45,105,255,0.1)", // adicionei backgroundColor
    ...theme.align["center"],
  },
  tabContainer: {
    ...theme.padding.horizontal.l,
    ...theme.size.full_width,
    ...theme.padding.vertical.xs,
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderColor.borderSecondWidth,
    borderColor: theme.borderColor.borderColor,
    borderRadius: theme.borderRadius.md,
  },
  progressContainer: {
    ...theme.flex.row,
    ...theme.align["space-between"],
    ...theme.align["center"],
    
  },
  tabText: {
    ...theme.size.full_width,
    color: theme.colors.dark_text,
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.medium,
  },
  tabCount: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily.medium,
  },
});