import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import MoedasLista from './src/paginas/MoedasLista';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MoedasLista">
          <Stack.Screen name="MoedasLista" component={MoedasLista} options={{ title: 'Lista de Moedas' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
