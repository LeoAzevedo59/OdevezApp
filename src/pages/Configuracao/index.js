import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { } from 'react-native';
import {
    Background,
    ContainerButton,
    Botao,
    TextoBotao
} from '../Mais/styles';
import {
    Ionicons
} from '@expo/vector-icons';

export default function Configuracao({ navigation }) {
    const { Deslogar } = useContext(AuthContext);
    return (
        <Background>
            <ContainerButton>
                <Botao onPress={() => Deslogar()}>
                    <Ionicons name="ios-exit-outline" size={24} color="#333" />
                    <TextoBotao>Sair</TextoBotao>
                </Botao>
            </ContainerButton>
        </Background>
    );
}