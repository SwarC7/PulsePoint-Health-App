import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import retrive from "./screens/userdata";
import auth, { firebase } from '@react-native-firebase/auth';
function CustomDrawerContent(props) {
    const {collect_data,name,Designation} = retrive();
    let user = firebase.auth().currentUser?.email;
    useEffect(() => {
        const interval = setInterval(() => {
            if (user) {
            collect_data(user);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [collect_data]);
    console.log(name);
    // let user = firebase.auth().currentUser?.email;
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Image
                    source={require('./profile3.png')}
                    style={styles.profileImage}
                />
                <View>
                <Text style={styles.profileText}>{name}</Text>
                <Text style={styles.emailtext}>{user}</Text>
                </View>
            </View>
            {/* Drawer Content */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#0163d2',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    profileText: {
        color: '#ffffff',
        fontSize: 15,
        fontFamily:"Poppins-SemiBold"
        // fontWeight: 'bold',
    },
    emailtext:{
        color:"#ffffff",
        fontSize:10,
        fontFamily:"Poppins-Regular"
    }
});

export default CustomDrawerContent;