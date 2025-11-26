import { View, ScrollView, ScrollViewProps, Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import { globalStyles } from "../../assets/styles/globalStyles";
import { useChamadoDatabase } from "../../services/chamadoDb"

type PropsP = PressableProps & {
    data:{
        id: number
        titulo: string
        descricao: string
        status: string
        usuario_id: number
        // usuario_tipo: string
    }
}

type PropsS = ScrollViewProps & {
  data: {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    prioridade?: number;
    usuario_id?: number | null;
    usuario_tipo?: string;
    usuarioNome?: string | null;
  };
  user: {
    id: number;
    tipo_usuario: number;
    nome: string;
  };
  onDelete?: () => void;
};



export function Chamados({ data, user, ...rest }: PropsS) {
  const router = useRouter();

  // console.log(user);
  // filtro para funcionários (tipo_usuario = 0)
  const ehFuncionario = user.tipo_usuario === 0;

  if (ehFuncionario && data.usuario_id !== user.id) {
    return null; // esconde chamados que não pertencem ao funcionário
  }

  const prioridadeCor =
    data.prioridade === 3 ? "#dc2626"
    : data.prioridade === 2 ? "#facc15"
    : "#22c55e";

  function handlePress() {
    router.push({
      pathname: "/tabs/chamadoDetalhes",
      params: { id: data.id },
    });
  }

  return (
    <Pressable
      {...rest}
      onPress={handlePress}
      style={({ pressed }) => [
        globalStyles.containerChamado,
        pressed && globalStyles.pressed
      ]}
    >
      <View style={globalStyles.card}>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={globalStyles.titleChamado} numberOfLines={1}>
            {data.titulo}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text
            style={[
              globalStyles.status,
              data.status === "aberto"
                ? globalStyles.statusAberto
                : globalStyles.statusFechado,
            ]}
          >
            {data.status.toUpperCase()}
          </Text>

          <Text style={{ fontSize: 14, color: "#374151" }}>
            {data.prioridade} Prioridade
          </Text>
        </View>

      </View>
    </Pressable>
  );
}

export function Chamado({data, ...rest}: PropsS){
  const router = useRouter();
  const params = useLocalSearchParams();
  const ChamadoDatabase = useChamadoDatabase();

    function InfoRow({
  icon,
  label,
  value,
  valueColor = "#333",
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
      }}
    >
      <Ionicons name={icon} size={20} color="#686868" style={{ marginRight: scale(10) }} />
      <Text style={{ fontSize: 15, color: "#555", flex: 1 }}>{label}:</Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: valueColor,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
    // console.log(data.usuarioNome)

    async function excluirChamado() {
    try {
        const resultado = await ChamadoDatabase.remove(data.id);

        if (resultado.success) {
            // alert("Chamado excluído com sucesso!");
            router.back();
            if (rest.onDelete) rest.onDelete();
        } else {
            alert("Erro: o chamado não foi excluído.");
        }
    } catch (err) {
        console.log("Erro ao excluir:", err);
    }
}

    return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        padding: scale(20),
        paddingBottom: verticalScale(40),
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Título */}
      <Text
        style={{
          fontSize: scale(22),
          fontWeight: "700",
          color: "#222",
          marginBottom: verticalScale(12),
        }}
      >
        {data.titulo}
      </Text>

      {/* Cartão de Informações Gerais */}
      <View
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: scale(12),
          padding: scale(16),
          marginBottom: verticalScale(20),
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <InfoRow
          icon="person-outline"
          label="Usuário"
          value={data.usuarioNome ?? "Não atribuído"}
        />
        <InfoRow icon="flag-outline" label="Prioridade" value={String(data.prioridade ?? "Baixa")} />
        <InfoRow
          icon="information-circle-outline"
          label="Status"
          value={data.status.toUpperCase()}
          valueColor={data.status === "ABERTO" ? "#2e7d32" : "#d32f2f"}
        />
        <TouchableOpacity 
                  onPress={excluirChamado}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: "#ef4444",
                    marginTop: 10,
                   }}
                >
                  <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                    Excluir
                  </Text>
                </TouchableOpacity>
      </View>


      {/* Descrição */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: scale(12),
          padding: scale(16),
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
        <Text
          style={{
            fontSize: scale(14),
            fontWeight: "600",
            color: "#333",
            marginBottom: verticalScale(8),
          }}
        >
          Descrição do Chamado
        </Text>
        <Text
          style={{
            fontSize: scale(14),
            color: "#555",
            lineHeight: 22,
            textAlign: "justify",
          }}
        >
          {data.descricao}
        </Text>
        
      </View>
    </ScrollView>
  );
}