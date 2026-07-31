import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL =
  Platform.OS === 'android'
    ? 'http://192.168.0.214:5000/v1/usuarios/'
    : 'http://localhost:5000/v1/usuarios/';

const AUTH_HEADER = 'Basic YWRtaW46MTIzNA==';

export default function ActualizarUsuarioScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [nombre, setNombre] = useState(params.nombre || '');
  const [edad, setEdad] = useState(String(params.edad || ''));
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacíos', 'Completa todos los campos.');
      return;
    }

    if (nombre.trim().length < 3) {
      mostrarMensaje('Error', 'El nombre debe tener al menos 3 caracteres.');
      return;
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 0 || edadNum > 120) {
      mostrarMensaje('Error', 'Ingresa una edad válida (entre 0 y 120 años).');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_HEADER,
        },
        body: JSON.stringify({ nombre: nombre.trim(), edad: edadNum }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      console.log('Usuario actualizado:', datos);
      mostrarMensaje('Éxito', 'Usuario actualizado correctamente.');

      router.push({
        pathname: '/detalle',
        params: { id: params.id, nombre: nombre.trim(), edad: edadNum },
      });
    } catch (error) {
      console.log('Error API al actualizar:', error);
      mostrarMensaje('Error', 'No fue posible actualizar el usuario.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Actualizar Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del usuario"
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
          placeholder="Edad del usuario"
        />

        <Pressable
          style={styles.boton}
          onPress={guardarCambios}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  boton: {
    backgroundColor: '#EAB308',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
