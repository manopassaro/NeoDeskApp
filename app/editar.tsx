import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../assets/components/customInput";
import { useUserDatabase } from "../services/userDb";
import { globalStyles } from "../assets/styles/globalStyles";
import { UsuarioItem } from "../assets/components/user";

export default function editarUsuario() {
  const router = useRouter();
  const UserDatabase = useUserDatabase();

  const [usuarios, setUsuarios] = useState([]);

  async function carregarUsuarios() {
    const lista = await UserDatabase.getAllUsers();
    setUsuarios(lista);
  }

  async function handleDelete(id) {
    await UserDatabase.deleteUser(id);
    carregarUsuarios();
  }

  async function handleToggleActive(id, currentStatus) {
    await UserDatabase.updateUserStatus(id, currentStatus ? 0 : 1);
    carregarUsuarios();
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <ScrollView style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Usuários cadastrados:
          </Text>

          {usuarios.map((u) => (
            <UsuarioItem
              key={u.id}
              data={u}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/auth")}
        >
          <Text style={globalStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
