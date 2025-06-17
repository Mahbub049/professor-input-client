// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZC8QmftunENBuv7mO0qPAslQrBfkgh40",
  authDomain: "professor-website-auth.firebaseapp.com",
  projectId: "professor-website-auth",
  storageBucket: "professor-website-auth.firebasestorage.app",
  messagingSenderId: "910905462009",
  appId: "1:910905462009:web:9fba8bf1e1f02a29a3e628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);