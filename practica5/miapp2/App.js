//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';
import {Perfil} from './components/Perfil';


//Zona 2 Main - Hogar de los componentes
export default function App() {
  return (
    <View style={styles.container}>

      <Image source={require('./assets/wave.png')}/>

      <Text>-----------------Componente Simple-----------------------</Text>
      <Text>Hola Mundo RN!</Text>
      <Saludo/>

      <Text>-----------------Componente Compuesto-----------------------</Text>
      <Saludo2/>
      <Perfil/>

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
  },
});
