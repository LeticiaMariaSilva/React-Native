import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { api } from "../services/api";
import estilos from "./Estilos";

export default function MoedaItem({ navigation, item }) {
  return (
    <View style={estilos.linha}>
      <View style={estilos.primeiralinha}>
        <Text style={estilos.simbolo}>{item.simbolo}</Text>
        <Menu
          anchor={
            <IconButton
              icon={"arrow-right-circle-outline"}
              onPress={() => navigation.navigate("ObterCotacao", {item:  item})}
            />
          }
        >
          <Menu.Item></Menu.Item>
        </Menu>
      </View>
      <Text style={estilos.nomeFormatado}>{item.nomeFormatado}</Text>
    </View>
  );
}
