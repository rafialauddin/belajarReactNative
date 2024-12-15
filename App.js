import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useState } from 'react';


// Importing images used in the UI
const imageProfile = require("./assets/user-round-pen.png"); // Profile picture placeholder
const imageSun = require("./assets/Vector.png"); // Sun icon for light mode
const plusIcon = require("./assets/plus.png"); // Icon for "Add" functionality
const sendIcon = require("./assets/send.png"); // Icon for "Send" functionality
const eyeIcon = require("./assets/eye.png"); // Eye icon for balance visibility toggle

const transactions = [
  { id: "1", title: "Starbucks Coffee", amount: "-Rp 50.000", date: "Today, 09:30 AM" },
  { id: "2", title: "Freelance Payment", amount: "+Rp 1.500.000", date: "Yesterday, 05:00 PM" },
  { id: "3", title: "Electricity Bill", amount: "-Rp 350.000", date: "Sep 12, 02:00 PM" },
];

export default function App() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State for balance visibility

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={{ width: "15%" }}>
            <Image source={imageProfile} style={styles.profileImage} />
          </View>
          <View style={{ width: "68%" }}>
            <Text style={styles.profileName}>Emmanuela Darling</Text>
            <Text style={styles.profileSubtitle}>Personal Account</Text>
          </View>
          <View>
            <Image source={imageSun} style={styles.sunIcon} />
          </View>
        </View>
      </View>

      {/* BODY CONTENT */}
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.greetingText}>
            GOOD MORNING, <Text style={styles.nameHighlight}>DARLING</Text>
          </Text>
          <Text style={styles.subText}>
            Check All Your Incoming and Outgoing Transactions Here
          </Text>
        </View>

        {/* ACCOUNT SECTION */}
        <View style={styles.accountSection}>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Account No.</Text>
            <Text style={styles.accountNumber}>100899</Text>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            {/* Balance Text */}
            <View>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balanceValue}>
                {isBalanceVisible ? "Rp 10.000.000" : "****"}
              </Text>
            </View>
            {/* Eye Icon for Balance Visibility Toggle */}
            <View>
              <TouchableOpacity style={styles.eyeButton} onPress={toggleBalanceVisibility}>
                <Image source={eyeIcon} style={styles.eyeStyle}/>
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
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionText}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.amount.startsWith("+") ? "green" : "red" },
                ]}
              >
                {item.amount}
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
  eyeButton:{
    marginTop:20,
  },
  eyeStyle:{
    height:17,
    width:25,

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
});
