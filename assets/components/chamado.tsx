import { View, ScrollView, ScrollViewProps, Pressable, PressableProps, Text } from "react-native";
import { useRouter } from "expo-router";

import { globalStyles } from "../../assets/styles/globalStyles";

type PropsP = PressableProps & {
    data:{
        id: number
        titulo: string
        descricao: string
        status: string
        usuario_id: number
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
    usuarioNome?: string | null;
  };
};


export function Chamados({data, ...rest}: PropsP){
  const router = useRouter();
    
  function handlePress() {
    router.push({
      pathname: "/tabs/chamadoDetalhes",
      params: { id: data.id }, // enviando ID do chamado
    });
  }
    
    return (
    <Pressable {...rest}
    onPress={(handlePress)} 
    style={({ pressed }) => [globalStyles.containerChamado, pressed && globalStyles.pressed]}>
      <View style={globalStyles.card}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.titleChamado} numberOfLines={1}>
            {data.titulo}
          </Text>

          <Text style={globalStyles.titleChamado} numberOfLines={1}>
            {data.usuario_id}
          </Text>

          <Text
            style={[
              globalStyles.status,
              data.status === "aberto" ? globalStyles.statusAberto : globalStyles.statusFechado,
            ]}
          >
            {data.status.toUpperCase()}
          </Text>
        </View>

        <Text style={globalStyles.description} numberOfLines={2}>
          {data.descricao}
        </Text>
      </View>
    </Pressable>
  );
}

export function Chamado({data, ...rest}: PropsS){
    const router = useRouter();
 
    
    return (
    <ScrollView
      {...rest}
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Text style={globalStyles.titleChamado}>{data.titulo}</Text>

      <Text style={{ fontSize: 16, marginVertical: 8, color: "#555" }}>
        Status: <Text style={{ fontWeight: "bold" }}>{data.status}</Text>
      </Text>

      <Text style={{ fontSize: 16, marginVertical: 8, color: "#555" }}>
        Prioridade: <Text style={{ fontWeight: "bold" }}>{data.prioridade ?? 1}</Text>
      </Text>

      <Text style={{ fontSize: 16, marginVertical: 8, color: "#555" }}>
        Usuário: <Text style={{ fontWeight: "bold" }}>{data.usuarioNome}</Text>
      </Text>

      <Text style={{ fontSize: 16, marginTop: 12, color: "#333" }}>{data.descricao}</Text>
    </ScrollView>
  );
}