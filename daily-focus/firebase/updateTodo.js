import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateTodo = async (id, newData) => {
  try {
    const todoRef = doc(db, "todos", id); // Lấy tham chiếu document theo id
    await updateDoc(todoRef, newData);
    console.log("Todo updated!");
  } catch (e) {
    console.error("Error updating todo: ", e);
  }
};
