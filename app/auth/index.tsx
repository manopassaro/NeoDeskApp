import React, { useState } from "react";
import { Text, View, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "../../assets/components/customInput";
import { loginUsuario } from "../../services/api";

export default function Index() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUsuario(email, senha);
      Alert.alert("Sucesso", data.message);
      router.push("/tabs/home"); // navega para Home
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha no login");
    }
  };

  return (
    <View>
      <Text>Tela Inicial (Login)</Text>

      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      <Button title="Login" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => router.push("/auth/signUp")} />  
    </View>
  );
}
