import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import estilos from "./Estilos";

const FiltroStatus = ({ onFiltrar, statusSelecionado }) => {
  return (
    <View>
      <Picker
        style={estilos.inputStatus}
        selectedValue={statusSelecionado}
        onValueChange={(itemValue) => onFiltrar(itemValue)}
      >
        <Picker.Item label="Todos" value="" />
        <Picker.Item label="Novo" value="Novo" />
        <Picker.Item label="Em andamento" value="Em andamento" />
        <Picker.Item label="Cancelada" value="Cancelada" />
        <Picker.Item label="Concluída" value="Concluída" />
      </Picker>
    </View>
  );
};

export default FiltroStatus;
