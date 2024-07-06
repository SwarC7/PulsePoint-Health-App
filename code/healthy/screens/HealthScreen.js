import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, View, StyleSheet } from 'react-native';
// import { useEffect } from 'react';

import {
    initialize,
    getGrantedPermissions,
    readRecords,
    openHealthConnectSettings,
} from 'react-native-health-connect';
import {
    accelerometer, setUpdateIntervalForType, SensorTypes,
    gyroscope,
    barometer,
    magnetometer
} from 'react-native-sensors';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";

const Health_Connect_Data = ["Weight", "BasalMetabolicRate", "BasalBodyTemperature", "BloodGlucose", "BloodPressure",
    "BodyFat", "BodyTemperature", "BodyWaterMass", "CyclingPedalingCadence", "Distance", "ElevationGained",
    "FloorsClimbed", "HeartRate", "Height", "Nutrition", "OxygenSaturation", "Power", "RespiratoryRate",
    "RestingHeartRate", "SleepSession", "Speed", "Steps", "TotalCaloriesBurned", "ActiveCaloriesBurned", "BoneMass"]

const reference = firebase.app().database('https://healthy-6686f-default-rtdb.firebaseio.com').ref('/user');

export let weightTest = 'NA';
export var sleeper = 'NA';
export var actcaler = 'NA';
export var bper = 'NA';
export var btemper = 'NA';
export var disser = 'NA';
export let hrer = 'NA';
export var her = 'NA';
// export var oxysater = 'NA';
// export var rrr = 'NA';
// export var rhr = 'NA';
// export var sleeper = 'NA';
export var stepper  = 'NA'; 

