import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, ScrollView } from "react-native";
import database, { firebase } from '@react-native-firebase/database';

const ProfessionalScreen = () => {
    const [users, setUsers] = useState([]);
    const [ages, setAges] = useState([]);
    const [heights, setHeights] = useState([]);
    const [weights, setWeights] = useState([]);
    const [steps, setSteps] = useState([]);
    const [heartRates, setHeartRates] = useState([]);
    const [distances, setDistances] = useState([]);
    const [bloodPressures, setBloodPressures] = useState([]);
    const [temperatures, setTemperatures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await database()
                .ref('/')
                .once('value');
            const data = snapshot.val();
            if (data) {
                const usersArray = [];
                const agesArray = [];
                const heightsArray = [];
                const weightsArray = [];
                const stepsArray = [];
                const heartRatesArray = [];
                const distancesArray = [];
                const bloodPressuresArray = [];
                const temperaturesArray = [];

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const user = data[key]["Name"];
                        const age = data[key]["Age"];
                        const height = data[key]["Height"];
                        const weight = data[key]["Weight"];
                        const step = data[key]["HealthData"]["steps"][0];
                        const heartRate = data[key]["HealthData"]["HR"][0];
                        const distance = data[key]["HealthData"]["Dis"][0];
                        const bloodPressure = data[key]["HealthData"]["BP"];
                        const temperature = data[key]["HealthData"]["BTemp"];

                        usersArray.push(user);
                        agesArray.push(age);
                        heightsArray.push(height);
                        weightsArray.push(weight);
                        stepsArray.push(step);
                        heartRatesArray.push(heartRate);
                        distancesArray.push(distance);
                        bloodPressuresArray.push(bloodPressure);
                        temperaturesArray.push(temperature);
                    }
                }

                setUsers(usersArray);
                setAges(agesArray);
                setHeights(heightsArray);
                setWeights(weightsArray);
                setSteps(stepsArray);
                setHeartRates(heartRatesArray);
                setDistances(distancesArray);
                setBloodPressures(bloodPressuresArray);
                setTemperatures(temperaturesArray);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#3b1d5a", paddingTop: 29, paddingBottom: 133, paddingHorizontal: 23 }}>
                {users.map((user, index) => (
                    <View key={index} style={{ backgroundColor: "#ffe5c0", borderRadius: 20, paddingVertical: 19, paddingHorizontal: 23, marginBottom: 19 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
                            <Text style={{ color: "#6fb7af", fontSize: 30, fontWeight: "bold", marginRight: 4, flex: 1 }}>{user}</Text>
                            <View style={{ width: 160 }}>
                                <Text style={{ color: "#557e12", fontSize: 15, fontWeight: "bold", marginBottom: 9 }}>Heart Rate : {heartRates[index]}</Text>
                                <Text style={{ color: "#557e12", fontSize: 15, fontWeight: "bold" }}>Steps Count : {steps[index]}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "#b168b2", fontSize: 16, fontWeight: "bold", width: 116 }}>
                                Age: {ages[index]}
                                {"\nHeight: "}{parseFloat(heights[index]).toFixed(2)}
                                {"\nWeight: "}{weights[index]}kgs
                            </Text>
                            <View style={{ width: 160 }}>
                                <Text style={{ color: "#557e12", fontSize: 15, fontWeight: "bold", marginBottom: 8 }}>Distance : {parseFloat(distances[index]).toFixed(2)}</Text>
                                <Text style={{ color: "#557e12", fontSize: 15, fontWeight: "bold", marginBottom: 9 }}>Blood Pressure : {bloodPressures[index]}</Text>
                                <Text style={{ color: "#557e12", fontSize: 15, fontWeight: "bold" }}>Temperature : {temperatures[index]}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfessionalScreen;
