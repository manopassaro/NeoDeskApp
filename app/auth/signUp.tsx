import React, { useState } from "react";
import { View, Text, Alert, Button, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { createUsuario } from "../../services/api";
import CustomInput from "../../assets/components/customInput"
import  CustomButton  from "../../assets/components/customButton";
import { globalStyles } from "@/assets/styles/globalStyles";


const SignUp = () => {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
   
    const handleSignUp = async () => {
    try {
      const data = await createUsuario(nome, email, senha);
      Alert.alert("Sucesso", data);
      router.push("/auth"); // volta pra tela de login
    } catch (err) {
      Alert.alert("Erro", "Falha ao cadastrar usuário");
    }
  };

  return (

    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.content}>

        <Text style={globalStyles.title}>CADASTRE SUA CONTA</Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <CustomInput placeholder="Confirmação Senha" value={cenha} onChangeText={setCsenha} secureTextEntry />
        
        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth")}>
          <Text style={globalStyles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  )
}

export default SignUp