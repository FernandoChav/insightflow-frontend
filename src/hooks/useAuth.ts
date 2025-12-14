"use client";
import { useState } from "react";
import { getUsers } from "@/services/api/users";
import { User } from "@/types/users";
import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const users = await getUsers();
      const found = users.find((u: any) => u.username === username && u.password === password);
      if (found) {
        setUser(found as User);
        return true;
      } else {
        setError("Usuario o contraseña incorrectos");
        return false;
      }
    } catch (e) {
      setError("Error al iniciar sesión");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return { user, login, logout, error, loading };
}
