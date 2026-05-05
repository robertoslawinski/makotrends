import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("makotrends_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/verify");
        setUser(data.user);
      } catch {
        localStorage.removeItem("makotrends_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("makotrends_token", data.token);
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    localStorage.setItem("makotrends_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("makotrends_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, setUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
