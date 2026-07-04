import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import { Ionicons } from '@expo/vector-icons';


export default function App() {
 const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' }}
        style={estilos.splashFondo}
        resizeMode="cover">
      <View style={estilos.splashOverlay}>
          <Ionicons name="book" size={90} color="#fff" />
          <Text style={estilos.splashTexto}>repaso2</Text>
          <Text style={estilos.splashSubtexto}>Catálogo de Libros</Text>
      </View>
      </ImageBackground>
    );
  }

  return <SplashScreen />;
}

const estilos = StyleSheet.create({
  splashFondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  splashTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  splashSubtexto: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});