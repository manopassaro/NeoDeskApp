import { View, Pressable, PressableProps, Text } from "react-native";
import { globalStyles } from "../../assets/styles/globalStyles";

type Props = PressableProps & {
    data:{
        titulo: string
        descricao: string
        status: string
        usuario_id: number
    }
}


export function Chamado({data, ...rest}: Props){
    
    return (
    <Pressable {...rest} style={({ pressed }) => [globalStyles.containerChamado, pressed && globalStyles.pressed]}>
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