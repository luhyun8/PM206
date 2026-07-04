//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, Alert, Platform, Keyboard } from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function ModalBottomSheetScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const alertasManager = (titulo, mensaje) => {
    Alert.alert(titulo, mensaje, [{ text: 'OK' }]);
  };

  const handleRegistro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (nombre.trim() === '' || email.trim() === '') {
      alertasManager('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    setModalVisible(false);
    alertasManager('Registro exitoso', `¡Bienvenido ${nombre}!\n\nTus datos se registraron correctamente.`);
    setNombre('');
    setEmail('');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Modal & BottomSheet</Text>
      <Text style={estilos.subtitulo}>Ejemplos de modales en React Native</Text>

      <Pressable style={estilos.botonModal} onPress={() => setModalVisible(true)}>
        <Text style={estilos.textoBotonTitulo}>Abrir Modal</Text>
        <Text style={estilos.textoBotonSubtitulo}>Modal con formulario</Text>
      </Pressable>

      <Pressable style={estilos.botonBottomSheet} onPress={() => setBottomSheetVisible(true)}>
        <Text style={estilos.textoBotonTitulo}>Abrir Bottom Sheet</Text>
        <Text style={estilos.textoBotonSubtitulo}>Modal deslizable desde abajo</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={estilos.fondo}>
          <View style={estilos.caja}>
            <Text style={estilos.tituloCaja}>Registro</Text>

            <TextInput
              style={estilos.input}
              placeholder="Nombre completo"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={estilos.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Pressable style={estilos.boton} onPress={handleRegistro}>
              <Text style={estilos.textoBoton}>Registrar</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={estilos.textoCancelar}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}>
        <View style={estilos.fondo}>
          <View style={estilos.bottomSheet}>
            <Text style={estilos.texto}>Hola este es un Bottom Sheet</Text>
            <Pressable
              style={estilos.boton}
              onPress={() => setBottomSheetVisible(false)}>
              <Text style={estilos.textoBoton}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

//Zona 3 Estilos - Personalización de los componentes
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b588f8',
    paddingHorizontal: 25,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#cc3291',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 40,
  },
  botonModal: {
    backgroundColor: '#4D6FF5',
    width: '100%',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  botonBottomSheet: {
    backgroundColor: '#7B4DF5',
    width: '100%',
    padding: 18,
    borderRadius: 14,
  },
  textoBotonTitulo: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textoBotonSubtitulo: {
    color: '#e6e6e6',
    fontSize: 13,
  },
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  caja: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  tituloCaja: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoCancelar: {
    color: '#df6aba',
    marginTop: 5,
  },
});