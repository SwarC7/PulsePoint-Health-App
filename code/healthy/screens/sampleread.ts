import {
    initialize,
    getGrantedPermissions,
    readRecords,
    openHealthConnectSettings,
} from 'react-native-health-connect';
import { useState } from 'react';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Health_Connect_Data_retrival = () => {

    const startTime_text = "2024-03-15T12:00:00.405Z";  // Change Here for changing Timeline

    const [name, setname] = useState(".");
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
    const [Rate, setHeartRate] = useState([0]);
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

    // Functions to read data
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
                        startTime: startTime_text,
                    },
                });
                setWeight(result.map(record => record.weight.inKilograms));
                const result2 = await readRecords("BasalMetabolicRate", {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBasalMetabolicRate(result2.map(record => record.basalMetabolicRate.inKilocaloriesPerDay));
                const result3 = await readRecords('BasalBodyTemperature', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBasalBodyTemperature(result3.map(record => record.temperature.inFahrenheit));
                const result4 = await readRecords('ActiveCaloriesBurned', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setActiveCaloriesBurned(result4.map(record => record.energy.inCalories));
                const result5 = await readRecords('BloodGlucose', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBloodGlucose(result5.map(record => record.level.inMillimolesPerLiter));
                const result6 = await readRecords('BloodPressure', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBloodPressure(result6.map(record => record.systolic.inMillimetersOfMercury));
                const result7 = await readRecords('BodyFat', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBodyFat(result7.map(record => record.percentage));
                const result8 = await readRecords('BodyTemperature', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBodyTemperature(result8.map(record => record.temperature.inCelsius));
                const result9 = await readRecords('BodyWaterMass', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setBodyWaterMass(result9.map(record => record.mass.inKilograms));
                const result10 = await readRecords('Distance', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setDistance(result10.map(record => record.distance.inMeters));
                const result11 = await readRecords('Height', {
                    timeRangeFilter: {
                        operator: 'after',
                        startTime: startTime_text,
                    },
                });
                setHeight(result11.map(record => record.height.inFeet));
                const result12 = await readRecords('Steps', {
                    timeRangeFilter: {
                        operator: 'between',
                        startTime: '2024-03-15T00:00:00.405Z',
                        endTime: '2024-03-16T00:00:00.405Z',
                    },
                });
                const Step_p = result12.map(record => record.count);
                var total_steps = 0;
                for (var i=0; i<Step_p.length; i++)
                {
                    total_steps += Step_p[i];
                }
                setSteps([total_steps]);
            }

            // Now uploading that data into the firebase
            const username = firebase.auth().currentUser?.email;
            firebase.app().database('https://healthy-6686f-default-rtdb.firebaseio.com').ref('/user');
            if (username != undefined) {
                firestore()
                    .collection('USERS')
                    .doc(username)
                    .onSnapshot(documentSnapshot => {
                        const firestore_data = documentSnapshot.data();
                        if (firestore_data != undefined) {
                            setname(firestore_data["Name"]);
                        }
                    });
            }
            if (name != ".") {
                firebase.app().database('https://healthy-6686f-default-rtdb.firebaseio.com').ref('/user');
                const text = '/' + name + '/';
                database()
                    .ref(text)
                    .update({
                        Name: name,
                        Age: 22,
                        Weight: weight[0],
                        Height: height[0],
                        HealthData: {
                            ActCalBurn: activeCaloriesBurned,
                            BP: bloodPressure,
                            BTemp: bodyTemperature,
                            Dis: distance,
                            HR: Rate,
                            OxySat: oxygenSaturation,
                            RR: respiratoryRate,
                            restingHR: restingHeartRate,
                            steps: steps,
                            Sleep: sleep,
                        },
                    }).then(()=>{console.log("----------UPLOADED SUCCESSFULLY ------")});
                }
        } catch (error) {
            console.error('Error in Health Connect functionality:', error);
        }
    };
    return { readSampleData, weight, basalMetabolicRate, basalBodyTemperature, activeCaloriesBurned, bloodGlucose, bloodPressure, bodyFat, bodyTemperature, bodyWaterMass, boneMass, distance, elevationGained, floorsClimbed, Rate, height, nutrition, oxygenSaturation, power, respiratoryRate, restingHeartRate, sleep, speed, steps, totalCaloriesBurned };
}

export default Health_Connect_Data_retrival;