import React from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { useState } from 'react'
// import styles from './about.style'
// import {
//   useFonts,
//   Poppins_400Regular,
//   Poppins_700Bold
// } from "@expo-google-fonts/poppins"
import { useNavigation } from "@react-navigation/native";
import auth, {firebase} from '@react-native-firebase/auth';

const IntroScreen = () => {
  // let [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  //   Poppins_700Bold
  // });
  const navigation = useNavigation()
  const onPressLogin = () => {
    navigation.navigate("Login")
  }
  const onPressSignUp = () => {
    navigation.navigate("Signup")
  }

  const logout = async () => {
    firebase.auth().signOut();
  }

  let user = firebase.auth().currentUser?.email;
  if(user)
  {
    logout();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../bg.png')}
        resizeMode='stretch'
        style={styles.background}
      >
        <TouchableOpacity
          onPress={onPressLogin}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <Text style={styles.Text}>or </Text>
        <TouchableOpacity
          onPress={onPressSignUp}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  background:{
    height:"100%",
    width:"100%",
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  container: {
    backgroundColor:"#121212",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  loginBtn: {
    width: "50%",
    backgroundColor: "#9d93e0",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {

    // fontFamily: "Poppins_400Regular",
  },
 
});
export default IntroScreen