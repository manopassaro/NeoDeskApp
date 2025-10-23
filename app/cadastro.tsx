import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../assets/components/customInput";
import { useUserDatabase } from "../services/userDb"; 
import { globalStyles } from "../assets/styles/globalStyles";

export default function CadastrarUsuario() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(0); // 0 = padrão, 1 = admin etc.
  const [isActive, setIsActive] = useState(1); // ativo por padrão

  async function createUser() {
    if (!nome || !email || !senha) {
      Alert.alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await UserDatabase.createUser({
        nome,
        email,
        senha,
        tipo_usuario: tipoUsuario,
        is_active: isActive,
      });

      Alert.alert("Usuário cadastrado com sucesso!", "ID: " + response.insertedId);
      // router.push("/login"); // se quiser redirecionar após cadastro
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao cadastrar usuário.");
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>

    <View style={globalStyles.content}>
      <CustomInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        // keyboardType="email-address"
      />
      <CustomInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        // style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
        secureTextEntry
      />

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Tipo de Usuário:</Text>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={tipoUsuario}
          onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        >
          <Picker.Item label="Usuário comum" value={0} />
          <Picker.Item label="Administrador" value={1} />
          <Picker.Item label="Técnico" value={2} />
        </Picker>
      </View>
    
      <TouchableOpacity style={globalStyles.button} onPress={() => router.push("/auth")}>
                    <Text style={globalStyles.buttonText}>Voltar</Text>
                </TouchableOpacity> 
      
      <TouchableOpacity style={globalStyles.button} onPress={createUser}>
                    <Text style={globalStyles.buttonText}>Cadastrar</Text>
                </TouchableOpacity> 
    </View>
    </SafeAreaView>
  );
}
