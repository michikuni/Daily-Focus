import { collection, getDocs, doc, getDoc  } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todos;
}
export async function getTodoById(id) {
  const docRef = doc(db, "todos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
}

// export function listenTodos(callback) {
//   const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
//     const todos = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     callback(todos);
//   });

//   // return để có thể dừng listener
//   return unsubscribe;
// }