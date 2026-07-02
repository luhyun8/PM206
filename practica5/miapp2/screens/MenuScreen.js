//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
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

    const opciones = [
        { key: 'card', label: 'Card' },
        { key: 'safeArea', label: 'SafeAreaView' },
        { key: 'activityIndicator', label: 'ActivityIndicator' },
        { key: 'flatList', label: 'FlatList' },
        { key: 'imageBackgroung', label: 'ImageBackground' },
        { key: 'modal', label: 'Modal' },
        { key: 'pressableSwitch', label: 'PressableSwitch' },
        { key: 'textInput', label: 'TextInput' },
    ];

    switch (screen) {
        case 'card':
            return <CardsScreen />;
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
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.title}>Menu de Prácticas</Text>

                        {opciones.map((opcion) => (
                            <Pressable
                                key={opcion.key}
                                onPress={() => setScreen(opcion.key)}
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && styles.buttonPressed,
                                ]}
                            >
                                <Text style={styles.buttonText}>{opcion.label}</Text>
                            </Pressable>
                        ))}

                        <StatusBar style="auto" />
                    </ScrollView>
                </SafeAreaView>
            );
    }
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b588f8',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        marginVertical: 6,
        width: 260,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonPressed: {
        backgroundColor: '#2563EB',
        opacity: 0.85,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});