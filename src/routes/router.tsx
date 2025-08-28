import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "../components/Menu";
import { RegisterScreen } from "../screens/RegisterScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/* Para telas que alternam entre si, como Login ↔ Register, sempre use replace.
Assim não empilhas múltiplas instâncias da mesma tela na stack.

Para navegar para telas que fazem parte do fluxo normal da app, como “Home”, “Profile” ou “Detalhes de item”,
 aí use navigate, porque queres manter a stack de navegação para permitir o botão “Back”. */