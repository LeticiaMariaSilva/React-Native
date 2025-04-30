// screens/HistoricoScreen.js
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../componentes/Styles";

const STORAGE_KEY = "@historico_imc";

const Historico = () => {
  const [historico, setHistorico] = useState([]);
 
  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
          const json = await AsyncStorage.getItem(STORAGE_KEY);
          if (json) {
            setHistorico(JSON.parse(json));
          }
      };
      carregar();
    }, [])
  );
  

  const limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setHistorico([]);
    } catch (e) {
      console.error("Erro ao limpar histórico:", e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      { historico.length > 0 ? (
        historico.map((item, index) => (
          <View key={index} style={{marginVertical: 10}}>
            <Text>IMC: {item.imc}</Text>
            <Text>Classificação: {item.classificacao}</Text>
            <Text>Data/Hora: {item.dataHora}</Text>
            
          </View>
        ))
      ) : (
        <Text>Nenhum dado no histórico.</Text>
      )}

      {
      // historico.length > 0 && (
        <Pressable
          style={[styles.botao, { backgroundColor: "red", marginTop: 10 }]}
          onPress={limparHistorico}
        >
          <Text style={[styles.botaoText, { color: "white" }]}>
            Limpar histórico
          </Text>
        </Pressable>
      // )
      }
    </ScrollView>
  );
};

export default Historico;
