import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";
import FormComponent from "../components/Form";
import { useAuth } from "../context/authContext";

export default function LoginScreen({ navigation }) {
  const walledIcon = require("../assets/walled.png"); // Eye icon for balance visibility toggle
  const { user } = useAuth();
  {
    console.log(user);
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image source={walledIcon} style={styles.walledIconStyles} />
        </View>
        <View style={styles.formLogin}>
          <FormComponent state="login" navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  walledIconStyles: {
    width: 250,
    height: 60,
    marginTop: 150,
  },
  formLogin: {
    marginTop: 35,
    display: "fix",
  },
});
