//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import CardsScreen from './CardsScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ModalScreen from './ModalScreen';
import PressableScreen from './PressableScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TextInputScreen from './TextInputScreen';

//Zona 2 Main - Hogar de los componentes
export default function MenuScreen() {

    const [screen, setScreen] = useState('menu');

    switch(screen) {
        case 'card':
            return <CardsScreen/>;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'activityIndicator':
            return <ActivityIndicatorScreen />;
        case 'flatList':
            return <FlatListScreen />;
        case 'imageBackgroung':
            return <ImageBackgroungScreen />;
        case 'modal':
            return <ModalScreen />;
        case 'pressable':
            return <PressableScreen />;
        case 'textInput':
            return <TextInputScreen />;

        case 'menu':
        default:
        return (

    <View style={styles.container}>

        <Text> Menu de Prácticas </Text>

        <Button onPress={() => setScreen('card')} title="Card" />
        <Button onPress={() => setScreen('safeArea')} title="SafeAreaView" />
        <Button onPress={() => setScreen('activityIndicator')} title="ActivityIndicator" />
        <Button onPress={() => setScreen('flatList')} title="FlatList" />
        <Button onPress={() => setScreen('imageBackgroung')} title="ImageBackgroung" />
        <Button onPress={() => setScreen('modal')} title="Modal" />
        <Button onPress={() => setScreen('pressable')} title="Pressable" />
        <Button onPress={() => setScreen('textInput')} title="TextInput" />
        <StatusBar style="auto" />
    </View>
    );
    }
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
},
});