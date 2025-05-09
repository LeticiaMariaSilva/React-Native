import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import {api} from "../servicos/Api";
import estilos from "./Estilos";

export default function ContatoItem({ item, onDelete, onEdit }) {
  const [menuVisivel, setMenuVisivel] = useState(false)

  const openMenu = () => setMenuVisivel(true)
  const closeMenu = () => setMenuVisivel(false)

  // Função para solicitar a exclusão do contato
  const confirmarExclusao = () => {
    closeMenu(); // Fechar o menu
    Alert.alert(
      `Confirmar Exclusão`,
      `Deseja realmente excluir este contato ${item.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: excluirContato },
      ]
    )
  }

  const excluirContato = async () => {
    try{
        await api.delete(`/${item.id}`)
        onDelete()
    } catch (erro) {
        console.error("Erro ao excluir contato:", erro)
    }
  }

  return (
    <View style={estilos.linha}>
      <View style={estilos.primeiralinha}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nome}>{item.nome}</Text>
        </View>

        <Menu
          visible={menuVisivel}
          onDismiss={closeMenu}
          anchor={<IconButton icon={"dots-vertical"} onPress={openMenu} />}
        >
          <Menu.Item title="Editar" onPress={() => {closeMenu(); onEdit() }} />
          <Menu.Item title="Excluir" onPress={confirmarExclusao} />
        </Menu>
      </View>

      <Text>{item.celular}</Text>
      <Text>{item.email}</Text>
      <Text>{item.sexo}</Text>
      <Text>{item.idade}</Text>
    </View>
  )
}
