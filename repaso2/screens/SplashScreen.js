//Zona 1 importaciones de componentes y archivos
import React, { useState } from 'react';
import {View,Text,TextInput,Pressable,FlatList,ImageBackground,ActivityIndicator,Alert,StyleSheet,} from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function MainScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const alertasManager = (mensaje) => {
    Alert.alert('Alert', mensaje);
  };

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      alertasManager('Todos los campos son obligatorios.');
      return;
    }
    setGuardando(true);
    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros((prev) => [...prev, nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');

      setGuardando(false);
      alertasManager('Libro guardado correctamente.');
    }, 4000);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' }}
      style={estilos.fondo}
      resizeMode="cover"
    >
      <View style={estilos.contenedor}>
        <Text style={estilos.titulo}>Catálogo de Libros</Text>

        <TextInput
          style={estilos.input}
          placeholder="Título del libro"
          placeholderTextColor="#eee"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={estilos.input}
          placeholder="Autor"
          placeholderTextColor="#eee"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={estilos.input}
          placeholder="Género"
          placeholderTextColor="#eee"
          value={genero}
          onChangeText={setGenero}
        />
  
        <Pressable
          style={({ pressed }) => [
            estilos.boton,
            pressed && estilos.botonPresionado,
          ]}
          onPress={agregarLibro}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={estilos.botonTexto}>Agregar Libro</Text>
          )}
        </Pressable>
        <Text style={estilos.total}>Total de libros: {libros.length}</Text>

        {guardando && (
          <View style={estilos.guardandoLibroBanner}>
            <Text style={estilos.guardandoLibroTexto}>Guardando libro...</Text>
          </View>
        )}

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <Text style={estilos.cardTitulo}>{item.titulo}</Text>
              <Text style={estilos.cardTexto}>Autor: {item.autor}</Text>
              <Text style={estilos.cardTexto}>Género: {item.genero}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}
 //Zona 3 Estilos - Personalización de los componentes
const estilos = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#1565c0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonPresionado: {
    opacity: 0.7,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  guardandoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  guardandoLibroBanner: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  guardandoLibroTexto: {
    color: '#fff',
    fontStyle: 'italic',
  },
  total: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTexto: {
    fontSize: 13,
    color: '#333',
  },
});