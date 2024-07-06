// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "@react-native-firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb_2SV7v0yi5mjtEa9nu8AWuPjG14plRk",
  authDomain: "healthy-6686f.firebaseapp.com",
  databaseURL: "https://healthy-6686f-default-rtdb.firebaseio.com",
  projectId: "healthy-6686f",
  storageBucket: "healthy-6686f.appspot.com",
  messagingSenderId: "1040426542990",
  appId: "1:1040426542990:web:26377aaa61489ec55826df",
  measurementId: "G-NZNVN6SPVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const mydb = getDatabase(app);