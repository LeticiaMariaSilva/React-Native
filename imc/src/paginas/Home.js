import { Text, View, Pressable, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../componentes/Styles';
import { useState } from 'react';
import BotaoCalcular from '../componentes/BotaoCalcular';


// Chave de identificação do histórico.
const STORAGE_KEY = "@historico_imc"

const Home = () => {

  const [altura, setAltura] = useState("")
  const [peso, setPeso] = useState("")
  const [resultado, setResultado] = useState(null)
  const [classificacao, setClassificacao] = useState("")
  const [cor, setCor] = useState("")

  const salvarHistorico = async (novoRegistro) => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const historicoAtual = json ? JSON.parse(json) : [];
      const novoHistorico = [novoRegistro, ...historicoAtual];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novoHistorico));
    } catch (e) {
      console.error("Erro ao salvar histórico:", e);
    }
  };

  const calcular = () => {
    const a = parseFloat(altura.replace(",", "."))
    const p = parseFloat(peso.replace(",", "."))
    const resultadoIMC = (p / (a * a)).toFixed(2)
    

    let classificacaoAtual = ""
    let corAtual = ""
    if (resultadoIMC < 18.5) {
      setResultado("IMC: " + resultadoIMC); classificacaoAtual = "Abaixo do peso"; corAtual = "azul"
    }
    else if (resultadoIMC >= 18.5 && resultadoIMC <= 24.9) {
      setResultado("IMC: " + resultadoIMC); classificacaoAtual = "Peso normal"; corAtual = "verde"
    }
    else if (resultadoIMC >= 25 && resultadoIMC <= 29.9) {
      setResultado("IMC: " + resultadoIMC); classificacaoAtual = "Sobrepeso"; corAtual = "laranja"
    }
    else if (resultadoIMC >= 30 && resultado <= 34.9) {
      setResultado("IMC: " + resultadoIMC); classificacaoAtual = "Obesidade"; corAtual = "vermelho"
    }
    else { 
      setResultado("Valor inválido")
    }
      setClassificacao(classificacaoAtual)
      setCor(corAtual)

      const dataHora = new Date().toLocaleString()
      const novoRegistro = {
        imc: resultadoIMC,
        classificacao: classificacaoAtual,
        dataHora: dataHora,
      }
      salvarHistorico(novoRegistro)
      console.log(novoRegistro)
    
  } 



return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.titulo}>Cálculo de IMC</Text>

      <TextInput style={styles.input} keyboardType='numeric' placeholder='Digite a sua altura' value={altura} onChangeText={setAltura} />

      <TextInput style={styles.input} keyboardType='numeric' placeholder='Digite o seu peso' value={peso} onChangeText={setPeso} />

      {/* <Pressable style={styles.botaoContainer} onPress={() => calcular()}>
          <Text style={styles.botaoText}>Calcular</Text>
        </Pressable> */}

      <BotaoCalcular funcao={calcular} />

      <Text style={styles.resultado}>
        {resultado}
      </Text>
      {classificacao && <Text style={styles[cor]}>Classificação: {classificacao}</Text>}
    </View>

  </TouchableWithoutFeedback>
)
}

export default Home

