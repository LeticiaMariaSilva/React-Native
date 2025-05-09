import React, { useState, useEffect, use } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { apiTarefas } from "../servicos/Api";
import estilos from "../componentes/Estilos";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TarefasForm({ navigation, route }) {
  const [data, setData] = useState("");
  const [prazo, setPrazo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const itensTarefas = route.params?.item;

  useEffect(() => {
    if (itensTarefas) {
      setData(itensTarefas.data);
      setPrazo(itensTarefas.prazo);
      setResponsavel(itensTarefas.responsavel);
      setDescricao(itensTarefas.descricao);
      setStatus(itensTarefas.status);
    }
  }, [itensTarefas]);

  const salvarTarefas = async () => {
    if (!data || !prazo || !responsavel || !descricao || !status) {
      Alert.alert("ATENÇÃO: Preencha todos os campos!");
      console.log("ATENÇÃO: Preencha todos os campos!");
      return;
    }
    try {
      if (itensTarefas) {
        await apiTarefas.put(`/${itensTarefas.id}`, {
            data,
            prazo,
            responsavel,
            descricao,
            status,
          });
        } else {
            await apiTarefas.post("/", {
              data,
              prazo,
              responsavel,
              descricao,
              status,
            });
        }
        navigation.goBack();
    } catch (erro) {
        Alert.alert("Erro ao salvar a tarefa!");
    }
  
  }
  return (
    <View style={estilos.container}>
      <Text style={estilos.tituloInput}>Preencha todos os campos abaixo:</Text>
      <DateTimePicker value={data} mode="date" onChange={setData} />
      <DateTimePicker value={prazo} mode="date" onChange={setPrazo} display="calendar" />
      <TextInput
        style={estilos.input}
        placeholder="Responsável"
        value={responsavel}
        onChangeText={setResponsavel}
      ></TextInput>
      <TextInput
        style={estilos.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      ></TextInput>
      <TextInput
        style={estilos.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      ></TextInput>

      <Pressable style={estilos.button} onPress={salvarTarefas}>
        <Text style={estilos.buttonText}>SALVAR</Text>
      </Pressable>
    </View>
  );
}

