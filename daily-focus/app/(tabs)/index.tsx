import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTodo } from "../../firebase/addTodo";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { updateTodo } from "../../firebase/updateTodo";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";


const handleToggleDone = async (id: string, currentValue: boolean) => {
  await updateTodo(id, { done: !currentValue });
};

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt?: any; // Firestore timestamp
};

type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: any; // Firestore timestamp
};

export default function AllFocusActivity() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = auth.currentUser;

  const router = useRouter();

  const handleLogout = async () => {
      await signOut(auth);
      Alert.alert("Đăng xuất thành công!");
      router.replace('/login-register/login-activity');
  };

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo(text, user?.email || "");
      setText("");
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("email", "==", user?.email || ""),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));

      setTodos(todoData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.email]);

  useEffect(() => {
    const q = query(
      collection(db, "users")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">),
      }));

      setUsers(userData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userName = () => {
  const currentUser = users.find((u) => u.email === user?.email);
  return currentUser ? currentUser.name : "Người dùng";
};


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Xin chào! {userName()}</Text>
    <Button title="Log out" onPress={handleLogout} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your focus for today"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <Button title="Save Focus" onPress={handleAdd} />
      </View>

      <Text style={styles.title}>Danh sách Focus hôm nay</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleToggleDone(item.id, item.done)}
            style={styles.todoItemContainer}
          >
            <View style={styles.todoTextContainer}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDate}>
                {item.createdAt
                  ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                  : ""}
              </Text>
            </View>
            <Text style={styles.todoIcon}>{item.done ? "✅" : "⏳"}</Text>
          </TouchableOpacity>
        )}
        style={styles.todoFlatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row", // 👈 giúp TextInput và Button nằm ngang
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "90%",
  },
  input: {
    flex: 1, // 👈 chiếm phần còn lại của dòng
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10, // tạo khoảng cách với Button
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  todoItemContainer: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between", // chữ bên trái, icon bên phải
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoTextContainer: {
    flex: 1, // để chiếm hết chiều ngang bên trái
  },
  todoText: {
    fontSize: 16,
    flexShrink: 1, // tránh tràn text
  },
  todoIcon: {
    fontSize: 16,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  todoDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  todoFlatList: {
    width: "90%",
  },
});
