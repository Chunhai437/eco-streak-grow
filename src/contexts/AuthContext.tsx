import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  fullname: string;
  address: string;
  username: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (
    username: string,
    fullname: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
  ) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    try {
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Invalid user data in localStorage", err);
      localStorage.removeItem("user");
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi không xác định từ API");
      }

      interface TokenPayload {
        id: string;
        email: string;
        fullname?: string;
        address?: string;
        username?: string;
        role: "user" | "admin";
        iat: number;
        exp: number;
      }

      const { token } = await response.json();

      // ✅ Decode token
      const decoded = jwtDecode<TokenPayload>(token);

      // ✅ Gán vào user từ token
      const userInfo: User = {
        id: decoded.id,
        email: decoded.email,
        fullname: decoded.fullname,
        username: decoded.username,
        address: decoded.address,
        role: decoded.role,
      };

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", token);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    window.location.href = `${baseUrl}/api/auth/google`;
  };

  const register = async (
    username: string,
    fullname: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          username,
          fullname,
          email,
          password,
          address,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi không xác định từ API");
      }
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const isAdmin = () => user?.role === "admin";

  const value = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
