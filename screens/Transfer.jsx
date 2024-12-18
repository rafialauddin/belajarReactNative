import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { transfer, fetchName } from "../api/RestApi";
import { useAuth } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransferScreen = ({navigation}) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [destination, setDestination] = useState("none"); // Default value set to "none"
  const [isPickerVisible, setIsPickerVisible] = useState(false); // State to control picker visibility
  const [tempDestination, setTempDestination] = useState(destination); // Temporary state to hold the selected value
  const [userData, setUserData] = useState([]); 
  const [token, setToken] = useState('');
  

  const getName = async () => {
    const token = await AsyncStorage.getItem("userToken")
    setToken(JSON.parse(token).token)
    try {
      const data = await fetchName(JSON.parse(token).token);
      console.log(data)
      setToken(JSON.parse(token).token)
      setUserData(data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
      getName();
    }, []);
  

  const handleSend = async() => {
    if (!destination || destination === "none") {
      console.log("Please select a destination.");
      return;
    }
    console.log("Amount:", amount);
    console.log("Notes:", notes);
    console.log("Destination:", destination);
    
    try {
      const transferData = { 
        amount: amount, 
        notes: notes, 
        from_user: userData.user_id,
        to_user: destination,
      };
      console.log(transferData);
      console.log(token + ' test');
      const result = await transfer(transferData, token);
      console.log(result, "berhasil");
      navigation.navigate("Home");
      
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const handleConfirmDestination = () => {
    setDestination(tempDestination); // Update the destination with the temporary value
    setIsPickerVisible(false); // Hide the picker after confirming
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.content}>
              {/* Title */}
              <Text style={styles.title}>Transfer</Text>

              {/* Amount Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Amount</Text>
                <View style={styles.row}>
                  <Text style={styles.currency}>IDR</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>
              </View>

              {/* Transfer To Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Transfer to</Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setIsPickerVisible(true)} // Show picker
                >
                  <Text style={styles.pickerText}>
                    {destination === "none" ? "Select destination" : destination}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Notes Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add notes here..."
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>
            </View>

            {/* Send Button */}
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>

        {/* Picker for Transfer Destination */}
        {isPickerVisible && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tempDestination} // Use temporary state for selection
              onValueChange={(itemValue) => {
                console.log("Selected destination:", itemValue);
                setTempDestination(itemValue); // Update temporary state
              }}
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item label="Select destination" value="none" />
              <Picker.Item label="Account Daffa" value="2985766497" />
              <Picker.Item label="OVO" value="5389763061" />
              <Picker.Item label="Gopay" value="8698459525" />
            </Picker>
            {/* OK Button to confirm the selection */}
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleConfirmDestination}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Ensures the "Send" button stays at the bottom
  },
  inner: {
    flex: 1,
    justifyContent: "space-between", // Makes sure the button stays at the bottom and other content is above
    padding: 20,
  },
  content: {
    flex: 1, // Takes up available space but allows Send button to stay at bottom
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  currency: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    flex: 1,
  },
  notesInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10, // Added space above the picker
    borderBottomWidth: 1,
    borderBottomColor: "#DDD", // Keep it subtle to avoid the boxy feel
  },
  pickerText: {
    fontSize: 16,
    color: "#007BFF",
  },
  pickerWrapper: {
    position: "absolute", // Position picker overlay at the bottom
    left: 0,
    right: 0,
    bottom: 0, // Stick the picker at the bottom
    backgroundColor: "#FFF", // Remove border for a smoother look
    paddingBottom: 20, // Padding to add space below the picker
  },
  picker: {
    height: 200, // Adjust the height to make picker more visible
    width: "100%",
  },
  okButton: {
    backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue with transparency for a subtle effect
    paddingVertical: 10,
    borderRadius: 20, // Rounded corners for a more modern look
    alignItems: "center",
    width: 100, // Set width to 100
    alignSelf: "center", // Center the button horizontally
    borderWidth: 0, // No border for cleaner design
    marginTop: 15,
  },
  okButtonText: {
    color: "#007BFF", // Elegant blue for text
    fontSize: 18, // Slightly bigger font for visibility
    fontWeight: "500", // Slightly lighter font weight for a minimalistic feel
  },
});

export default TransferScreen;
