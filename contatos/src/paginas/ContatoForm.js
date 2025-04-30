import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Alert,
  Pressable,
} from "react-native";
import api from "../servicos/Api";
import estilos from "../componentes/Estilos";
import { Picker } from "@react-native-picker/picker";

export default function ContatoForm({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const itensContato = route.params?.item;

  useEffect(() => {
    if (itensContato) {
      setNome(itensContato.nome);
      setCelular(itensContato.celular);
      setEmail(itensContato.email);
      setSexo(itensContato.sexo);
      setIdade(itensContato.idade);
    }
  }, [itensContato]);

  const salvarContato = async () => {
    const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!nome || !celular || !email || !sexo || !idade) {
      Alert.alert("ATENÇÃO: Preencha todos os campos!");
      console.log("ATENÇÃO: Preencha todos os campos!");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("ATENÇÃO: E-mail inválido!");
      console.log("ATENÇÃO: E-mail inválido!");
      return;
    }

    // Chamar a API para gravar os dados
    try {
      if (itensContato) {
        // É edição
        await api.put(`/${itensContato.id}`, {
          nome,
          celular,
          email,
          sexo,
          idade,
        });
      } else {
        // Novo
        await api.post("/", { nome, celular, email, sexo, idade });
      }
      navigation.goBack(); // Devolver o usuário para a lista de contatos.
    } catch (erro) {
      Alert.alert("Erro ao chamar a API".erro);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.tituloInput}>Preencha todos os campos abaixo:</Text>
      <TextInput
        style={estilos.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      ></TextInput>
      <TextInput
        style={estilos.input}
        placeholder="Celular"
        value={celular}
        onChangeText={setCelular}
      ></TextInput>
      <TextInput
        style={estilos.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      ></TextInput>

      <View style={estilos.inputSexo}>
        <Picker
          style={{ placeholderTextColor: "#000000" }}
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Masculino" value="M" />
          <Picker.Item label="Feminino" value="F" />
        </Picker>
      </View>

      <TextInput
        style={estilos.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      ></TextInput>

      <Pressable style={estilos.button} onPress={salvarContato}>
        <Text style={estilos.buttonText}>SALVAR</Text>
      </Pressable>
    </View>
  );
}
