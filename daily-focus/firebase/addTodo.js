import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Toast from "react-native-toast-message";

export const addTodo = async (title, email) => {
  try {
    await addDoc(collection(db, "todos"), {
      title: title,
      done: false,
      createdAt: serverTimestamp(), // dùng thời gian server
      email: email
    });
    Toast.show({
        type: "success",
        text1: "Todo added!",
        text2: "Your task has been saved 👌",
      });
  } catch (e) {
    Toast.show({
        type: "error",
        text1: "Empty input!" + e.message,
        text2: "Please enter a task before saving.",
      });
  }
};
