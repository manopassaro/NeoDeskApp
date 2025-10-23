import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "../assets/components/customInput";
import { globalStyles } from "../assets/styles/globalStyles";
import { useUserDatabase } from "../services/userDb";


export default function Index() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState<"erro" | "sucesso" | "">("");
  

  async function autenticar() {
    setMensagem("");
    setMensagemTipo("");
    
    try {
      const user = await UserDatabase.login({ email, senha });

      if (user) {
        // setMensagem("Login realizado com sucesso!");
        // setMensagemTipo("sucesso");

        await AsyncStorage.setItem("user", JSON.stringify(user));

        // AsyncStorage.getItem("user").then((v) => console.log(v));
        // setTimeout(() => router.push("/tabs/home"), 1000);
      }
    } catch (error: any) {
      // mensagem do backend (error.message)
      setMensagem(error.message || "Erro inesperado ao fazer login");
      setMensagemTipo("erro");
    }
    
    }

  

  async function handleTestUsers() {
    const users = await UserDatabase.getAllUsers();
    console.log("Todos os usuários:", users);
  }

  return (
    <SafeAreaView style={globalStyles.container}> 
      <View style={globalStyles.content}> 
        <Text style={globalStyles.title}>Tela Inicial (Login)</Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      

       <TouchableOpacity style={globalStyles.button} onPress={autenticar}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/tabs/home")}>
          <Text style={globalStyles.buttonText}>Passa Direto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={handleTestUsers}>
          <Text style={globalStyles.buttonText}>Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/cadastro")}>
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> 

        {mensagem ? (
        <View
          style={{
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
            backgroundColor:
              mensagemTipo === "sucesso" ? "#D1FADF" : "#FAD1D1",
          }}
        >
          <Text
            style={{
              color: mensagemTipo === "sucesso" ? "#065F46" : "#991B1B",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {mensagem}
          </Text>
        </View>
      ) : null}

      </View>
    </SafeAreaView>
  );
}


