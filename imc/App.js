import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import Home from "./src/paginas/Home"
import Sobre from "./src/paginas/Sobre"
import Historico from "./src/paginas/Historico"

// Criar o componente de abas
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
       <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size}) => {
            let icone
            if (route.name == "Inicio") icone = "home" 
            else if(route.name == "Sobre") icone = "information-circle"
            else if(route.name == "Historico") icone = "book"
            return <Ionicons name={icone} size={size} color={color} /> 
          },
        })}
        >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Sobre" component={Sobre} />
        <Tab.Screen name="Historico" component={Historico} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}


