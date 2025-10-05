import { StyleSheet } from "react-native";

// cores NeoDesk
export const colors = {
    cinzaFundo: 'grey',
    azulBotoes: '#007bff',   
}

// estilos que poderão ser compartilhados

export const globalStyles = StyleSheet.create({

    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "grey"
  },

  content: {
    marginHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070707ff',
    textAlign: 'center',
     marginBottom: 14, // Espaço abaixo do título
  },

  // Botão

  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center', // Centraliza o texto
    marginTop: 16, // Espaço acima do botão
  }, 

  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
