import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ token: "" });

  // Fungsi untuk login
  const login = async (token) => {
    try {
      setUser({ token });
      // Simpan token dalam bentuk string
      await AsyncStorage.setItem("userToken", JSON.stringify({ token }));
    } catch (error) {
      console.error("Error saving userToken:", error);
    }
  };

  // Fungsi untuk logout
  const logout = async () => {
    try {
      setUser({ token: "" }); // Reset state user
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.error("Error removing userToken:", error);
    }
  };

  // Nilai yang diberikan ke seluruh aplikasi
  const values = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
