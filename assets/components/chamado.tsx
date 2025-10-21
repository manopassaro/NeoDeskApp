import { View, Pressable, PressableProps, Text } from "react-native";
import { globalStyles } from "../../assets/styles/globalStyles";

type Props = PressableProps & {
    data:{
        titulo: string
        descricao: string
        status: string
    }
}


export function Chamado({data, ...rest}: Props){
    // return (<Pressable{...rest}>
    //     <View style={globalStyles.card}>
    //     <Text>{data.titulo}</Text>
    //     <Text>{data.descricao}</Text>
    //     <Text>{data.status}</Text>
    //     <Text>merda</Text>
    //     </View>
    // </Pressable>
    // )
    return (
    <Pressable {...rest} style={({ pressed }) => [globalStyles.containerChamado, pressed && globalStyles.pressed]}>
      <View style={globalStyles.card}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.titleChamado} numberOfLines={1}>
            {data.titulo}
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