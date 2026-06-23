//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function ActivityIndicatorScreen() {
return (
    <View style={styles.container}>

        <Text>Aqui va la practica de Alan</Text>

    <StatusBar style="auto" />
    </View>
);
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
},
});