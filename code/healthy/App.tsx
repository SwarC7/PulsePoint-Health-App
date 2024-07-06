import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen.js";
import HealthScreen from "./screens/HealthScreen.js"
import AboutScreen from './screens/AboutScreen.js'
import IntroScreen from './screens/IntroScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import Questions from './screens/QuestionScreen.js';
import ProfessionalScreen from './screens/Professional.js';
import React from 'react'
import Icon from './node_modules/react-native-vector-icons/Ionicons';
import Icon1 from './node_modules/react-native-vector-icons/MaterialIcons';
import Icon2 from './node_modules/react-native-vector-icons/FontAwesome';
import CustomDrawerContent from './DrawerContent';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Analysis from './screens/AnalysisScreen.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    let user = firebase.auth().currentUser?.uid;
    var page = 'Login';
    if(user)
    {
        console.log("Already Logged in");
        page = 'Main';
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={page}>
                <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Home2" component={HomeScreen} options={{headerShown: false}} /> */}
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfScr" component={ProfessionalScreen} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainScreen() {
    return (

        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0163d2',
                },
                headerTintColor: '#ffffff',
                headerTitleAlign: 'center',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen options={{
                title: 'Home',
                drawerIcon: ({ focused, size }) => (
                    <Icon
                        name='home'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="Home" component={HomeScreen} />
            <Drawer.Screen options={{
                title: 'Health data',
                drawerIcon: ({ focused, size }) => (
                    <Icon1
                        name='health-and-safety'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="Health Data" component={HealthScreen} />
            <Drawer.Screen options={{
                title: 'Profile',
                drawerIcon: ({ focused, size }) => (
                    <Icon
                        name='home'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="About" component={AboutScreen} />
            
            <Drawer.Screen options={{
                title: 'Questions',
                drawerIcon: ({ focused, size }) => (
                    <Icon
                        name='home'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="Questions" component={Questions} />
             <Drawer.Screen options={{
                title: 'Analysis',
                drawerIcon: ({ focused, size }) => (
                    <Icon
                        name='home'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="Analysis" component={Analysis} />
                <Drawer.Screen options={{
                title: 'ProfScreen2',
                drawerIcon: ({ focused, size }) => (
                    <Icon
                        name='home'
                        size={24}
                        color='#0163d2' />
                ),
            }}
                name="ProfScreen2" component={ProfessionalScreen} />
        </Drawer.Navigator>
    );
}
