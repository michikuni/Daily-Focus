import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleGoToRegister = () => {
    router.push('/login-register/register-activity');
  };

  const handleGoToHome = () => {
    router.push('/(tabs)');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Thành công", "Đăng nhập thành công!");
      console.log("User:", userCredential.user);
      handleGoToHome();
    } catch (error: any) {
      Alert.alert("Lỗi đăng nhập", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
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
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text style={styles.link} onPress={handleGoToRegister}>
        Chưa có tài khoản? Đăng ký
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
