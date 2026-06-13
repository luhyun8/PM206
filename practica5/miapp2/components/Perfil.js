import { View, Text,Button} from 'react-native';
import React,{useState} from 'react';
//Perfil usando desestructuración de objetos
export const Perfil = ({nombre, carrera, materia, cuatrimestre}) => {

    const [mostar,setMostrar] = useState(false);

    return (
    <View>
        <Text >{nombre}</Text>

        {mostar &&
        <>
        <Text >{carrera}</Text>
        <Text >{materia}</Text>
        <Text >{cuatrimestre}</Text>
        </>
        }
        <Button title= "Mostrar Perfil" 
        onPress={() => setMostrar(!mostar)}/>

    </View>
);

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
};