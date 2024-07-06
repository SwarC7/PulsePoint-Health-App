import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
// import CheckBox from 'react-native-check-box';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import auth, { firebase2 } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const hobbiesData = [
    { id: '1', label: 'Do you have any abdominal pain?' },
    { id: '2', label: 'Are you suffering from abnormal menstruation?' },
    { id: '3', label: 'Are you suffering from acidity?' },
    { id: '4', label: 'Are you suffering from acute liver failure?' },
    { id: '5', label: 'Do you find it hard to focus or to concentrate?' },
    { id: '6', label: 'Do you have problems relating to anxiety?' },
    { id: '7', label: 'Are you suffering from back pain?' },
    { id: '8', label: 'Do you find pain in your belly?' },
    { id: '9', label: 'Do you have small black bumps on your skin?' },
    { id: '10', label: 'Do you face discomfort in your bladder?' },
    { id: '11', label: 'Do you have blisters on your skin?' },
    { id: '12', label: 'Do you cough out blood?' },
    { id: '13', label: 'Do you have blood while passing stools?' },
    { id: '14', label: 'Do you have bluerred and distorted vision?' },
    { id: '15', label: 'Do you often suffer from breathlessness' },
    { id: '16', label: 'Do you have brittle nails?' },
    { id: '17', label: 'Do you have bruises in your body?' },
    { id: '18', label: 'Do you have a burning sensation while passing urine?' },
    { id: '19', label: 'Are you suffering from chest pain frequently?' },
    { id: '20', label: 'Do you get chills all the time?' },
    { id: '21', label: 'Does your hands and feet turn cold often?' },
    { id: '22', label: 'Is the patient in coma?' },
    { id: '23', label: 'Are you suffering from Nasal congestion?' },
    { id: '24', label: 'Are you suffering from constipation?' },
    { id: '25', label: 'Do you feel like you an urge to pass urine continously?' },
    { id: '26', label: 'Do you sneeze continously?' },
    { id: '27', label: 'Do you cough more so often recently?' },
    { id: '28', label: 'Are you suffering from cramps in your muscles?' },
    { id: '29', label: 'Is your urine dark in color?' },
    { id: '30', label: 'Do you feel dehydrated often?' },
    { id: '31', label: 'Are you suffering from depression lately?' },
    { id: '32', label: 'Are you suffering from diarrhoea?' },
    { id: '33', label: 'Do you have dischromic patches on you skin?' },
    { id: '34', label: 'Do you have a enlarged/distended abdomen?' },
    { id: '35', label: 'Do you feel dizzy often?' },
    { id: '36', label: 'Do you have dry and tingling lips?' },
    { id: '37', label: 'Do you have an enlarged thyroid?' },
    { id: '38', label: 'Do you feel more starved pf hunger blately?' },
    { id: '39', label: 'Did you recently participate in extra maritial contacts?' },
    { id: '40', label: 'Do you have a family history of diseases?' },
    { id: '41', label: 'Does your heart beat fast often lately?' },
    { id: '42', label: 'Do you feel tired and fatigued all the time?' },
    { id: '43', label: 'Do you have excess fluid in your body?' },
    { id: '44', label: 'Does your urine have a foul smell?' },
    { id: '45', label: 'Do you get migraines or headaches often these days?' },
    { id: '46', label: 'Are you suffering from high fever?' },
    { id: '47', label: 'Do you have pain in your hips or joints?' },
    { id: '48', label: 'Do you have a history of alcoholic abuse?' },
    { id: '49', label: 'Do you have an increased appetite lately?' },
    { id: '50', label: 'Are you suffering from indigestion?' },
    { id: '51', label: 'Are your nails inflamed?' },
    { id: '52', label: 'Do you have internal itching in your body?' },
    { id: '53', label: 'Is your sugar level irregular?' },
    { id: '54', label: 'Do you feel irritable these days?' },
    { id: '55', label: 'Are you suffering from irritation in your anus?' },
    { id: '56', label: 'Are you suffering from itching?' },
    { id: '57', label: 'Are you suffering from joint pain?' },
    { id: '58', label: 'Are you suffering from knee pain?' },
    { id: '59', label: 'Do you have a lack of concentration lately?' },
    { id: '60', label: 'Do you feel lethargic and lazy lately?' },
    { id: '61', label: 'Do you have a loss of appetite more often these days?' },
    { id: '62', label: 'Are you facing a loss of balance?' },
    { id: '63', label: 'Are you suffering from loss of smell?' },
    { id: '64', label: 'Do you have a general feeling of discomfort and unease?' },
    { id: '65', label: 'Are you suffering from a mild fever?' },
    { id: '66', label: 'Do you often get mood swings?' },
    { id: '67', label: 'Do you face stiffness in your muscle movement?' },
    { id: '68', label: 'Do you have mucus in your sputum?' },
    { id: '69', label: 'Are you suffering from muscle pain?' },
    { id: '70', label: 'Do you feel wastage of your muscle?' },
    { id: '71', label: 'Do you feel a weakness in your muscle?' },
    { id: '72', label: 'Do you feel nauseatic lately?' },
    { id: '73', label: 'Are you suffering from neck pain?' },
    { id: '74', label: 'Are you suffering from rashes on your skin?' },
    { id: '75', label: 'Are you suffering from obesity?' },
    { id: '76', label: 'Do you feel pain behind your eyes?' },
    { id: '77', label: 'Do you feel pain while passing stools?' },
    { id: '78', label: 'Are you suffering from pain in your anal region?' },
    { id: '79', label: 'Do you find it painful to walk?' },
    { id: '80', label: 'Do you get palpitations often?' },
    { id: '81', label: 'Do you often pass gas?' },
    { id: '82', label: 'Do you feel you have patches in your throat?' },
    { id: '83', label: 'Do you cough phlegm/mucus out?' },
    { id: '84', label: 'Do you pee a lot?' },
    { id: '85', label: 'Is your calf veins enlarged?' },
    { id: '86', label: 'Are you suffering from puffy face and eyes?' },
    { id: '87', label: 'Do you have pus-filled pimples?' },
    { id: '88', label: 'Have you recently received a blood transfusion?' },
    { id: '89', label: 'Have you recently received an unsterile injection?' },
    { id: '90', label: 'Do you have red sores around your nose?' },
    { id: '91', label: 'Do you have red spots all over your body?' },
    { id: '92', label: 'Are your eyes red lately?' },
    { id: '93', label: 'Are you feel restless often these days?' },
    { id: '94', label: 'Are you suffering from runny nose?' },
    { id: '95', label: 'Is your sputum rust colored?' },
    { id: '96', label: 'Do you have scars in your body?' },
    { id: '97', label: 'Do you shiver a lot?' },
    { id: '98', label: 'Is your skin bluish-grey?' },
    { id: '99', label: 'Are you suffering from sinus pressure?' },
    { id: '100', label: 'Is your skin start to peel off?' },
    { id: '101', label: 'Do you have rashes on your skin?' },
    { id: '102', label: 'Do you have a slurred/slow speech?' },
    { id: '103', label: 'Do you have white patches on your nails?' },
    { id: '104', label: 'Do you feel like spinning movements?' },
    { id: '105', label: 'Do you pass out blood in your urine?' },
    { id: '106', label: 'Do you have a stiff neck?' },
    { id: '107', label: 'Is your stomach bleeding?' },
    { id: '108', label: 'Are you suffering from a pain in your stomach?' },
    { id: '109', label: 'Are your eyes sunken?' },
    { id: '110', label: 'Do you sweat a lot these days?' },
    { id: '111', label: 'Are your lymph nodes swollen?' },
    { id: '112', label: 'Are your joints swollen?' },
    { id: '113', label: 'Is your stomach enlarged?' },
    { id: '114', label: 'Are your blood vessels swollen?' },
    { id: '115', label: 'Are your hands swollen?' },
    { id: '116', label: 'Are your legs swollen?' },
    { id: '117', label: 'Are you suffering from throat irritation?' },
    { id: '118', label: 'Do you often get bacterial infections?' },
    { id: '119', label: 'Do you have ulcers on your tongue?' },
    { id: '120', label: 'Do you feel a general lack of steadiness?' },
    { id: '121', label: 'Do you often face visual disturbances like short spell of flashing or shimmering of light in your sight?' },
    { id: '122', label: 'Do you vomit frequently lately?' },
    { id: '123', label: 'Are your eyes watery?' },
    { id: '124', label: 'Do you feel weakness in your limbs?' },
    { id: '125', label: 'Do you feel a weakness in one particular side of your body?' },
    { id: '126', label: 'Did you recently have an abnormal increase in your weight?' },
    { id: '127', label: 'Did you recently have an abnormal decrease in your weight?' },
    { id: '128', label: 'Do you have a pus on your skin?' },
    { id: '129', label: 'Is your urine yellow in color?' },
    { id: '130', label: 'Are your eyes yellow in color?' },
    { id: '131', label: 'Is your skin yellowish?' },
    { id: '132', label: 'do you have Biology?'}
];


