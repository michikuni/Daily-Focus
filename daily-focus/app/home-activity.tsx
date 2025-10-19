import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { addTodo } from '../firebase/addTodo';
import { useState } from "react";


export default function HomeActivity() {
  const [text, setText] = useState("");

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo(text);
      setText("");
    }
  };
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
});
