import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { createUser } from "../../firebase/createUser";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const handleGoToLogin = () => {
    router.push('/login-register/login-activity');
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Lưu thông tin bổ sung vào Firestore
      createUser(email, name, phone);
      Alert.alert("Thành công", "Tạo tài khoản thành công!");
      handleGoToLogin();
    } catch (error: any) {
      Alert.alert("Lỗi đăng ký", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        keyboardType="default"
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Đăng ký" onPress={() => {
        if (password === confirmPassword) {
          handleRegister();
        } else {
          Alert.alert("Lỗi", "Mật khẩu không khớp");
        }
      }} />
      <Text style={styles.link} onPress={handleGoToLogin}>
        Đã có tài khoản? Đăng nhập
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10, borderRadius: 8 },
  link: { color: "blue", textAlign: "center", marginTop: 10 },
});
