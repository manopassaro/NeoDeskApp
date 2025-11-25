import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";


import { globalStyles } from "../../assets/styles/globalStyles";
import { useChamadoDatabase } from "../../services/chamadoDb";
import { Chamado } from "../../assets/components/chamado";

export default function ChamadoDetalhesScreen() {
    const router = useRouter();
    const ChamadoDatabase = useChamadoDatabase();

    const { id } = useLocalSearchParams(); // recupera o ID passado
    const [chamado, setChamado] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function fetchChamado() {
        try {
            const data = await ChamadoDatabase.getById(Number(id));
            setChamado({ ...data.statement, usuarioNome: data.usuarioNome });
            return (data.usuarioNome);
        } catch (error) {
            console.error("Erro ao buscar chamado:", error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(() => {
    fetchChamado();
  }, [id]);

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 12 }}>Carregando chamado...</Text>
      </View>
    );
  }

  if (!chamado) {
    return (
      <View style={globalStyles.container}>
        <Text>Chamado não encontrado.</Text>
      </View>
    );
  }

  // const { remove } = useChamadoDatabase();

async function excluirChamado() {
    try {
        const resultado = await ChamadoDatabase.remove(data.id);

        if (resultado.success) {
            alert("Chamado excluído com sucesso!");
        } else {
            alert("Erro: o chamado não foi excluído.");
        }
    } catch (err) {
        console.log("Erro ao excluir:", err);
    }
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
              style={{
                height: verticalScale(35),
                width: "60%",
              }}
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
          />
     
    
          {/* Espaço “falso” pra balancear o layout */}
          <View style={{ width: 32 }} /> 
      
          </View>

        <Chamado data={chamado} />
        

        </SafeAreaView>
        );
}