const reference = firebase.app().database('https://healthy-6686f-default-rtdb.firebaseio.com').ref('/user');
const features = [
    "abdominal_pain",
    "abnormal_menstruation",
    "acidity",
    "acute_liver_failure",
    "altered_sensorium",
    "anxiety",
    "back_pain",
    "belly_pain",
    "blackheads",
    "bladder_discomfort",
    "blister",
    "blood_in_sputum",
    "bloody_stool",
    "blurred_and_distorted_vision",
    "breathlessness",
    "brittle_nails",
    "bruising",
    "burning_micturition",
    "chest_pain",
    "chills",
    "cold_hands_and_feets",
    "coma",
    "congestion",
    "constipation",
    "continuous_feel_of_urine",
    "continuous_sneezing",
    "cough",
    "cramps",
    "dark_urine",
    "dehydration",
    "depression",
    "diarrhoea",
    "dischromic_patches",
    "distention_of_abdomen",
    "dizziness",
    "drying_and_tingling_lips",
    "enlarged_thyroid",
    "excessive_hunger",
    "extra_marital_contacts",
    "family_history",
    "fast_heart_rate",
    "fatigue",
    "fluid_overload",
    "fluid_overload",
    "foul_smell_of_urine",
    "headache",
    "high_fever",
    "hip_joint_pain",
    "history_of_alcohol_consumption",
    "increased_appetite",
    "indigestion",
    "inflammatory_nails",
    "internal_itching",
    "irregular_sugar_level",
    "irritability",
    "irritation_in_anus",
    "itching",
    "joint_pain",
    "knee_pain",
    "lack_of_concentration",
    "lethargy",
    "loss_of_appetite",
    "loss_of_balance",
    "loss_of_smell",
    "malaise",
    "mild_fever",
    "mood_swings",
    "movement_stiffness",
    "mucoid_sputum",
    "muscle_pain",
    "muscle_wasting",
    "muscle_weakness",
    "nausea",
    "neck_pain",
    "nodal_skin_eruptions",
    "obesity",
    "pain_behind_the_eyes",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "painful_walking",
    "palpitations",
    "passage_of_gases",
    "patches_in_throat",
    "phlegm",
    "polyuria",
    "prominent_veins_on_calf",
    "puffy_face_and_eyes",
    "pus_filled_pimples",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "red_sore_around_nose",
    "red_spots_over_body",
    "redness_of_eyes",
    "restlessness",
    "runny_nose",
    "rusty_sputum",
    "scurring",
    "shivering",
    "silver_like_dusting",
    "sinus_pressure",
    "skin_peeling",
    "skin_rash",
    "slurred_speech",
    "small_dents_in_nails",
    "spinning_movements",
    "spotting_urination",
    "stiff_neck",
    "stomach_bleeding",
    "stomach_pain",
    "sunken_eyes",
    "sweating",
    "swelled_lymph_nodes",
    "swelling_joints",
    "swelling_of_stomach",
    "swollen_blood_vessels",
    "swollen_extremeties",
    "swollen_legs",
    "throat_irritation",
    "toxic_look_typhos",
    "ulcers_on_tongue",
    "unsteadiness",
    "visual_disturbances",
    "vomiting",
    "watering_from_eyes",
    "weakness_in_limbs",
    "weakness_of_one_body_side",
    "weight_gain",
    "weight_loss",
    "yellow_crust_ooze",
    "yellow_urine",
    "yellowing_of_eyes",
    "yellowish_skin",
];
// Add more hobbies here as needed

