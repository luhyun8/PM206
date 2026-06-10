import {Button,Text,Image,View} from "react-native";

export const Saludo2 = () => {
    return(
        <View>

        <Text>Soy un Componente Propio</Text>
        <Button title="Hola 206"/>
        <Image source={require('../assets/wave.png')}/>



        </View>
    );
}