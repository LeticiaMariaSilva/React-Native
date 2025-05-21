import React, {useState, useEffect}  from "react";
import {View, Text, FlatList, Pressable} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import { TextInput } from "react-native-web";
import estilos from "../componentes/Estilos";
import {api} from "../services/api";
import MoedaItem from "../componentes/MoedasItem";

export default function MoedasLista(){
    const [moedas, setMoedas] = useState([])
    const isFocused = useIsFocused()

    const carregarMoedas = async () => {
        try {
            const response = await api.get("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json")
            setMoedas(response.data.value)
        } catch (erro) {
            console.error("Erro ao buscar as moedas", erro)
        }
    }

    useEffect(() => {
        if (isFocused) carregarMoedas()
    }, [isFocused])

    return (
        <View style={estilos.container}>
            <FlatList
                data={moedas}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <MoedaItem
                    item={item}
                />
                )}
            ></FlatList>
        </View>
    )
}