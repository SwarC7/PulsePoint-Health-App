import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Button } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase2 } from '@react-native-firebase/auth';

export default function Analysis() {
    // Array of diseases
    const [name2, setName] = useState(".");
    const [diseases, setdiseases] = useState([]);
    const username = firebase.auth().currentUser?.email;
    firebase.app().database('https://healthy-6686f-default-rtdb.firebaseio.com').ref('/user');
    if (username != undefined) {
        firestore()
            .collection('USERS')
            .doc(username)
            .onSnapshot(documentSnapshot => {
                const firestore_data = documentSnapshot.data();
                if (firestore_data != undefined) {
                    setName(firestore_data["Name"]);
                }
            });
    }
    function reader() {
        database()
            .ref('/' + name2 + '/Inferences')
            .on('value', snapshot => {
                setdiseases(snapshot.val());
            });
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
            }}>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    paddingVertical: 30,
                }}>
                <View
                    style={{
                        alignItems: "center",
                        backgroundColor: "#d9d9d9",
                        borderRadius: 30,
                        paddingVertical: 15,
                        marginBottom: 11,
                        marginHorizontal: 15,
                    }}>
                    <Text
                        style={{
                            color: "#000000",
                            fontSize: 24,
                        }}>
                        {"Diseases Predicted by us"}
                    </Text>
                </View>
                {diseases.map((disease, index) => (
                    <View
                        key={index}
                        style={{
                            marginBottom: 18,
                            marginHorizontal: 33,
                        }}>
                        <View
                            style={{
                                height: 41,
                                backgroundColor: "#d9d9d9",
                                borderRadius: 30,
                            }}>
                        </View>
                        <Text
                            style={{
                                position: "absolute",
                                bottom: -2,
                                left: 93,
                                color: "#000000",
                                fontSize: 24,
                            }}>
                            {disease}
                        </Text>
                    </View>
                ))}
                <Button onPress={() => { reader() }} title='Click Me' />
            </ScrollView>
        </SafeAreaView>

    );
}
