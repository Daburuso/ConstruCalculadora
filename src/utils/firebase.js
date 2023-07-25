// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkEAfDyPkNBi1_gwFA7F9taeHFn6Bwbpg",
  authDomain: "calculadora-d16bc.firebaseapp.com",
  projectId: "calculadora-d16bc",
  storageBucket: "calculadora-d16bc.appspot.com",
  messagingSenderId: "565532876821",
  appId: "1:565532876821:web:7a68e34a0934e0a6caae1c",
  measurementId: "G-6MYEXCE8LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);