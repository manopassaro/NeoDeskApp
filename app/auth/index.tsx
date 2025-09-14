import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "../../assets/components/customInput"

export default function Index() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View>
      <Text>Tela Inicial (Login)</Text>

      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      <Button title="Login" onPress={() => router.push("/tabs/home")} />
      <Button title="Cadastrar" onPress={() => router.push("/auth/signUp")} />  
    </View>
  );
}
