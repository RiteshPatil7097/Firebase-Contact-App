// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfD2vdu1_geiz0_PPODa-HhTNwE1Chib0",
  authDomain: "vite-contact-822d3.firebaseapp.com",
  projectId: "vite-contact-822d3",
  storageBucket: "vite-contact-822d3.firebasestorage.app",
  messagingSenderId: "473407300719",
  appId: "1:473407300719:web:93e7e3d6a1e9ea8cb1999a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
