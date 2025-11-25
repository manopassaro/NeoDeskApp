import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export function UsuarioItem({ data, onDelete, onToggleActive }) {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.title}>
        {data.nome} ({data.email})
      </Text>

      <Text style={{ fontSize: 14, color: "#555" }}>
        Tipo: {["Funcionário", "Técnico", "Administrador"][data.tipo_usuario]}
      </Text>

      <Text style={{ fontSize: 14, marginBottom: 8 }}>
        Status: {data.is_active ? "Ativo" : "Inativo"}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: "red" }]}
          onPress={() => onDelete(data.id)}
        >
          <Text style={globalStyles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              backgroundColor: data.is_active ? "orange" : "green",
            },
          ]}
          onPress={() => onToggleActive(data.id, data.is_active)}
        >
          <Text style={globalStyles.buttonText}>
            {data.is_active ? "Desativar" : "Ativar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
