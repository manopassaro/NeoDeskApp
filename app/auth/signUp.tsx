import React, { useState } from "react";
import { View, Text, Alert, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
// import CustomInput from "../../assets/components/customInput";
// import  CustomButton  from "../../assets/components/customButton";
import { createUsuario } from "../../services/api";

const SignUp = () => {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const [cenha, setCsenha] = useState("");
   
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
    <View>
      <Text>signUp</Text>

      <TextInput placeholder="Nome completo" value={nome} onChangeText={setNome}/>      
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry/>
      {/* <CustomInput placeholder="Confirmação Senha" value={cenha} onChangeText={setCsenha} secureTextEntry /> */}
    
    <Button title="Cadastrar" onPress={handleSignUp}/>
    
    </View>
  )
}

export default SignUp