import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

import { globalStyles } from "../../assets/styles/globalStyles";
import { Chamados } from "../../assets/components/chamado";
import { useChamadoDatabase, ChamadoDatabase } from "../../services/chamadoDb";

export default function Home() {
  const router = useRouter();
  const ProductDatabase = useChamadoDatabase();

  const [search, setSearch] = useState("");
  const [chamados, setChamados] = useState<ChamadoDatabase[]>([]);
  const [user, setUser] = useState<any>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [menuBarra, setMenuBarra] = useState(false);
  const [modalEquipe, setModalEquipe] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  function abrirGithub(url: string) {
    Linking.openURL(url);
  }

  // renderiza os chamados

  async function list() {
    try {
      const response = await ProductDatabase.getAll(search);
      setChamados(response);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    list();
  }, [search]);

  // renderiza o usuário do AsyncStorage

  async function carregarUsuario() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (!userString) return;

      const userData = JSON.parse(userString);
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  // atualiza dados após exclusão

  function handleDelete() {
    setRefreshKey((x) => x + 1);
  }

  useEffect(() => {
    list();
  }, [refreshKey]);

  // funções que abrirão os menus

  const abrirPerfil = () => {
    setMenuPerfil(true);
  };

  const abrirFuncionalidades = () => {
    setMenuBarra(true);
  };

  const abrirEquipe = () => {
    setModalEquipe(true);
    setMenuBarra(false);
  };

  // confirmação de logout

  const handleLogout = () => {
    // fecha o menu
    setMenuBarra(false);
    // mostra modal de confirmação
    setConfirmVisible(true);
  };

  const confirmLogout = async () => {
    try {
      setConfirmVisible(false);
      await AsyncStorage.removeItem("user");
      router.replace("../auth"); // volta pro login
    } catch {
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
          borderRadius: scale(2),
        }}
      >
        {/* LOGO DO APP */}
        <Image
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
      </View>

      {/* Lista de chamados */}
      <View style={globalStyles.container}>
        {!user ? (
          <Text>Carregando...</Text> // pode trocar por um spinner depois
        ) : (
          <FlatList
            data={[...chamados].sort((a, b) => b.id - a.id)}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Chamados data={item} user={user} onDelete={handleDelete} />
            )}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
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
        {/* Ícone esquerdo - Perfil */}
        <TouchableOpacity onPress={abrirPerfil}>
          <Ionicons
            name="person-circle-outline"
            size={scale(40)}
            color="#000022"
          />
        </TouchableOpacity>

        <Modal
          isVisible={menuPerfil}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          onBackdropPress={() => setMenuPerfil(false)}
          style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "85%",
              borderRadius: 20,
              padding: scale(20),
              backgroundColor: "#fff",
              elevation: 10,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}
          >
            {/* BOTÃO FECHAR */}
            <TouchableOpacity
              onPress={() => setMenuPerfil(false)}
              style={{ position: "absolute", top: 12, right: 12 }}
            >
              <Ionicons name="close" size={scale(22)} color="#333" />
            </TouchableOpacity>

            {/* ÍCONE DO PERFIL */}
            <View style={{ alignItems: "center", marginBottom: scale(15) }}>
              <Ionicons
                name="person-circle-outline"
                size={scale(80)}
                color="#444"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: scale(18),
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {user?.nome}
              </Text>
            </View>

            {/* LINHA DIVISÓRIA */}
            <View
              style={{
                height: 1,
                backgroundColor: "#e5e5e5",
                marginVertical: scale(10),
              }}
            />

            {/* EMAIL */}
            <View style={{ marginBottom: scale(15) }}>
              <Text style={{ color: "#666", fontSize: scale(12) }}>Email</Text>
              <Text
                style={{
                  fontSize: scale(15),
                  fontWeight: "500",
                  color: "#333",
                  marginTop: 2,
                }}
              >
                {user?.email}
              </Text>
            </View>

            {/* TIPO DE USUÁRIO */}
            <View style={{ marginBottom: scale(15) }}>
              <Text style={{ color: "#666", fontSize: scale(12) }}>Nível</Text>
              <View
                style={{
                  marginTop: 4,
                  alignSelf: "flex-start",
                  backgroundColor:
                    user?.tipo_usuario === 2
                      ? "#2563eb" // admin = azul
                      : user?.tipo_usuario === 1
                      ? "#16a34a" // funcionario = verde
                      : "#ca8a04", // cliente = amarelo
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {user?.tipo_usuario === 2
                    ? "Administrador"
                    : user?.tipo_usuario === 1
                    ? "Funcionário"
                    : "Cliente"}
                </Text>
              </View>
            </View>

            {/* LINHA DIVISÓRIA */}
            <View
              style={{
                height: 1,
                backgroundColor: "#e5e5e5",
                marginVertical: scale(10),
              }}
            />
          </View>
        </Modal>

        <TouchableOpacity
          style={globalStyles.create}
          onPress={() => router.push("/tabs/create")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Ícone direito - Funcionalidades */}
        <TouchableOpacity onPress={abrirFuncionalidades}>
          <Ionicons name="settings-outline" size={scale(35)} color="black" />
        </TouchableOpacity>

        <Modal
          isVisible={menuBarra}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          onBackdropPress={() => setMenuBarra(false)}
          style={{
            margin: 0,
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              width: scale(260),
              height: "100%",
              backgroundColor: "#fff",
              padding: scale(20),
              paddingTop: verticalScale(20),
            }}
          >
            {/* Ícone Fechar */}
            <View>
              <Ionicons
                onPress={() => setMenuBarra(false)}
                name="close"
                size={scale(30)}
                color="black"
                style={{ alignSelf: "flex-start" }}
              />
            </View>

            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#ddd",
                marginTop: verticalScale(15),
                marginBottom: verticalScale(20),
              }}
            />
            {/* Container principal */}
            <View style={{ marginTop: verticalScale(8) }}>
              {/* Botão Equipe Dev */}
              <TouchableOpacity
                onPress={abrirEquipe}
                style={{
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: "#4983ffff", // azul bonito
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Equipe Dev
                </Text>
              </TouchableOpacity>

              {/* Botão Logout */}
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: "#df4848ff",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>

            {/* Rodapé */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={{ color: "#999", marginBottom: 10 }}>
                Versão 1.0.0
              </Text>
            </View>
          </View>
        </Modal>

        {/* GITHUB */}

        <Modal
          isVisible={modalEquipe}
          onBackdropPress={() => setModalEquipe(false)}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: scale(8),
              padding: scale(17),
              width: "95%",
              alignSelf: "center",
            }}
          >
            {/* Título */}
            <Text
              style={{
                fontSize: scale(18),
                fontWeight: "bold",
                marginBottom: verticalScale(20),
                textAlign: "center",
              }}
            >
              Equipe de Desenvolvimento
            </Text>

            {/* Lista dinâmica */}
            {[
              {
                nome: "Luiz Miguel Lemes",
                git: "https://github.com/manopassaro",
              },
              {
                nome: "Pedro Henrique de Souza",
                git: "https://github.com/PedroRSouza0",
              },
              {
                nome: "Renan Nogueira Ribeiro",
                git: "https://github.com/renanrnk",
              },
              {
                nome: "Lucas Antônio Goulart",
                git: "https://github.com/LucasAntonioGS",
              },
              {
                nome: "Lívia Vieira Jacó",
                git: "https://github.com/JacoLCode",
              },
            ].map((item, index) => (
              <View key={index}>
                {/* Linha do integrante */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: verticalScale(12),
                    paddingHorizontal: scale(12),
                    backgroundColor: "#eeeeeeff",
                    borderRadius: scale(6),
                  }}
                >
                  <Text style={{ fontSize: scale(14), fontWeight: "500" }}>
                    {item.nome}
                  </Text>

                  {/* Botão GitHub */}
                  <TouchableOpacity
                    onPress={() => abrirGithub(item.git)}
                    style={{
                      backgroundColor: "#797979ff",
                      paddingVertical: verticalScale(6),
                      paddingHorizontal: scale(12),
                      borderRadius: scale(12),
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: scale(12),
                      }}
                    >
                      GitHub
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Divisor */}
                {index < 4 && (
                  <View
                    style={{
                      height: verticalScale(1),
                      backgroundColor: "#e5e7eb",
                      marginVertical: verticalScale(6),
                    }}
                  />
                )}
              </View>
            ))}
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
            <Text
              style={{
                fontSize: moderateScale(16),
                marginBottom: verticalScale(15),
              }}
            >
              Tem certeza que deseja sair do sistema?
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
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
      </View>
    </SafeAreaView>
  );
}
