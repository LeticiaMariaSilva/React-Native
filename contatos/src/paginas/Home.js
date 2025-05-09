import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import estilos from "../componentes/Estilos";
import * as Location from "expo-location";

export default function Home({ navigation }) {
  const [localizacao, setLocalizacao] = useState(null);
  const [erro, setErro] = useState(null);

  async function detectarLocalizacao() {
    try {
      // Pedir permissão do usuário para rastrear a localização
      let { status } = await Location.requestForegroundPermissionsAsync({});

      if (status != "granted") {
        setErro("Permissão negada para acessar a localização");
        return;
      }

      // Havendo permissão, obter as coordenadas
      let localizacaoAtual = await Location.getCurrentPositionAsync({});

      // Obter o endereço
      let endereco = await Location.reverseGeocodeAsync({
        latitude: localizacaoAtual.coords.latitude,
        longitude: localizacaoAtual.coords.longitude,
      });

      if (endereco.length > 0) {
        // console.log(endereco)
        let local = endereco[0];
        setLocalizacao(
          `${local.street}, Nº${local.streetNumber}, ${local.district}, ${local.subregion}/${local.region}`
        );
      }
    } catch (e) {
      setErro("Erro ao detectar a localização");
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Bem vindo ao App de Contatos!</Text>

      <Button
        mode="contained"
        style={estilos.button}
        onPress={() => navigation.navigate("Listagem")}
      >
        <Text style={estilos.buttonText2}>Lista de Contatos</Text>
      </Button>

      <Button mode="contained" style={estilos.button} onPress={() => navigation.navigate("ListagemTarefas")}>
        <Text style={estilos.buttonText2}>Lista de Tarefas</Text>
      </Button>

      <Button
        mode="contained"
        style={estilos.button}
        onPress={detectarLocalizacao}
      >
        <Text style={estilos.buttonText2}>Detectar Localização</Text>
      </Button>
      {localizacao && (
        <Text style={estilos.localizacao}>
          Você está em: {localizacao}
        </Text>
      )}
    </View>
  );
}
