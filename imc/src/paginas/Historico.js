import {Text, View } from 'react-native';
import styles from '../componentes/Styles';
import { ScrollView } from 'react-native-gesture-handler';

const Historico = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.titulo}>Histórico de IMC</Text>
    <View>
      <Text>IMC: XXX</Text>
      <Text>Classificação: XXX</Text>
      <Text>Data/hora: XXX</Text>
    </View>
    </ScrollView>
  )
}

export default Historico