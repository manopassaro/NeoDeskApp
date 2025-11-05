import { View, ScrollView, ScrollViewProps, Pressable, PressableProps, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import { globalStyles } from "../../assets/styles/globalStyles";

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
    usuario_tipo: string;
    usuarioNome?: string | null;
  };
};


export function Chamados({data, ...rest}: PropsS){
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData);
        }
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      }
    }

    carregarUsuario();
  }, []);


  // 🧠 Filtro: funcionário só vê seus próprios chamados
  const ehFuncionario = user.tipo_usuario === 0; // 0 = funcionário, 1 = técnico, 2 = admin (ajuste conforme seu sistema)

  if (ehFuncionario && data.usuario_id !== user.id) return null;

  const prioridadeCor =
    data.prioridade === 3
      ? "#dc2626" // vermelho (alta)
      : data.prioridade === 2
      ? "#facc15" // amarela (média)
      : "#22c55e"; // verde (baixa)
    
  function handlePress() {
    router.push({
      pathname: "/tabs/chamadoDetalhes",
      params: { id: data.id }, // enviando ID do chamado
    });
  }
    
    return (
    <Pressable {...rest}
    onPress={(handlePress)} 
    style={({ pressed }) => [
      globalStyles.containerChamado,
      pressed && globalStyles.pressed
      ]}>
      <View style={globalStyles.card}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.titleChamado} numberOfLines={1}>
            {data.titulo}
          </Text>


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
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Ionicons name="person-circle" size={18} color="#6b7280" />
          <Text style={{ fontSize: 14, color: "#374151", marginLeft: 4 }}>
            {data.usuarioNome || "Usuário"}
          </Text>

          <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="flag" size={16} color={prioridadeCor} />
            <Text style={{ fontSize: 14, color: prioridadeCor, marginLeft: 4 }}>
              Prioridade {data.prioridade ?? 1}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function Chamado({data, ...rest}: PropsS){
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
          valueColor={data.status === "aberto" ? "#2e7d32" : "#d32f2f"}
        />
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