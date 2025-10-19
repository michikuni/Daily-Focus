import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { addTodo } from "../firebase/addTodo";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { updateTodo } from "../firebase/updateTodo";

const handleToggleDone = async (id: string, currentValue: boolean) => {
  await updateTodo(id, { done: !currentValue });
};

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt?: any; // Firestore timestamp
};

export default function HomeActivity() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo(text);
      setText("");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));

      setTodos(todoData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Daily Focus</Text>

      <TextInput
        placeholder="Enter your focus for today"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button title="Save Focus" onPress={handleAdd} />
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
    </View>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
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
    fontWeight: '500',
    color: '#000',
  },
  todoDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  todoFlatList: {
    width: "90%",
  },
});
