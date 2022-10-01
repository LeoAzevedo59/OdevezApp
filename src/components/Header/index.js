import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, ImgPerfil, NomeUsuario, ContainerIcons, Notificacao, ContainerPerfil } from './style';
import { Octicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function Header() {

    const navigation = useNavigation();
    const [eye, setEye] = useState('eye');

    function exibirSimNao() {
        if (eye === 'eye')
            setEye('eye-off')
        else
            setEye('eye')
    }

    return (
        <Container>
            <TouchableOpacity>
                <ContainerPerfil>
                    <ImgPerfil source={require('../../../assets/images/251894087_1962039253968567_7355826083414885049_n.jpg')} />
                    <Notificacao>2</Notificacao>
                    <View style={{ alignSelf: 'center' }}>
                        <NomeUsuario>Léo</NomeUsuario>
                    </View>
                </ContainerPerfil>
            </TouchableOpacity>
            <ContainerIcons>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={exibirSimNao}>
                    <Feather name={eye} size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Octicons name="gear" size={24} color="black" />
                </TouchableOpacity>
            </ContainerIcons>
        </Container>

    );
} 
