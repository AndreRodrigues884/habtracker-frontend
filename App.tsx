import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Router } from "./src/routes/router";
import { FontProvider } from './src/contexts/FontProvider';

export default function App() {
return (
    <FontProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </FontProvider>
  );
}
