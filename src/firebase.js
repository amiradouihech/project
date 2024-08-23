// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7t89MlH3I4ht0XsR_xj8UIhS8KajUKDM",
  authDomain: "dyslexie-project.firebaseapp.com",
  projectId: "dyslexie-project",
  storageBucket: "dyslexie-project.appspot.com",
  messagingSenderId: "715048793416",
  appId: "1:715048793416:web:89c92daf44c03e60f66f7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
