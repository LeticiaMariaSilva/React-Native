import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { apiTarefas } from "../servicos/Api";
import estilos from "../componentes/Estilos";
import TarefasItem from "../componentes/TarefasItem";
import { TextInput } from "react-native-paper";
import FiltroStatus from "../componentes/FiltroStatus";

export default function ListaTarefas({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState([]);
  const isFocused = useIsFocused();

  const carregarTarefas = async () => {
    try {
      const resposta = await apiTarefas.get("/");
      setTarefas(resposta.data);
      setTarefasFiltradas(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar as tarefas:", erro);
    }
  };

  useEffect(() => {
    if (isFocused){
      carregarTarefas()
      filtrarPorStatus("", tarefas)
    } 
  }, [isFocused]);

  const filtrarPorStatus = (status, dados = tarefas) => {
    setStatusSelecionado(status); // Modificar o status selecionado de acordo com a opção do usuário

    if (!status) { // Se o status não foi selecionado
      setTarefasFiltradas(dados); // Mostra todas as tarefas e não filtra nada
    } else {
      const filtradas = dados.filter(
        (tarefas) => tarefas.status.toLowerCase() == status.toLowerCase() // Compara em caixa baixa
      ); 
      setTarefasFiltradas(filtradas); // Modifica a lista de tarefas filtradas
    }
  };

  return (
    <View style={estilos.container}>

      <FiltroStatus onFiltrar={filtrarPorStatus} statusSelecionado={statusSelecionado}></FiltroStatus>

      <Pressable
        style={estilos.button}
        onPress={() => navigation.navigate("FormulárioTarefas")}
      >
        <Text style={estilos.buttonText}>NOVA TAREFA</Text>
      </Pressable>
      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TarefasItem
            item={item}
            onEdit={() =>
              navigation.navigate("FormulárioTarefas", { item: item })
            }
            onDelete={carregarTarefas}
          />
        )}
      ></FlatList>
    </View>
  );
}
