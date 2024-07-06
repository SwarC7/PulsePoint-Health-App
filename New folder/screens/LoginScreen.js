import React from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { useState } from 'react'
import auth from '@react-native-firebase/auth';
// import styles from './about.style'
// import {
//     useFonts,
//     Poppins_400Regular,
//     Poppins_700Bold
// } from "@expo-google-fonts/poppins"
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';


const LoginScreen = () => {
    var user = "None";

    const onPressLogin = () => {
        const { email, password } = state

        console.log('Email:', email);
        console.log('Password:', password);
    }
    // let [fontsLoaded] = useFonts({
    //     Poppins_400Regular,
    //     Poppins_700Bold
    // });
    const handleAuthentication = () => {
        const { email, password } = state
        console.log('Email:', email);
        console.log('Password:', password);
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Success Login !!! \n");
                var type = "NONE";
                const subscriber = firestore()
                    .collection('USERS')
                    .doc(email)
                    .onSnapshot(documentSnapshot => {
                        console.log(documentSnapshot.data());
                        const firestore_data = documentSnapshot.data();
                        if (firestore_data["Designation"] == "Doctor") {
                            console.log("Doctor Found");
                            navigation.navigate("ProfScr")
                        }
                        if (firestore_data["Designation"] == "Patient") {
                            console.log("Patient Found");
                            navigation.navigate("Main")
                        }
                    });
                // if(type. == "")
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const navigation = useNavigation()
    return (
        <ImageBackground
            source={require('../bg.png')}
            resizeMode='stretch'
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.cont}>
                    <Text style={styles.title}> Login</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setState({ ...state, email: text })} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setState({ ...state, password: text })} />
                    </View>
                    {/* <TouchableOpacity
      onPress = {onPressForgotPassword}>
      <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text> */}
                    {/* </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={handleAuthentication}
                        style={styles.loginBtn}>
                        <Text style={styles.loginText}>LOGIN </Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
      onPress = {onPressSignUp}>
      <Text style={styles.forgotAndSignUpText}>Signup</Text>
      </TouchableOpacity> */}
                    
                    <Text style={styles.text}>Do not have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Signup")}
                        style={styles.loginBtn}>
                        <Text style={styles.loginText}>Register</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </ImageBackground>
    );

}
const styles = StyleSheet.create({
    cont: {
        // flex: 1,
        backgroundColor: '#252625',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:"8%",
        paddingBottom:"8%",
        paddingLeft:"12%",
        paddingRight:"12%",
        borderRadius: 12,
        borderColor: "#C7C8CC",
        borderWidth: 0.5,
        // height: "50%",
        // width:"50%",
    },
    background: {
        height: "100%",
        width: "100%",
    },
    container: {
        flex: 1,
        // backgroundColor: '#1d3b55',
        alignItems: 'center',
        justifyContent: 'center',
        // height: "50%",
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 50,
        color: "white",
        marginBottom: 40,
    },
    inputView: {
        width: 200,

        backgroundColor: "#7c8184",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        fontFamily: "Poppins-Regular",

        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        fontFamily: "Poppins-Regular",
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: 100,
        backgroundColor: "#9cbfdd",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10
    },
    loginText: {
        color:"#252625",
        fontFamily: "Poppins-Regular",
        // fontFamily: "Poppins_400Regular",
    }
});

export default LoginScreen