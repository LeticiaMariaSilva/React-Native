import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import { apiTarefas } from "../servicos/Api";
import estilos from "./Estilos";



export default function TarefasItem({ item, onDelete, onEdit }) {
  const [menuVisivel, setMenuVisivel] = useState(false)
    
  const openMenu = () => setMenuVisivel(true)
  const closeMenu = () => setMenuVisivel(false)

  const confirmarExclusao = () => {
    closeMenu();
    Alert.alert(`Confirmar Exclusão`, `Deseja realmente excluir essa tarefa?`,
      [
        { text: "Cancelar", style: "cancel"},
        { text: "Excluir", style: "destructive", onPress: excluirTarefa}
      ]
    )
  }

  const excluirTarefa = async () => {
    try {
      await apiTarefas.delete(`/${item.id}`)
      onDelete()
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro)
    }
  }

  return (
    <View style={estilos.linha}>
      <View style={estilos.primeiralinha}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nomeResponsavel}>{item.responsavel}</Text>
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
      <Text style={estilos.textTarefas}>
        <Text style={estilos.span}>Status:</Text> {item.status}
      </Text>
    </View>
  );
}
