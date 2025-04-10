// Firebase.Config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCEddMhxeU-KvmK-nxDFQuPi69PJc0LNPc",
  authDomain: "otp-validate-7bbf4.firebaseapp.com",
  projectId: "otp-validate-7bbf4",
  storageBucket: "otp-validate-7bbf4.firebasestorage.app",
  messagingSenderId: "951055011856",
  appId: "1:951055011856:web:e25d68f38958ee041cba95",
  measurementId: "G-20GCBRS793",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

