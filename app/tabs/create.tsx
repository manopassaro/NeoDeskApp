import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import { useChamadoDatabase } from "../../services/chamadoDb";
import { globalStyles } from "../../assets/styles/globalStyles";


export default function Create() {
  const router = useRouter();
  const ChamadoDatabase = useChamadoDatabase();

//   const [chamados, setChamados] = useState([]);

  const [id, setId] = useState(''); 
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');

    async function create() {
       const response = await ChamadoDatabase.create({titulo, descricao, status})
       Alert.alert("Chamado cadastrado: " + response.insertedRowId)
    }



  

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            paddingHorizontal: scale(16),
            paddingVertical: verticalScale(10),
            borderBottomWidth: scale(1),
            borderColor: "#cacacaff",
            borderRadius: scale(2)
          }}
    >
  {/* Botão de Voltar */}
  <TouchableOpacity style={globalStyles.back} onPress={() => router.back()}>
    <Ionicons name="arrow-back" size={24} color="#686868ff" />
  </TouchableOpacity>

  {/* Container central pra alinhar a logo */}

    <Image
      // style={{
      //   height: verticalScale(35),
      //   width: "60%",
      // }}
      source={require("../../assets/images/logo.png")}
      resizeMode="contain"
    />
 

  {/* Espaço “falso” pra balancear o layout */}
  <View style={{ width: 32 }} /> 
  
</View>


    <View style={{ flex: 1, padding: 20, backgroundColor: '#f2f2f2' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Criar Chamado</Text>


      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          height: 80,
        }}
      />

      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        multiline
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          height: 80,
        }}
      />

      <TouchableOpacity
        onPress={create}
        style={{
          backgroundColor: '#4CAF50',
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Criar Chamado</Text>
      </TouchableOpacity>

  
    </View>
    </SafeAreaView>
  );
}
