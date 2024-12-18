import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Alert } from "react-native";
import { loginUser, registerUser } from "../api/RestApi";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

export default function FormComponent({ state, navigation }) {
  console.log("state nya adalah: ", state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State untuk Modal

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response) {
        login(response.token);
        navigation.navigate('Home');
        setError({});
      }
    } catch (err) {
      setError({ message: `${err.message}` });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(email, password,name, phoneNumber);
      if (response) {
     
        navigation.navigate('Login');
        setError({});
      }
    } catch (err) {
      setError({ message: `${err.message}` });
    }
  };

  return (
    <SafeAreaView>
      <View>
        {state === "register" && (
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCorrect={false}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        ></TextInput>
        {state === "register" && (
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoCorrect={false}
            inputMode="numeric"
            autoCapitalize="none"
          ></TextInput>
        )}
        {state === "register" && (
          <TextInput
            style={[styles.input]}
            placeholder="Notes"
            value={notes}
            multiline={true}
            numberOfLines={4}
            onChangeText={setNotes}
          ></TextInput>
        )}
      </View>

      <View style={styles}>
        {state === "login" ? (
          <View>
            <Text style={{ color: "red" }}>{error.message}</Text>
            <TouchableOpacity style={styles.buttonForm} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.textAccount}>
              <Text style={styles.normalText}>Don't have an account yet?</Text>{" "}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={styles.loginText}> Sign Up Here!</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            {/* Teks Terms & Conditions di atas tombol Register */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.termsText}>Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonForm}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.textAccount}>
              <Text style={styles.normalText}>Already Have Account?</Text>{" "}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.loginText}> Login Here!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Modal untuk Menampilkan Terms & Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <Text style={styles.modalText}>
              {/* Contoh teks Terms & Conditions */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              auctor ipsum in elit suscipit, ac tincidunt lectus convallis.
              Integer viverra quam eget sapien vehicula, eu vehicula erat
              tincidunt. Fusce sed magna magna.
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#424242",
    width: 300,
  },
  buttonForm: {
    backgroundColor: "#1B9AAA", // Warna background
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: "#1B9AAA",
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 16,
    color: "#1B9AAA",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
    textDecorationLine: "underline", // Menambahkan garis bawah pada teks
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#424242",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#FF6347", // Tombol Close
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginTop: 10,
  },
  textAccount: {
    flexDirection: "row", // Membuat teks dan tombol login berada dalam satu baris
    justifyContent: "center", // Memposisikan secara horizontal di tengah
    alignItems: "center", // Memposisikan secara vertikal di tengah
    marginTop: 20, // Memberikan jarak dari elemen sebelumnya
  },
  normalText: {
    fontSize: 14, // Ukuran font standar
    color: "#424242", // Warna teks abu-abu gelap
  },
  loginText: {
    fontSize: 14, // Ukuran font teks login
    color: "#1B9AAA", // Warna teks biru kehijauan
    fontWeight: "bold", // Membuat teks login tebal
    textDecorationLine: "underline", // Garis bawah untuk teks login
  },
});
