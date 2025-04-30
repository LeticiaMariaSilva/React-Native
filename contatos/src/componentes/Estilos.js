import {Button, StyleSheet} from 'react-native';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    button: {
        backgroundColor: '#b3b3d8',
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonText2: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b3b3d8',
        marginBottom: 32,
        textAlign: 'center',
        marginTop: 100
    },
    linha: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#b3b3d8',
       
    },
    tituloInput:{
        marginBottom: 10,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#b3b3d8'
        
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 120,
        marginBottom: 10
    },
    inputSexo: {
        minWidth: 120,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    primeiralinha: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pesquisarInput: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
       
    },        
})

export default estilos;