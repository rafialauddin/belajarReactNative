import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import LandingPage from "./screens/LandingPage";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import TransferScreen from "./screens/Transfer";
import TopUpScreen from "./screens/TopUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthProvider } from "./context/authContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <AuthProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Transfer") {
              iconName = focused ? "send" : "send-outline";
            } else if (route.name === "TopUp") {
              iconName = focused ? "add" : "add-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 70,
            backgroundColor: "#fff",
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Transfer"
          component={TransferScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="TopUp"
          component={TopUpScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </AuthProvider>
  );
}

export default function App() {
  
 
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LandingPage"
                component={LandingPage}
                options={{ headerShown: false }}
              />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// STYLESHEET DEFINITIONS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
