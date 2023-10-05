// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlCYPBGbGaWaddl55gbhvCzypflkjtiw8",
  authDomain: "booking-parking-6cf05.firebaseapp.com",
  projectId: "booking-parking-6cf05",
  storageBucket: "booking-parking-6cf05.appspot.com",
  messagingSenderId: "499677395423",
  appId: "1:499677395423:web:18ffc19a80fda5cc4f2c6a",
  databaseURL: 'https://booking-parking-6cf05-default-rtdb.firebaseio.com'
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy