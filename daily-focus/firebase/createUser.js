import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export const createUser = async (email, name, phone) => {
  try {
    await addDoc(collection(db, "users"), {
      email: email,
      name: name,
      phone: phone,
      createdAt: serverTimestamp(),
    });
    Toast.show({
        type: "success",
        text1: "User created!",
        text2: "Your account has been created successfully 👌",
      });
  } catch (e) {
    Toast.show({
        type: "error",
        text1: "Empty input!" + e.message,
        text2: "Please enter all fields before saving.",
      });
  }
};
