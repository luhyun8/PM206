//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, Pressable} from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function ModalScreen() {
const [modalVisible, setIsModalVisible] = useState(false);

return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Ejemplo de Modal</Text>
        <Button title="Abrir Modal" onPress={() => setIsModalVisible(true)} color="#4D96FF" />
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>

            <View style={styles.fondo}>
                <View style={styles.bottomSheet}>
                    <Text style={styles.texto}>Hola este es un Bottom Sheet</Text>
                    <Pressable
                        style={styles.boton}
                        onPress={() => setIsModalVisible(false)}>
                        <Text style={styles.textoBoton}>Cerrar</Text>
                    </Pressable>
                </View>  
            </View>
        </Modal>

    <StatusBar style="auto" />
    </View>
);
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b588f8',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fondo: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});