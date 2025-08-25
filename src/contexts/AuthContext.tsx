import React, { createContext, useState, ReactNode } from "react";
import { User } from "../types/User";
import { registerUser } from "../services/api";

interface AuthContextData {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  register: async () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (name: string, email: string, password: string) => {
    try {
      await registerUser({ name, email, password });
      return null; // sucesso
    } catch (err: any) {
      return err.response?.data?.message || "Erro no registro";
    }
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};
