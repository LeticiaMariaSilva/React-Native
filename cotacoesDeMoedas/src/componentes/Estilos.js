import {StyleSheet} from 'react-native';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    linha: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },
    primeiralinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    simbolo: {
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#b3b3d8',
    },
    nomeFormatado: {
        fontSize: 16,
    }
})

export default estilos;