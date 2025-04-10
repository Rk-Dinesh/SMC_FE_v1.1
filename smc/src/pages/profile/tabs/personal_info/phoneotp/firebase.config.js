
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ45DF2BKEE7e74DmvCYVNXoEZep-oWDc",
  authDomain: "fir-beb4c.firebaseapp.com",
  projectId: "fir-beb4c",
  storageBucket: "fir-beb4c.firebasestorage.app",
  messagingSenderId: "63932649007",
  appId: "1:63932649007:web:1ab64f856477cb36f7c0da",
  measurementId: "G-F7FR2J4CCB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)