import React, {useState, useEffect} from "react";
import {View, Text, FlatList, Pressable} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {api, apiTarefas} from "../servicos/Api";
import estilos from "../componentes/Estilos";
import TarefasItem from "../componentes/TarefasItem";
import { TextInput } from "react-native-paper";

export default function ListaTarefas( {navigation}){
    const [tarefas, setTarefas] = useState([])
    const isFocused = useIsFocused()

    const carregarTarefas = async () => {
        try {
            const resposta = await apiTarefas.get("/")
            setTarefas(resposta.data)
        } catch (erro) {
            console.error("Erro ao buscar as tarefas:", erro)
        }
    }

    useEffect(() => {
        if (isFocused) carregarTarefas()
    }, [isFocused])

    return (
        <View style={estilos.container}>

            <Pressable style={estilos.button} onPress={() => navigation.navigate("FormulárioTarefas")}>
                <Text style={estilos.buttonText}>NOVA TAREFA</Text>
            </Pressable>
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TarefasItem 
                    item={item}
                    />
                )}
            ></FlatList>
        </View>

        

    )

}