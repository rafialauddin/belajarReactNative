import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { fetchName, fetchTransactions } from "../api/RestApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importing images used in the UI
const imageProfile = require("../assets/user-round-pen.png"); // Profile picture placeholder
const imageSun = require("../assets/Vector.png"); // Sun icon for light mode
const plusIcon = require("../assets/plus.png"); // Icon for "Add" functionality
const sendIcon = require("../assets/send.png"); // Icon for "Send" functionality
const eyeIcon = require("../assets/eye2.png"); // Eye icon for balance visibility toggle
const logoutIcon = require("../assets/logout.png"); // Eye icon for balance visibility toggle

const transactionsDummyData = [
  {
    id: "1",
    title: "Starbucks Coffee",
    amount: "-Rp 50.000",
    date: "Today, 09:30 AM",
  },
  {
    id: "2",
    title: "Freelance Payment",
    amount: "+Rp 1.500.000",
    date: "Yesterday, 05:00 PM",
  },
  {
    id: "3",
    title: "Electricity Bill",
    amount: "-Rp 350.000",
    date: "Sep 12, 02:00 PM",
  },
];

export default function LandingPage({ navigation }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State for balance visibility

  const [posts, setPosts] = useState([]); // untuk menyimpan data postingan yang akan diambil dari API.
  const [loading, setLoading] = useState(true); // untuk melacak status pemuatan data.
  const [error, setError] = useState(null); // untuk menyimpan data ketika error

  const [userData, setUserData] = useState("");
  const [transactions, setTransactions] = useState([]);
  const { logout, user } = useAuth();

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const getName = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const data = await fetchName(JSON.parse(token).token);
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTransactionsHistory = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const data = await fetchTransactions(JSON.parse(token).token);
      console.log(data);
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(transactions);

  useEffect(() => {
    getName();
    getTransactionsHistory();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={{ width: "15%" }}>
            <Image source={imageProfile} style={styles.profileImage} />
          </View>
          <View style={{ width: "55%" }}>
            <Text style={styles.profileName}>{userData.fullname}</Text>
            <Text style={styles.profileSubtitle}>Personal Account</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={imageSun} style={styles.sunIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
                logout;
              }}
            >
              <Image source={logoutIcon} style={styles.sunIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* BODY CONTENT */}
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.greetingText}>
            GOOD MORNING,{" "}
            <Text style={styles.nameHighlight}>{userData.username}</Text>
          </Text>
          <Text style={styles.subText}>
            Check All Your Incoming and Outgoing Transactions Here
          </Text>
        </View>

        {/* ACCOUNT SECTION */}
        <View style={styles.accountSection}>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Account No.</Text>
            <Text style={styles.accountNumber}>{userData.user_id}</Text>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            {/* Balance Text */}
            <View>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balanceValue}>
                {isBalanceVisible
                  ? `Rp ${Number(userData.balance).toLocaleString("id-ID")}`
                  : "****"}
              </Text>
            </View>
            {/* Eye Icon for Balance Visibility Toggle */}
            <View>
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={toggleBalanceVisibility}
              >
                <Image source={eyeIcon} style={styles.eyeStyle} />
              </TouchableOpacity>
            </View>

            {/* Action Icons */}
            <View style={styles.iconGroup}>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={plusIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={sendIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* TRANSACTION SECTION */}

      {/* <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.title}>{item.first_name}</Text>
          <Text style={styles.body}>{item.last_name}</Text>
          <Image
            source={{uri: item.avatar}}
            style={{ width: 200, height: 200}}
          ></Image>
        </View>
      )}
    /> */}

      <View style={styles.transactionContainer}>
        <Text style={styles.transactionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                {/* <Text style={styles.transactionText}>{item.type}</Text> */}
                <Text style={styles.transactionText}>
                  {item.userDataTo.fullname}
                </Text>
                <Text style={styles.transactionDate}>{item.timedate}</Text>
              </View>
              <Text style={[styles.transactionAmount, item.type == 'transfer' ? {color:'red'} : {color:'green'}]}>
                {item.type == 'transfer' 
                  ? `-${new Intl.NumberFormat('id-ID').format(item.amount)}` 
                  : `+${new Intl.NumberFormat('id-ID').format(item.amount)}`}
              </Text>

            </View>
          )}
        />
      </View>
    </View>
  );
}

// STYLESHEET DEFINITIONS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E6",
  },
  // HEADER STYLES
  headerContainer: {
    backgroundColor: "#FBF6E9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 105,
    justifyContent: "center",
    paddingTop: 25,
    paddingLeft: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  profileSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  sunIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  // BODY CONTENT STYLES
  bodyContainer: {
    padding: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  nameHighlight: {
    color: "teal",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  // ACCOUNT SECTION
  accountSection: {
    marginTop: 20,
  },
  accountRow: {
    backgroundColor: "#2E8B87",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountLabel: {
    fontSize: 16,
    color: "#fff",
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  // BALANCE CARD
  balanceCard: {
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  iconGroup: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#2E8B87",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 10,
  },
  eyeButton: {
    marginTop: 20,
    marginRight: 40,
  },
  eyeStyle: {
    height: 17,
    width: 25,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  // Transactions
  transactionContainer: {
    padding: 20,
    flex: 1,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  //===============================================
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    color: "#555",
  },
});
