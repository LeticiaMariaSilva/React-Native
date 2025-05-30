import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, Pressable } from "react-native";
import estilos from "../componentes/Estilos";
import { Picker, TextInput } from "react-native-web";
import MoedasLista from "./MoedasLista";
import { format, set } from "date-fns";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import HistoricoDolar from "../componentes/HistoricoCotacaoDolar";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function ObterCotacao({ navigation, route }) {
  const [cotacao, setCotacao] = useState([]);
  const [simbolo, setSimbolo] = useState("");
  const [nomeFormatado, setNomeFormatado] = useState("");
  const [cotacaoCompra, setCotacaoCompra] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [MostrarDataInicial, setMostrarDataInicial] = useState(false);
  const [MostrarDataFinal, setMostrarDataFinal] = useState(false);
  const isFocue = useIsFocused();

  const hoje = new Date();
  const dataAmericana = format(hoje, "MM-dd-yyyy");
  const dataBrasil = format(hoje, "dd/MM/yyyy");


  const itensContacao = route.params?.item;

  useEffect(() => {
    if (itensContacao) {
      setSimbolo(itensContacao.simbolo);
      setNomeFormatado(itensContacao.nomeFormatado);
      setCotacaoCompra(itensContacao.cotacaoCompra);
    }
  }, [itensContacao]);

  const carrregarCotacao = async () => {
    try {
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${simbolo}'&@dataCotacao='${dataAmericana}'&$top=100&$format=json`
      );
      setCotacao(response.data.value);
      setCotacaoCompra(response.data.value[0].cotacaoCompra.toFixed(2));
    } catch (error) {
      console.error("Erro ao obter cotação:", error);
    }
  }

  const carregarHistorico = async () => {
    try {
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dataInicial.toLocaleDateString()}'&@dataFinalCotacao='${dataFinal.toLocaleDateString()}''&$top=100&$format=json`
      );
      setHistorico(response.data.value);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   if (simbolo && isFocue) {
    carrregarCotacao();

   }
  }, [simbolo, isFocue]);

  // Selecionar a data inicial e final e aparecer historico de cotações
  useEffect(() => {
    if (dataInicial && dataFinal){
      carregarHistorico();
    }
  } , [dataInicial, dataFinal]);

  console.log(cotacao);

  // Calculo cambio
  const resultado = (1 / cotacaoCompra).toFixed(2);

  const onChangeDataInicial = (event, selectedDate) => {
    const currentDate = selectedDate || dataInicial
    setMostrarDataInicial(false);
    setDataInicial(currentDate);
  }

  const onChangeDataFinal = (event, selectedDate) => {
    const currentDate = selectedDate || dataFinal
    setMostrarDataFinal(false);
    setDataFinal(currentDate);
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.simbolo1}>Cotação De {simbolo}</Text>
      <Text>Data: {dataBrasil}</Text>
      <Text>
        Moeda: {simbolo} - {nomeFormatado}
      </Text>
      <View style={estilos.linha2}>
        <View style={estilos.coluna2}>
        <Text style={estilos.resultado}>1 {simbolo} = {cotacaoCompra}</Text>
        </View>
      </View>
      <View style={estilos.linha2}>
        <View style={estilos.coluna2}>
        <Text style={estilos.resultado}>R$ 1 = {resultado}</Text>
        </View>
      </View>
     
      
      <Text style={estilos.titulo}>Historico de Cotações</Text>
      <View style={estilos.linha2}>
        <View style={estilos.coluna2}>
        <FlatList 
            data={cotacao}
            keyExtractor={(item) => item.dataHoraCotacao}
            renderItem={({ item}) => (
              <HistoricoDolar />
            )}></FlatList>
        </View>
      </View>
    </View>
  );
}
