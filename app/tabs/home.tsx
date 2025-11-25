import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { globalStyles } from "../../assets/styles/globalStyles";
import { Chamados } from "../../assets/components/chamado";
import { useChamadoDatabase, ChamadoDatabase } from "../../services/chamadoDb";


export default function Home() {
  const router = useRouter();
  const ProductDatabase = useChamadoDatabase();

  const [search, setSearch] = useState("");
  const [chamados, setChamados] = useState<ChamadoDatabase[]>([]);
  const [user, setUser] = useState<any>(null); // estado para guardar o usuário
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [menuBarra, setMenuBarra] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  function handleDelete() {
    setRefreshKey(x => x + 1);
  }

  useEffect(() => {
    list();
  }, [refreshKey]);

   // renderiza o usuário do AsyncStorage

  async function carregarUsuario() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const userData = JSON.parse(userString);
        setUser(userData);
        console.log("Usuário carregado:", user);
      } else {
        // console.log("Nenhum usuário encontrado no cache");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  }


  // renderiza os chamados
  
  async function list(){
    try {
      const response = await ProductDatabase.getAll(search);
      setChamados(response);
    } catch (error) {
      throw(error)
    } 
  }


  // executa todos os dados

  useEffect(()=>{
    async function carregarUsuario() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (!userString) {
        console.log("Nenhum usuário encontrado no cache");
        return;
      }

      const userData = JSON.parse(userString);
      console.log("Usuário carregado:", userData);
      setUser(userData);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  };
    carregarUsuario();
    list();
  },[search])
  


  // funções que abrirão os menus
  const abrirPerfil = () => {
    setMenuPerfil(true);
    console.log("Abrindo informações do perfil...");
  };

  const abrirFuncionalidades = () => {
    setMenuBarra(true);
    console.log("Abrindo lista de funcionalidades...");
  };

 


  // confirmação de logout

  const handleLogout = () => {
    // Fecha o menu
    setMenuPerfil(false);
    // Mostra modal de confirmação
    setConfirmVisible(true);
  };

  const confirmLogout = async () => {
    try{

      setConfirmVisible(false);
      await AsyncStorage.removeItem("user");
      router.replace("../auth"); // volta pro login
    }catch{
      console.log("Erro ao fazer logout:", error);
    }
  };


  useFocusEffect(
  useCallback(() => {
    list();
  }, [router])
);

  // front-end

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
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
        {/* Ícone esquerdo - Perfil */}
        <TouchableOpacity onPress={abrirPerfil}>
          <Ionicons name="person-circle-outline" size={scale(45)} color="black" />
        </TouchableOpacity>

        <Modal
        isVisible={menuPerfil}
        animationIn="slideInLeft"   // desliza da esquerda
        animationOut="slideOutLeft" // fecha deslizando para a esquerda
        onBackdropPress={() => setMenuPerfil(false)} // fecha ao tocar fora
        style={{ margin: 0, justifyContent: "flex-start", alignItems: "flex-start" }}
      >
        <View
          style={{
            width: scale(250),
            height: "100%",
            backgroundColor: "#fff",
            padding: scale(20),
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Ionicons
        onPress={() => setMenuPerfil(false)}
        name="person-circle-outline"
        size={scale(45)}
        color="black"
      />
    </View>
          <Text>NOME</Text>
          <Text>EMAIL</Text>
          <Text>NÍVEL</Text>
        </View>
      </Modal>


        {/* LOGO DO APP */}
        <Image
        style={{ alignItems: "center", 
          justifyContent: "center", 
          flex: 1
         }}
        source={require("../../assets/images/logo.png")}
        resizeMode="contain"
      />


        {/* Ícone direito - Funcionalidades */}
        <TouchableOpacity onPress={abrirFuncionalidades}>
          <Ionicons name="menu-outline" size={scale(40)} color="black" />
        </TouchableOpacity>
      </View>

         <Modal
        isVisible={menuBarra}
        animationIn="slideInRight"   // desliza da direita
        animationOut="slideOutRight" // fecha deslizando pra direita
        onBackdropPress={() => setMenuBarra(false)} // fecha ao tocar fora
        style={{ margin: 0, justifyContent: "flex-start", alignItems: "flex-end" }}
      >
        <View
          style={{
            width: scale(250),
            height: "100%",
            backgroundColor: "#fff",
            padding: scale(20),
          }}
        >
          <Ionicons 
            onPress={() => setMenuBarra(false)}
            name="menu-outline" 
            size={scale(40)} 
            color="black" />
          <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: verticalScale(30),
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(15),
            backgroundColor: "#DC2626",
            borderRadius: scale(8),
          }}
        >
          <Text style={{ color: "#fff", fontSize: moderateScale(16), fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>
        </View>
      </Modal>

      {/* Confirmação de Logout */}

      <Modal
        isVisible={confirmVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => setConfirmVisible(false)}
        backdropOpacity={0.5}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: scale(20),
            borderRadius: scale(15),
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: moderateScale(16), marginBottom: verticalScale(15) }}>
            Tem certeza que deseja sair do sistema?
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <TouchableOpacity
              onPress={() => setConfirmVisible(false)}
              style={{
                flex: 1,
                marginRight: scale(10),
                paddingVertical: verticalScale(10),
                backgroundColor: "#ccc",
                borderRadius: scale(10),
                alignItems: "center",
              }}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={confirmLogout}
              style={{
                flex: 1,
                marginLeft: scale(10),
                paddingVertical: verticalScale(10),
                backgroundColor: "#DC2626",
                borderRadius: scale(10),
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      {/* Lista de chamados */}
      <View style={globalStyles.container}>

      <FlatList
        data={chamados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item})=><Chamados
         data={item}
         onDelete={handleDelete}/>}
        contentContainerStyle={{ flexGrow: 1 }}
        />

      </View>


      {/* Barra inferior */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: verticalScale(10),
          borderTopWidth: scale(1),
          borderColor: "#ddd",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={scale(26)} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.create} onPress={() => router.push("/tabs/create")} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/configuracoes")}>
          <Ionicons name="settings-outline" size={scale(26)} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
