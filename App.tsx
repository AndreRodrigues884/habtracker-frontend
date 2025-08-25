import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { RegisterScreen } from "./src/screens/RegisterScreen";

export default function App() {
  return (
    <AuthProvider>
      <RegisterScreen />
    </AuthProvider>
  );
}
