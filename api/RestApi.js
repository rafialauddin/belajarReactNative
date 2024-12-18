import axios from "axios";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://express-firebase-daffaalif-daffaalifs-projects.vercel.app",
});

// Fetch posts and attach token dynamically
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email: email, // Replace with the actual email
      password: password, // Replace with the actual password
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

export const registerUser = async (email, password, fullname, phone_no) => {
  try {
    const response = await api.post("/auth/register", {
      email: email,
      password: password,
      fullname: fullname,
      phone_no: phone_no,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

export const fetchName = async (token) => {
  console.log(token);
  try {
    const response = await api.get("/users/current", {
      headers: { authorization: token },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

export const transfer = async (data, token) => {
  try {
    const response = await api.post("/transaction/transfer", data, {
      headers: { authorization: token },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

export const fetchTransactions = async (token) => {
  try {
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await api.get("/transaction/logs", {
      headers: { authorization: token },
    });

    return response.data.result; // Return the transactions array
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

// export const fetchName = async (token) => {
//   try {
//     const response = await api.get("/users/current"); // Endpoint sesuai API
//     return response.data;
//   } catch (error) {
//     console.error("Fetch Name Error:", error.message);
//     throw new Error("Failed to fetch Name");
//   }
// };
