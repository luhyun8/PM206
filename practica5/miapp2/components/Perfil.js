import { View, Text,Button, StyleSheet} from 'react-native';
import React,{useState} from 'react';
//Perfil usando desestructuración de objetos
export const Perfil = ({nombre, carrera, materia, cuatrimestre,style}) => {

    const [mostar,setMostrar] = useState(false);

    return (
    <View style={[estilos.tarjeta, style]}>
        <Text style={estilos.nombre} >{nombre}</Text>

        {mostar &&
        <>
        <Text style={estilos.carrera} >{carrera}</Text>
        <Text style={estilos.otroTexto} >{materia}</Text>
        <Text style={estilos.otroTexto} >{cuatrimestre}</Text>
        </>
        }
        <Button title= "Mostrar Perfil" 
        onPress={() => setMostrar(!mostar)}/>

    </View>
);
};
const estilos = StyleSheet.create({
    nombre: {
        fontSize: 25,
        fontWeight: 700,
        textTransform: "uppercase",
    },
    carrera: {
        fontSize: 18,
        color:'pink',
        fontFamily: 'Arial',
    },
    otroTexto: {
        fontSize: 12,
        fontFamily: 'Times New Roman',
        fontStyle: 'italic',
    },
    tarjeta: {
        borderWidth: 2,
        margin: 20,
        padding: 25,
    },
});







/*
//Perfil usando props
export const PerfilProps = (props) => {
    return (
    <View>
        <Text >{props.nombre}</Text>
        <Text >{props.carrera}</Text>
        <Text >{props.materia}</Text>
        <Text >{props.cuatrimestre}</Text>
    </View>
);
};/*/