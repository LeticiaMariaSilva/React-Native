import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { apiTarefas } from "../servicos/Api";
import estilos from "../componentes/Estilos";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const formatarData = (data) => {
  return data.toISOString().split("T")[0]; // Retorna apenas a parte da data (YYYY-MM-DD)
};

export default function TarefasForm({ navigation, route }) {
  const [data, setData] = useState(new Date());
  const [prazo, setPrazo] = useState(new Date());

  const [responsavel, setResponsavel] = useState("");
  const [idResponsavel, setIdResponsavel] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [contatos, setContatos] = useState([]); //Lista de contatos
  const [showPickerData, setShowPickerData] = useState(false);
  const [showPickerPrazo, setShowPickerPrazo] = useState(false);

  const itensTarefas = route.params?.item;

  useEffect(() => {
    console.log(itensTarefas);

    const carregarContatos = async () => {
      try {
        const response = await fetch("https://limeiraweb.com.br/api/contato");
        const data = await response.json();
        const contatoArray = Array.isArray(data) ? data : [data];
        setContatos(contatoArray);

        if (itensTarefas) {
          setResponsavel(itensTarefas.responsavel);
          setIdResponsavel(itensTarefas.idResponsavel || "");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar a lista de contatos");
        console.error(error);
      }
    };

    carregarContatos();

    if (itensTarefas) {
      setData(new Date(itensTarefas.data));
      setPrazo(new Date(itensTarefas.prazo));
      setResponsavel(itensTarefas.responsavel);
      setDescricao(itensTarefas.descricao);
      setStatus(itensTarefas.status);
    }
  }, [itensTarefas]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPickerData(false);
    setData(currentDate);
  };

  const onChangePrazo = (event, selectedDate) => {
    const currentDate = selectedDate || prazo;
    setShowPickerPrazo(false);
    setPrazo(currentDate);
  };

  const salvarTarefas = async () => {
    console.log({
      data,
      prazo,
      idResponsavel,
      descricao,
      status,
    });
    if (!data || !prazo || !idResponsavel || !descricao || !status) {
      Alert.alert("ATENÇÃO: Preencha todos os campos!");
      console.log("ATENÇÃO: Preencha todos os campos!");
      return;
    }
    try {
      if (itensTarefas) {
        await apiTarefas.put(`/${itensTarefas.id}`, {
          data: formatarData(data),
          prazo: formatarData(prazo),
          responsavel: idResponsavel,
          descricao,
          status,
        });
      } else {
        // let dataString = data.toISOString().split('T')[0]
        // setData(dataString)

        await apiTarefas.post("/", {
          data: formatarData(data),
          prazo: formatarData(prazo),
          responsavel: idResponsavel,
          descricao,
          status,
        });
      }
      navigation.goBack();
    } catch (erro) {
      Alert.alert("Erro ao salvar a tarefa!");
    }
  };

  const handleChangeData = (event, selectedDate) => {
    setShowPickerData(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.tituloInput}>Preencha todos os campos abaixo:</Text>
      <View style={estilos.inputStatus}>
        <Picker
          selectedValue={idResponsavel}
          onValueChange={(itemValue) => setIdResponsavel(itemValue)}
          style={estilos.inputResponsavel}
        >
          <Picker.Item label="Selecione o responsável" value="" />
          {contatos.map((contatos) => (
            <Picker.Item
              key={contatos.id}
              label={`${contatos.nome} (${contatos.celular})`}
              value={contatos.id}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={estilos.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      ></TextInput>

      <View style={estilos.inputStatus}>
        <Picker
          style={{ placeholderTextColor: "#000000" }}
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Selecione o status" value="" />
          <Picker.Item label="Novo" value="Novo" />
          <Picker.Item label="Em andamento" value="Em andamento" />
          <Picker.Item label="Cancelada" value="Cancelada" />
          <Picker.Item label="Concluído" value="Concluído" />

        </Picker>
      </View>

      <Text>Data selecionado: {data.toLocaleDateString()}</Text>
      <Pressable style={estilos.button} onPress={() => setShowPickerData(true)}>
        <Text style={estilos.buttonText}>Selecionar data</Text>
      </Pressable>
      {showPickerData && (
        <DateTimePicker
          value={data}
          mode="date"
          display="calendar"
          onChange={handleChangeData}
        />
      )}

      <Text>Prazo selecionado: {prazo.toLocaleDateString()}</Text>
      <Pressable
        style={estilos.button}
        onPress={() => setShowPickerPrazo(true)}
      >
        <Text style={estilos.buttonText}>Selecionar prazo</Text>
      </Pressable>
      {showPickerPrazo && (
        <DateTimePicker
          value={prazo}
          mode="date"
          display="calendar"
          onChange={onChangePrazo}
        />
      )}

      <Pressable style={estilos.button} onPress={salvarTarefas}>
        <Text style={estilos.buttonText}>SALVAR</Text>
      </Pressable>
    </View>
  );
}
