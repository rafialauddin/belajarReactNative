import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView } from 'react-native';
import FormComponent from '../components/Form';
const walledIcon = require("../assets/walled.png"); // Eye icon for balance visibility toggle


export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View>
                <Image source={walledIcon} style={styles.walledIconStyles}/>  
                </View>
                <View style={styles.formRegister}>
                    <FormComponent state="register" navigation={navigation}/>
                </View>
                <View style={{height:260, border:4}}>
                
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        alignItems: "center"
    },
    walledIconStyles:{
        width:250,
        height:60,
        marginTop:100,
    },
    formRegister:{
        marginTop:35,
        display: "fix"
    }
})