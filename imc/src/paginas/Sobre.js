import {Text, View } from 'react-native';
import styles from '../componentes/Styles';

const Sobre = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Essa é a página Sobre</Text>
      <Text style={styles.texto}>Esse é um texto padrão com letras pequenas</Text>
    </View>
  )
}

export default Sobre