//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {Perfil} from '../components/Perfil';


//Zona 2 Main - Hogar de los componentes
export default function CardsScreen() {
return (
    <View style={styles.container}>

    <Perfil nombre="Guadalupe Rivera" 
    carrera="Ingeniería en Sistemas Computacionales" 
    materia="Programación Móvil" cuatrimestre="9no" style={styles.tarjetaMorada}/>

    <Perfil nombre="Jeon Jungkook" 
    carrera="Artes Visuales" 
    materia="Danza" 
    cuatrimestre="9no" style={styles.tarjetaAzul}/>

    <Perfil nombre="Hwang Hyunjin" 
    carrera="Artes Visuales" 
    materia="Danza" 
    cuatrimestre="9no" style={styles.tarjetaAzul}/>

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

tarjetaMorada: {backgroundColor: 'purple'},
tarjetaAzul: {backgroundColor: '#4B0082'},

});