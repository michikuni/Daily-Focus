// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXJ9iBwL6MZ0PjhW46eg0IVovkZF5UBWs",
  authDomain: "react-native-todo-app-f8a3c.firebaseapp.com",
  databaseURL: "https://react-native-todo-app-f8a3c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-todo-app-f8a3c",
  storageBucket: "react-native-todo-app-f8a3c.firebasestorage.app",
  messagingSenderId: "347776524479",
  appId: "1:347776524479:web:081f952f45eee573bce60a",
  measurementId: "G-97EDSTD5ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;