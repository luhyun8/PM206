import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { fetchApi } from '../constants/config';

const AUTH_HEADER = 'Basic YWRtaW46MTIzNA==';

export default function DetalleUsuarioScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    id: params.id,
    nombre: params.nombre || '',
    edad: params.edad || '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    if (params.id) {
      obtenerUsuario();
    }
  }, [params.id]);

  const obtenerUsuario = async () => {
    try {
      const respuesta = await fetchApi(`/${params.id}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setUsuario(datos);
      }
    } catch (error) {
      console.log('Error al obtener usuario:', error);
    }
  };

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const confirmarEliminacion = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetchApi(`/${usuario.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_HEADER,
        },
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
      }

      setModalVisible(false);
      mostrarMensaje('Éxito', 'Usuario eliminado correctamente.');
      router.replace('/(tabs)/consulta');
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
      mostrarMensaje('Error', 'No fue posible eliminar el usuario.');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <View style={styles.linea} />

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>
      </View>

      <View style={styles.accionesContainer}>
        <Pressable
          style={styles.botonActualizar}
          onPress={() =>
            router.push({
              pathname: '/actualizar',
              params: {
                id: usuario.id,
                nombre: usuario.nombre,
                edad: usuario.edad,
              },
            })
          }
        >
          <Text style={styles.textoBotonActualizar}>Actualizar</Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBotonEliminar}>Eliminar</Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalMensaje}>
              ¿Estás seguro de que deseas eliminar al usuario{'\n'}
              <Text style={{ fontWeight: 'bold' }}>{usuario.nombre}</Text>?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.btnCancelar}
                onPress={() => setModalVisible(false)}
                disabled={eliminando}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.btnConfirmarEliminar}
                onPress={confirmarEliminacion}
                disabled={eliminando}
              >
                <Text style={styles.textoConfirmarEliminar}>
                  {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 25,
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
    color: '#6B7280',
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  accionesContainer: {
    alignItems: 'center',
  },
  botonActualizar: {
    backgroundColor: '#EAB308',
    width: '60%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotonActualizar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    width: '60%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBotonEliminar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },
  modalTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMensaje: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  textoCancelar: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnConfirmarEliminar: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  textoConfirmarEliminar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
