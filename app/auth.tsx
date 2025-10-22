import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomInput from "../assets/components/customInput";
import { globalStyles } from "../assets/styles/globalStyles";
import { useUserDatabase } from "../services/userDb";


export default function Index() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  
  async function autenticar() {
      const user = await UserDatabase.login({email, senha});
      if (user) {
        console.log("✅ Usuário autenticado:");
        // aqui você pode armazenar o user no estado global/contexto
      } else {
        console.log("❌ Credenciais inválidas", `%${email}`);
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

        {/* <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth/signUp")}>
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>  */}
      </View>
    </SafeAreaView>
  );
}