export default function HealthScreen() {

    const [fir_data, setfir_data] = useState('');

    function reader() {

        database()
            .ref('/user/name/')
            .once('value')
            .then(snapshot => {
                setfir_data(snapshot.val());
                console.log('User data: ', snapshot.val());
            });
    }

    function create() {
        database()
            .ref('/tester_02/')
            .set({
                Name: 'Unknown_Lora_01',
                Age: 22,
                Weight: weight,
                HealthData : {
                    ActCalBurn: activeCaloriesBurned,
                    BP: bloodPressure,
                    BTemp: bodyTemperature,
                    Dis: distance,
                    H: height,
                    HR: heartRate,
                    OxySat: oxygenSaturation,
                    RR: respiratoryRate,
                    restingHR: restingHeartRate,
                    steps: steps,
                    Sleep: sleep,
                    // elevGain: elevationGained,
                    // BMR: basalMetabolicRate,
                    // BBT: basalBodyTemperature,
                    // bloodglucose: bloodGlucose,
                    // BF: bodyFat,
                    // BWM: bodyWaterMass, ///
                    // BoneMass: boneMass,
                    // floor_climbed: floorsClimbed,
                    // Nutri: nutrition,
                    // Power: power,
                    // Speed:speed,
                    // TotalCal: totalCaloriesBurned
                },
                SensorData : {
                    Accelerometer : accelerometerData,
                    Magnetometer : mag,
                    Gyrometer : gyroscopeData,
                    Barometer : bar
                }
            })
            .then(() => console.log('------DATA UPDATES ON FIREBASE -----'));
    }

    const [weight, setWeight] = useState([0]);
    const [basalMetabolicRate, setBasalMetabolicRate] = useState([0]);
    const [basalBodyTemperature, setBasalBodyTemperature] = useState([0]);
    const [activeCaloriesBurned, setActiveCaloriesBurned] = useState([0]);
    const [bloodGlucose, setBloodGlucose] = useState([0]);
    const [bloodPressure, setBloodPressure] = useState([0]);
    const [bodyFat, setBodyFat] = useState([0]);
    const [bodyTemperature, setBodyTemperature] = useState([0]);
    const [bodyWaterMass, setBodyWaterMass] = useState([0]);
    const [boneMass, setBoneMass] = useState([0]);
    const [distance, setDistance] = useState([0]);
    const [elevationGained, setElevationGained] = useState([0]);
    const [floorsClimbed, setFloorsClimbed] = useState([0]);
    const [heartRate, setHeartRate] = useState([0]);
    const [height, setHeight] = useState([0]);
    const [nutrition, setNutrition] = useState([0]);
    const [oxygenSaturation, setOxygenSaturation] = useState([0]);
    const [power, setPower] = useState([0]);
    const [respiratoryRate, setRespiratoryRate] = useState([0]);
    const [restingHeartRate, setRestingHeartRate] = useState([0]);
    const [sleep, setSleep] = useState([0]);
    const [speed, setSpeed] = useState([0]);
    const [steps, setSteps] = useState([0]);
    const [totalCaloriesBurned, setTotalCaloriesBurned] = useState([0]);

    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscopeData, setGyro] = useState({ x: 0, y: 0, z: 0 });
    const [mag, setmag] = useState({ x: 0, y: 0, z: 0 });
    const [bar, setbar] = useState({ pressure: 0 });

    useEffect(() => {
        setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // Adjust the interval as needed

        const intervalId = setInterval(() => {
            accelerometer.subscribe(({ x, y, z }) => {
                setAccelerometerData({ x, y, z });
            });
        }, 100000);
        // const intervalId2 = setInterval(() => {
        //     gyroscope.subscribe(({ x, y, z }) => {
        //         setGyro({ x, y, z });
        //     });
        // })
        // const intervalId3 = setInterval(() => {
        //     magnetometer.subscribe(({ x, y, z }) => {
        //         setmag({ x, y, z });
        //     });
        // })
        // const intervalId4 = setInterval(() => {
        //     barometer.subscribe(({ pressure}) => {
        //         setbar({ pressure });
        //     });
        // })

        return () => {
            clearInterval(intervalId);
            // clearInterval(intervalId2);
            // clearInterval(intervalId3)
            // clearInterval(intervalId4);
        };
    }, []);

    useEffect(() => {
        return () => {
           readSampleData();
        };
    }, [10000]);

    const readSampleData = async () => {
        try {
            // Initialize the client
            const isInitialized = await initialize();
            console.log('Health Connect Initialized:', isInitialized);

            const listPermissions = await getGrantedPermissions();
            console.log(listPermissions);
            if (listPermissions.length < 20) {
                const opener = await openHealthConnectSettings()
            }
            else {
                console.log("Executed retriving Health data")
                const result = await readRecords('Weight', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setWeight(result.map(record => record.weight.inKilograms));
                weightTest = result.map(record => record.weight.inKilograms);
                const result2 = await readRecords("BasalMetabolicRate", {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBasalMetabolicRate(result2.map(record => record.basalMetabolicRate.inKilocaloriesPerDay));
                const result3 = await readRecords('BasalBodyTemperature', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBasalBodyTemperature(result3.map(record => record.temperature.inFahrenheit));
                const result4 = await readRecords('ActiveCaloriesBurned', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setActiveCaloriesBurned(result4.map(record => record.energy.inCalories));
                actcaler = activeCaloriesBurned[activeCaloriesBurned.length - 1];
                const result5 = await readRecords('BloodGlucose', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBloodGlucose(result5.map(record => record.level.inMillimolesPerLiter));
                const result6 = await readRecords('BloodPressure', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBloodPressure(result6.map(record => record.systolic.inMillimetersOfMercury));
                bper = bloodPressure[bloodPressure.length - 1];
                const result7 = await readRecords('BodyFat', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBodyFat(result7.map(record => record.percentage));
                const result8 = await readRecords('BodyTemperature', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBodyTemperature(result8.map(record => record.temperature.inCelsius));
                btemper = bodyTemperature[bodyTemperature.length - 1];
                const result9 = await readRecords('BodyWaterMass', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setBodyWaterMass(result9.map(record => record.mass.inKilograms));
                const result10 = await readRecords('Distance', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setDistance(result10.map(record => record.distance.inMeters));
                // console.log(distance);
                disser = distance[distance.length - 1];
                const result11 = await readRecords('Height', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setHeight(result11.map(record => record.height.inFeet));
                her = height[height.length - 1];
                const result12 = await readRecords('Steps', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setSteps(result12.map(record => record.count));
                stepper = steps[steps.length - 1];
                const result13 = await readRecords('HeartRate', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setHeartRate(result13.map(record => record.samples));
                hrer = heartRate[heartRate.length - 1];
                const result14 = await readRecords('SleepSession', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: '2024-03-15T12:00:00.405Z',
                    },
                });
                setSleep(result14.map(record => record.startTime));
                sleeper = sleep[sleep.length -1];
            }

        } catch (error) {
            console.error('Error in Health Connect functionality:', error);
            // Add more detailed logging or error handling if needed
        }
    };
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ marginTop: 0, alignItems: 'center' }}>
            <Text>Health Connect Weight Data</Text>
            <View style={{ marginTop: 20, padding: 30 }}>
                <Button title="Read Sample Data" onPress={readSampleData} />
                <Button
                    title="Start Recording Sensor"
                    onPress={() => setUpdateIntervalForType(SensorTypes.accelerometer, 1000)}
                />
                <Button
                    title="Stop Recording Sensor"
                    onPress={() => setUpdateIntervalForType(SensorTypes.accelerometer, 1000000)}
                />
                <Button onPress={reader} title='SEE Data from firebase' />
                <Button onPress={create} title='UPDATE Data to firebase' />
                {/* <Text>{count}</Text> */}
                <Text>Accelerometer Data:</Text>
                <Text>X: {accelerometerData.x}</Text>
                <Text>Y: {accelerometerData.y}</Text>
                <Text>Z: {accelerometerData.z}</Text>
                <Text>Weight: {weight.map((item, index) => index >= 0 ? `\n${item}` : item)}</Text>
                <Text>Name : {fir_data}</Text>
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    }
});