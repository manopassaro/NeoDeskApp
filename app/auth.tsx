import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";


import CustomInput from "../assets/components/customInput";
import { globalStyles } from "../assets/styles/globalStyles";
import { useUserDatabase } from "../services/userDb";


export default function Index() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();

  // const [user, setUser] = useState(null);
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

        await AsyncStorage.setItem("user", JSON.stringify(user));
        router.push("/tabs/home");

      }
    } catch (error: any) {
      setMensagem(error.message || "Erro inesperado ao fazer login");
      setMensagemTipo("erro");
    }
    
    }
  

  return (
    <SafeAreaView style={globalStyles.container}> 
        <View style={{ alignItems: "center", marginBottom: verticalScale(2)}}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{
            width: scale(90),
            height: verticalScale(100),
          }}
            resizeMode="contain"
          />
        </View>
        <View style={globalStyles.content}> 

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      

       <TouchableOpacity style={globalStyles.button} onPress={autenticar}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/tabs/home")}>
          <Text style={globalStyles.buttonText}>Passa Direto</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/editar")}>
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


