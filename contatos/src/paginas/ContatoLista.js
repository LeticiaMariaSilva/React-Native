import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {api} from "../servicos/Api";
import estilos from "../componentes/Estilos";
import ContatoItem from "../componentes/ContatoItem";
import { TextInput } from "react-native-paper";

export default function ContatoLista({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState("");
  const isFocused = useIsFocused();

  const carregarContatos = async () => {
    try {
      const resposta = await api.get("/");
      setContatos(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar os contatos:", erro);
    }
  };

  const contatosFiltrados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    if (isFocused) carregarContatos();
  }, [isFocused]);

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.pesquisarInput}
        placeholder="Buscar Contato..."
        value={busca}
        onChangeText={setBusca}
      ></TextInput>

      <Pressable
        style={estilos.button}
        onPress={() => navigation.navigate("Formulário")}
      >
        <Text style={estilos.buttonText}>NOVO CONTATO</Text>
      </Pressable>
      <FlatList
        data={contatosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContatoItem
            item={item}
            onEdit={() => navigation.navigate("Formulário", { item: item })}
            onDelete={carregarContatos}
          />
        )}
      ></FlatList>
    </View>
  );
}
