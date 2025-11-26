import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../assets/components/customInput";
import { useUserDatabase } from "../services/userDb";
import { globalStyles } from "../assets/styles/globalStyles";
import { UsuarioItem } from "../assets/components/user";

export default function CadastrarUsuario() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Tipo de Usuário"); // 0 = padrão, 1 = tecnico, 2 = admin
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

      Alert.alert(
        "Usuário cadastrado com sucesso!",
        "ID: " + response.insertedId
      );
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
          autoCapitalize="words"
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

        <Text style={{ marginTop: 13, fontWeight: "bold" }}>
          Tipo de Usuário:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 9,
            marginVertical: 8,
            backgroundColor: "#fff",
          }}
        >
          <Picker
            selectedValue={tipoUsuario}
            onValueChange={(itemValue) => setTipoUsuario(itemValue)}
            style={{
              height: 45,
              fontSize: 16,
              color: "#333",
            }}
            dropdownIconColor="#666" // funciona no Android
          >
            <Picker.Item label="Funcionário" value={0} />
            <Picker.Item label="Técnico" value={1} />
            <Picker.Item label="Administrador" value={2} />
          </Picker>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={createUser}>
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/auth")}
        >
          <Text style={globalStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 20 }}></ScrollView>
      </View>
    </SafeAreaView>
  );
}
