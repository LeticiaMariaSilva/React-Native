import { StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'D8BFD8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    texto:{
        color: "#aaa"
    },
    input:{
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 18,
        backgroundColor: "white",
        padding: 10,
        marginBlock: 10,  
      shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    botaoContainer:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
    },
    botaoText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    resultado:{
      fontSize: 20,
      marginTop: 25,
      fontWeight: 'bold',
      
    },
    vermelho:{
        backgroundColor: "#FF0000",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
    },
    laranja:{
        backgroundColor: "#FF8C00",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
    },
    azul:{
        backgroundColor: "#00BFFF",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
    },
    verde:{
        backgroundColor: "#228B22",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
    },
  })

  export default styles
  