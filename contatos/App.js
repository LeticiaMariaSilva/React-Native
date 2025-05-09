import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ContatoLista from './src/paginas/ContatoLista';
import ContatoForm from './src/paginas/ContatoForm';
import ListaTarefas from './src/paginas/ListaTarefas';
import TarefasForm from './src/paginas/TarefasForm';
import Home from './src/paginas/Home';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator()

// Configuração global de telas
const opcoesTela = {
  headerStyle: { backgroundColor: '#b3b3d8' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
}

export default function App() {
  return (
    <PaperProvider>
      < StatusBar barStyle="ligth-content" backgroundColor="#b3b3d8" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={opcoesTela}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}  />
        <Stack.Screen name="Listagem" component={ContatoLista} options={{ title: 'Lista de Contatos' }}  />
        <Stack.Screen name="Formulário" component={ContatoForm} />
        <Stack.Screen name="FormulárioTarefas" component={TarefasForm} options={{ title: 'Formulário de Tarefas' }} />
        <Stack.Screen name="ListagemTarefas" component={ListaTarefas} options={{ title: 'Lista de Tarefas' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )
}