export default function Questions() {
    const [Name, setName] = useState("");
    const [hobbies, setHobbies] = useState(
        hobbiesData.reduce((acc, hobby) => {
            acc[hobby.id] = 0; // Initialize all hobbies with 0
            return acc;
        }, {})
    );

    const handleToggleCheckbox = (hobbyId) => {
        setHobbies((prevState) => ({
            ...prevState,
            [hobbyId]: prevState[hobbyId] === 1 ? 0 : 1, // Toggle between 0 and 1
        }));
    };

    const handleGetSelectedHobbies = () => {
        const selectedHobbies = hobbiesData.map((hobby) => (hobbies[hobby.id] === 1 ? 1 : 0));
        console.log('Selected Hobbies:', selectedHobbies);
        // You can do further processing with the selected hobbies here
    };

    function create() {
        const selectedHobbies = hobbiesData.map((hobby) => (hobbies[hobby.id] === 1 ? '1' : '0'));
        console.log('Selected Hobbies:', selectedHobbies);
        const Questions = {};

        for (let i = 0; i < features.length + 1; i++) {
            Questions[features[i]] = selectedHobbies[i];
        }

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
        if (Name != "") {
            database()
                .ref('/' + Name + '/Questions/')
                .update({
                    0: Questions
                })
                .then(() => Dialog.show({
                    type: ALERT_TYPE.SUCCESS, title: 'Success',
                    textBody: 'Your responses have been recorded',
                    button: 'close',
                }))
        }
    }

    return (
        <ScrollView>
            <View style={{ margin: 20, padding: 10, backgroundColor: 'rgba(136, 151, 190, 0.2)', borderRadius: 8, borderWidth: 0.8, borderColor: "#8897BE" }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: "Poppins-SemiBold",
                        color: 'black',
                        marginBottom: 20,
                        // textAlign:"center"
                    }}>
                    Please select the options that you believe may correspond to your health condition.
                </Text>
                {hobbiesData.map((hobby) => (
                    <BouncyCheckbox
                        key={hobby.id}
                        size={25}
                        isChecked={hobbies[hobby.id] === 1}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        text={hobby.label}
                        iconStyle={{ borderColor: "red" }}
                        textStyle={{
                            fontSize: 15,
                            color: hobbies[hobby.id] === 1 ? 'black' : 'black',
                            fontFamily: "Poppins-Regular",
                        }}
                        onPress={() => handleToggleCheckbox(hobby.id)}
                    />
                ))}
                <AlertNotificationRoot>
                    <View>
                        <Button
                            title="Submit"
                            onPress={create}
                        />
                    </View>
                </AlertNotificationRoot>
            </View>
        </ScrollView>
    );
}