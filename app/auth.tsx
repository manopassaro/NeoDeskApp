import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomInput from "../assets/components/customInput";
import { globalStyles } from "../assets/styles/globalStyles";


export default function Index() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");



  return (
    <SafeAreaView style={globalStyles.container}> 
      <View style={globalStyles.content}> 
        <Text style={globalStyles.title}>Tela Inicial (Login)</Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      

       <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/tabs/home")}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth/signUp")}>
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>  */}
      </View>
    </SafeAreaView>
  );
}


