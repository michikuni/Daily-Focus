import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

const app = initializeApp(firebaseConfig);
let auths;
try {
  auths = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auths = getAuth(app);
}
export const db = getFirestore(app);
export const auth = auths;

export default app;
