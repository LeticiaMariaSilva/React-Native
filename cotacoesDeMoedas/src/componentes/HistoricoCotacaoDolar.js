import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import estilos from "./Estilos";
import { format, set } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { TextInput } from "react-native-web";
import DateTimePicker from "@react-native-community/datetimepicker";

// Historico de Cotação do USD dos últimos 30 dias e exibir no obtercotacao.js usando a data inicial e data final selecionada pelo usuário.

export default function HistoricoDolar() {
  const [Historico, setHistorico] = React.useState([]);
  const isFocused = useIsFocused();
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [MostrarDataInicial, setMostrarDataInicial] = useState(false);
  const [MostrarDataFinal, setMostrarDataFinal] = useState(false);

  const carregarHistorico = async () => {
    try {
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='05-01-2023'&@dataFinalCotacao='05-05-2025'&$top=100&$format=json`
      );
      setHistorico(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      carregarHistorico();
    }
  }, [isFocused]);

  const onChangeDataInicial = (event, selectedDate) => {
    const currentDate = selectedDate || dataInicial;
    setMostrarDataInicial(false);
    setDataInicial(currentDate);
  };

  const onChangeDataFinal = (event, selectedDate) => {
    const currentDate = selectedDate || dataFinal;
    setMostrarDataFinal(false);
    setDataFinal(currentDate);
  };
 
return (
    <View>
      <Text style={estilos.text}>
        Data Inicial selecionada: {dataInicial.toLocaleDateString()}
      </Text>
      <Pressable
        style={estilos.botao}
        onPress={() => setMostrarDataInicial(true)}
      >
        <Text>Selecione Data Inicial</Text>
      </Pressable>
      {MostrarDataInicial && (
        <DateTimePicker
          value={dataInicial}
          mode="date"
          display="calendar"
          onChange={onChangeDataInicial}
        />
      )}
      <Text style={estilos.text}>
        Data Final selecionada: {dataFinal.toLocaleDateString()}
      </Text>
      <Pressable
        style={estilos.botao}
        onPress={() => setMostrarDataFinal(true)}
      >
        <Text>Selecione Data Final</Text>
      </Pressable>
      {MostrarDataFinal && (
        <DateTimePicker
          value={dataFinal}
          mode="date"
          display="calendar"
          onChange={onChangeDataFinal}
        />
      )}
      <FlatList
        data={Historico}
        keyExtractor={(item) => item.dataHoraCotacao}
        renderItem={({ item }) => (
          <View style={estilos.container}>
            <Text style={estilos.texto}>
              Data: {format(new Date(item.dataHoraCotacao), "dd/MM/yyyy")}
            </Text>
            <Text style={estilos.texto}>
              Hora: {format(new Date(item.dataHoraCotacao), "HH:mm:ss")}
            </Text>
            <Text style={estilos.texto}>
              Compra: {item.cotacaoCompra.toFixed(2)}
            </Text>
            <Text style={estilos.texto}>
              Venda: {item.cotacaoVenda.toFixed(2)}
            </Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
