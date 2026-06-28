//Zona 1 importaciones de componentes y archivos
import React, { useState } from 'react';
import {View,Text,TextInput,Switch,Pressable,Keyboard,Alert,ScrollView,StyleSheet,SafeAreaView,Platform,StatusBar} from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function RegistroScreen() {
    const [nombre, setNombre]     = useState('');
    const [carrera, setCarrera]   = useState('');
    const [semestre, setSemestre] = useState('');
    const [taller,    setTaller]    = useState(false);
    const [constancia, setConstancia] = useState(false);
    const [deportes,  setDeportes]  = useState(false);

const procesarRegistro = () => { 
    if (Platform.OS !== 'web') {Keyboard.dismiss();}
    if (!nombre || !carrera || !semestre) {
        Alert.alert("Validación", "Todos los campos son obligatorios");
        return;
    }
    if (isNaN(semestre)) {
        Alert.alert("Validación", "El semestre debe ser numérico");
        return;
    }
    Alert.alert(
      "Registro enviado",
      `Nombre: ${nombre}
      Carrera: ${carrera}
      Semestre: ${semestre}
      Asistirá al taller: ${taller ? "Sí" : "No"}
      Requiere constancia: ${constancia ? "Sí" : "No"}
      Participará en deportes: ${deportes ? "Sí" : "No"}`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#b588f8" />
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Evento Universitario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Carrera"
          placeholderTextColor="#aaa"
          value={carrera}
          onChangeText={setCarrera}
        />
        <TextInput
          style={styles.input}
          placeholder="Semestre"
          placeholderTextColor="#aaa"
          value={semestre}
          onChangeText={setSemestre}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Opciones</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Asistirá al taller?</Text>
          <Switch
            value={taller}
            onValueChange={setTaller}
            trackColor={{ false: '#ccc', true: '#1a73e8' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Requiere constancia?</Text>
          <Switch
            value={constancia}
            onValueChange={setConstancia}
            trackColor={{ false: '#ccc', true: '#1a73e8' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>¿Participará en deportes?</Text>
          <Switch
            value={deportes}
            onValueChange={setDeportes}
            trackColor={{ false: '#ccc', true: '#1a73e8' }}
            thumbColor="#fff"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.75 },]}
          onPress={procesarRegistro}
        >
          <Text style={styles.buttonText}>Enviar Registro</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

//Zona 3 Estilos - Personalización de los componentes
const PURPLE = '#9333ea';
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#b588f8',
    // IMPORTANTE: Esto empuja el contenido hacia abajo en Android si el SafeAreaView falla
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e9d5ff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#faf5ff',
    marginBottom: 16, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff', 
    marginTop: 20,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)', 
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff', 
    flex: 1,
    marginRight: 12,
  },
  button: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
 