// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlT_hH-Hr_J72k9txiRIzuchp8YkBLUJE",
  authDomain: "power-hack-b0712.firebaseapp.com",
  projectId: "power-hack-b0712",
  storageBucket: "power-hack-b0712.appspot.com",
  messagingSenderId: "841475448544",
  appId: "1:841475448544:web:191233c162dc20ef597a85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;