import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import {
    Background,
    ContainerButton,
    Botao,
    TextoBotao
} from './styles';
import {
    Feather,
    Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Mais() {
    const navigate = useNavigation();

    return (
        <Background>
            <ContainerButton>
                {/* <Botao onPress={() => navigate.navigate('Objetivo')}>
                    <Feather name="target" size={24} color="#333" />
                    <TextoBotao>Objetivos</TextoBotao>
                </Botao> */}
                <Botao onPress={() => navigate.navigate('CalcJurosCompostosAporteMensal')}>
                    <Ionicons name="ios-calculator" size={24} color="#333" />
                    <TextoBotao>Calculadora</TextoBotao>
                </Botao>
            </ContainerButton>
        </Background>
    );
}