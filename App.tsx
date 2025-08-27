import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { FontProvider } from './src/contexts/FontProvider';

export default function App() {
return (
    <FontProvider>
      <AuthProvider>
        <RegisterScreen />
      </AuthProvider>
    </FontProvider>
  );
}
