//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ImageBackground,ActivityIndicator} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

//Zona 2 Main - Hogar de los componentes
export default function ImageSplashScreen() {
  const [loading, setLoading] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepararAplicacion() {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        setLoading(false);
      }
    }

    prepararAplicacion();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      async function ocultarSplash() {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn("Error al ocultar splash:", e);
        }
      }
      ocultarSplash();
    }
  }, [appIsReady]);

  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 20 }} />
        <Text style={styles.splashText}>Cargando aplicación...</Text>
      </View>
    );
  }

  
  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/500/900' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Bienvenido a React Native</Text>
        <Text style={styles.subtitulo}>
          Ejemplo de ImageBackground y SplashScreen
        </Text>
      </View>
    </ImageBackground>
  );
}
//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  background: {
    flex: 1, 
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
  },
});