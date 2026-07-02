//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Button, TextInput,KeyboardAvoidingView, ActivityIndicator,Platform, Image} from 'react-native';

//Zona 2 Main - Hogar de los componentes
export default function ActivityIndicatorScreen() {
const [nombre,setnombre] = useState('');
const[carrera,setcarrera] = useState('');
const[isLoading,setIsLoading] = useState(false);
const handleGuardar = () => {
    if (nombre.trim() === '' || carrera.trim() === '') {
        alert('Por favor, llena todos los campos.');
    return;
    }
    setIsLoading(true);
    setTimeout(() => {
    setIsLoading(false);
    alert(`Perfil de ${nombre} guardado con éxito`); 
    setnombre('');
    setcarrera('');
    }, 3000);
};

return (
    <View style={styles.container}>
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.formContainer}>
        <View style={styles.formContainerInner}>
        <View style={styles.formBody}>
            <Text style={styles.titulo}>Agregar Perfil</Text>
            <TextInput 
            style={styles.input} 
            placeholder="Nombre completo" 
            value={nombre}
            onChangeText={setnombre}/>

            <TextInput 
            style={styles.input} 
            placeholder="Carrera" 
            value={carrera}
            onChangeText={setcarrera}/>
        </View>

        <View style={styles.actionArea}>
            {isLoading ? (
            <ActivityIndicator size="small" color="#4D96FF" style={styles.loader} />
            ) : (
            <Button title="Guardar Perfil" onPress={handleGuardar} color="#4D96FF" />
            )}
        </View>
        </View>
    </KeyboardAvoidingView>
    <StatusBar style="auto" />
    </View>
);
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b588f8',
  },
  formContainer: {
    flex: 1, 
  },
  formContainerInner: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', 
  },
  formBody: {
    flex: 1, 
    justifyContent: 'center', 
  },
  actionArea: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loader: {
    marginVertical: 10,
  }
});