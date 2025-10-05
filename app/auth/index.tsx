import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "../../assets/components/customInput";
import { globalStyles } from "../../assets/styles/globalStyles";
import { loginUsuario } from // caminho da api


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
}

  return (
    <SafeAreaView style={globalStyles.container}> 
      <View style={globalStyles.content}> 
        <Text style={globalStyles.title}>Tela Inicial (Login)</Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      

       <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth/signUp")}>
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}


