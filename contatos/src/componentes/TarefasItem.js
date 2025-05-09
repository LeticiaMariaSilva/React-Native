import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Menu } from "react-native-paper";
import { apiTarefas } from "../servicos/Api";
import estilos from "./Estilos";



export default function TarefasItem({ item }) {

    if (item.status == "novo") {
        estilos.status = estilos.textTarefasConcluida
    }

  return (
    <View style={estilos.linha}>
      <View style={estilos.primeiralinha}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nomeResponsavel}>{item.responsavel}</Text>
        </View>
      </View>

      <Text style={estilos.textTarefas}>
        <Text style={estilos.span}>Data:</Text> {item.data}
      </Text>
      <Text style={estilos.textTarefas}>
        <Text style={estilos.span}>Prazo: </Text>
        {item.prazo}
      </Text>
      <Text style={estilos.textTarefas}>
        <Text style={estilos.span}>Descrição:</Text> {item.descricao}
      </Text>
      <Text style={estilos.status}>
        <Text style={estilos.span}>Status:</Text> {item.status}
      </Text>
    </View>
  );
}
