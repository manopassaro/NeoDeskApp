import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, Alert } from "react-native"; // Adicionei Alert
import { useRouter } from "expo-router";
import CustomInput from "../../assets/components/customInput";
import { globalStyles } from "../../assets/styles/globalStyles";
import { loginUsuario } from // add caminho API

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

  <SafeAreaView style={styles.container}> 
      <View style={styles.content}> 
        <Text style={styles.title}>Tela Inicial (Login)</Text>

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
       <TouchableOpacity style={globalStyles.button} onPress={handleLogin} >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth/signUp")} >
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "grey"
  },

  content: {
    marginHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070707ff',
    textAlign: 'center',
     marginBottom: 14, // Espaço abaixo do título
  },

  // Botão

  button: {
    backgroundColor: '#007bff', // Azul
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center', // Centraliza o texto
    marginTop: 16, // Espaço acima do botão
  }, 

  buttonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});
