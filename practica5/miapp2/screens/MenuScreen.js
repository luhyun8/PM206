//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import CardsScreen from './CardsScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ModalScreen from './ModalScreen';
import PressableSwitchScreen from './PressableSwitchScreen';
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
        case 'pressableSwitch':
            return <PressableSwitchScreen />;
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
        <Button onPress={() => setScreen('pressableSwitch')} title="PressableSwitch" />
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
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 24,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        marginVertical: 6,
        width: 260,
        alignItems: 'center',
        // Sombra (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});