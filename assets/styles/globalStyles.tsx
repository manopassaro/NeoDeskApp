import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

// cores NeoDesk
export const colors = {
    cinzaFundo: 'grey',
    azulBotoes: '#007bff',   
}

// estilos que poderão ser compartilhados

export const globalStyles = StyleSheet.create({

  // View

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#f2f2f2",
    marginTop: scale(1),
  },

  content: {
    marginHorizontal: 24,
  },

  // Titulos

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070707ff',
    textAlign: 'center',
     marginBottom: 14, // Espaço abaixo do título
  },

  // Botão padrão

  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center', // Centraliza o texto
    marginTop: 16, // Espaço acima do botão
  },

  create: {
    backgroundColor: "#2563eb", // azul suave (combina com tons cinza)
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  
  back: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f3f4f6", // cinza bem claro para não ficar branco
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  }, 

  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Chamados

  containerChamado: {
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#f8f9fa", // cinza muito claro
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  card: {
    padding: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  titleChamado: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937", // cinza-escuro (quase preto)
    flex: 1,
    marginRight: 8,
  },

  description: {
    fontSize: 14,
    color: "#4b5563", // cinza médio
    lineHeight: 20,
  },

  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    textAlign: "center",
  },

  statusAberto: {
    backgroundColor: "#dbeafe", // azul claro
    color: "#1e3a8a", // azul escuro
  },

  statusFechado: {
    backgroundColor: "#e5e7eb", // cinza claro
    color: "#374151", // cinza médio
  },
});
