import { Button } from "react-native-paper";

const BotaoCalcular = ({funcao}) => (
    <Button icon="arrow-right-bold-circle"  mode="contained" onPress={funcao}>
        Calcular IMC
    </Button>
)

export default BotaoCalcular;