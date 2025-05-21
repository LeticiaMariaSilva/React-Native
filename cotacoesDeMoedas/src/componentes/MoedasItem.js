import React, {useState} from "react";
import {View, Text, Alert} from "react-native";
import {IconButton, Menu} from "react-native-paper";
import {api} from "../services/api";
import estilos from "./Estilos";

export default function MoedaItem({ item}) {
    const [menuVisivel, setMenuVisivel] = useState(false);

    const openMenu = () => setMenuVisivel(true)
    const closeMenu = () => setMenuVisivel(false)

    
    return (
        <View style={estilos.linha}>
            <View style={estilos.primeiralinha}>
                
                    <Text style={estilos.simbolo}>{item.simbolo}</Text>
                

                <Menu 
                visible={menuVisivel}
                onDismiss={closeMenu}
                anchor={<IconButton icon={"arrow-right-circle-outline"} onPress={openMenu}/>}>
                </Menu>
            </View>
                <Text style={estilos.nomeFormatado}>{item.nomeFormatado}</Text>
            
        </View>
    )
}