import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Router } from "./src/routes/router";
import { FontProvider } from './src/contexts/FontProvider';
import { AchievementModalProvider } from './src/contexts/AchievementModalContext';

export default function App() {
return (
    <FontProvider>
      <AuthProvider>
        <AchievementModalProvider>
          <Router />
        </AchievementModalProvider>
      </AuthProvider>
    </FontProvider>
  );
}
