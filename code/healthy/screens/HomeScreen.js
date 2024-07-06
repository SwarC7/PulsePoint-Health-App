import { View, Text, StyleSheet, Button, Image, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from '../node_modules/react-native-vector-icons/Ionicons'
import MaterialIcon from "../node_modules/react-native-vector-icons/MaterialCommunityIcons"
import FontAwe from "../node_modules/react-native-vector-icons/FontAwesome6"
// import Pmage from "../appimg.png";
import { weightTest, sleeper, actcaler, bper, btemper, disser, hrer, her, stepper } from "./HealthScreen";
import { useEffect, useState } from "react";
import { getHelloWorld } from "./function";
import styles from "./HomeStyles";
import Health_Connect_Data_retrival from "./sampleread";
import retrive from "./userdata";
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { ProgressChart } from "react-native-chart-kit";

// import Icon from  "react-native-ionicons";
export default function HomeScreen() {

    const { readSampleData, weight, basalMetabolicRate, basalBodyTemperature, activeCaloriesBurned, bloodGlucose, bloodPressure, bodyFat, bodyTemperature, bodyWaterMass, boneMass, distance, elevationGained, floorsClimbed, Rate, height, nutrition, oxygenSaturation, power, respiratoryRate, restingHeartRate, sleep, speed, steps, totalCaloriesBurned } = Health_Connect_Data_retrival();
    const { collect_data, name, Designation } = retrive();
    const [steps_progress, setsteps_progress] = useState(0);
    const [distance_progress, setdistance_progress] = useState(0.4);
    const [calories_progress, setcalories_progress] = useState(0);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const data = {
        labels: ["Steps", "Distance", "Calories"], // optional
        data: [steps_progress, distance_progress, calories_progress]
    };

    const user = firebase.auth().currentUser?.email;
    useEffect(() => {
        const interval = setInterval(() => {
            readSampleData(user);
            setsteps_progress(steps/6000);
            setdistance_progress(distance[distance.length -1]/200);
            setcalories_progress(activeCaloriesBurned[activeCaloriesBurned.length - 1]/10000000);
        }, 10000);  // Change Delay Here

        return () => clearInterval(interval);
    }, [readSampleData]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("zuer search------")
            if (user) {
                collect_data(user);
                console.log("Homescreem-DataCollected")
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [collect_data]);

    const navigation = useNavigation()
    // console.log(user);
    return (
        <SafeAreaView style={styles.container}>
            <Button
                style={styles.But}
                title="Logout"
                onPress={() => navigation.navigate("Intro")}
            />
            <ScrollView >
                {/* <Text>{user}</Text>; */}
                <Text style={styles.Name}>Hello, <MaterialIcon style={styles.icon} name="hand-wave" size={30} color="#C7C8CC" /></Text>
                <Text style={styles.User}>{name}</Text>

                {/* <Button title="Add" onPress={incrementCount}></Button> */}
                {/* <View style={{flexDirection:"row",alignItems:"center"}}> */}
                {/* <View> */}
                <View style={styles.steps}>
                    <Text style={styles.Name}>Steps</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon style={styles.icon} type="ionIcons" name="footsteps" size={30} color="#4CCD99" />
                        <Text style={styles.value}>{steps[0]}</Text>
                        {/* <Text style={styles.value}>{count}</Text> */}
                        {/* <Text> {count} </Text> */}
                    </View>
                </View>
                <View>
                        <ProgressChart
                            data={data}
                            width={350}
                            height={220}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={chartConfig}
                            hideLegend={false}
                        />
                    </View>
                <View style={styles.steps}>
                    <Text style={styles.Name}>Heart rate</Text>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon style={styles.icon} type="AntDesign" name="heart" size={30} color="#FF204E" />
                        <Text style={styles.value}>{restingHeartRate[restingHeartRate.length - 1]}</Text>
                    </View>
                    {/* </View> */}
                </View>
                {/* <Image style={{maxWidth:"35%",marginLeft:"13%", aspectRatio: 1}} source={require('../appimg2.png')}/> */}
                {/* </View> */}
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.sleep}>
                        <Text style={styles.Name}>Distance</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwe style={styles.icon} name="location-dot" size={30} color="#1D24CA" />
                            <Text style={styles.value}>{parseFloat(distance[distance.length - 1]).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.calories}>
                        <Text style={styles.Name}>Calories :</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcon style={styles.icon} name="fire" size={30} color="#F57D1F" />
                            <Text style={styles.value}>{parseInt(activeCaloriesBurned[activeCaloriesBurned.length - 1])}</Text>
                        </View>
                    </View>
                </View>
                {/* <Text style={styles.text}>Home Screen</Text> */}

                {/* <Button
            style={styles.But}
                title="Go to Health Data"
                onPress={() => navigation.navigate("Health Data")}
            /> */}
                <Text style={{ color: "#fffff0", fontSize: 24, fontFamily: "Poppins-SemiBold", marginLeft: "5%" }}>Other Medical Data</Text>
                <View>
                    <ScrollView horizontal={true} style={{ height: "35%", position: "relative" }}>
                        <View style={styles.extra}>
                            <Text style={styles.SmallName}>Temp</Text>
                            <FontAwe style={styles.smallicon} name="temperature-half" size={30} color="#FDBF60" />
                            <Text style={styles.value}>{parseFloat(bodyTemperature[bodyTemperature.length - 1]).toFixed(2)}</Text>
                        </View>
                        <View style={styles.extra}>
                            <Text style={styles.SmallName}>BP</Text>
                            <MaterialIcon style={styles.smallicon} name="heart-pulse" size={30} color="#FF6868" />
                            <Text style={styles.value}>{parseInt(bloodPressure[bloodPressure.length - 1])}</Text>
                        </View>
                        <View style={styles.extra}>
                            <Text style={styles.SmallName}>Weight </Text>
                            <FontAwe style={styles.smallicon} name="weight-scale" size={30} color="#1D24CA" />
                            <Text style={styles.value}>{weight[weight.length - 1]}</Text>
                        </View>
                        <View style={styles.extra}>
                            <Text style={styles.SmallName}>Height :</Text>
                            <MaterialIcon style={styles.smallicon} name="human-male-height" size={30} color="#1D24CA" />
                            <Text style={styles.value}>{parseFloat(height[height.length - 1]).toFixed(2)}</Text>
                        </View>
                        <View style={styles.extra}>
                            <Text style={styles.SmallName}>Sleep</Text>
                            <MaterialIcon style={styles.smallicon} name="power-sleep" size={30} color="#1D24CA" />
                            <Text style={styles.value}>{sleep[sleep.length - 1]}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <Text title=""></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}