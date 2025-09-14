import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "../../assets/components/customInput"
import  CustomButton  from "../../assets/components/customButton";

const signUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cenha, setCsenha] = useState("");


  return (
    <View>
      <Text>signUp</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <CustomInput placeholder="Confirmação Senha" value={cenha} onChangeText={setCsenha} secureTextEntry />
    <CustomButton title="Cadastrar" onPress={() => router.push("/auth")} />
    </View>
  )
}

export default signUp