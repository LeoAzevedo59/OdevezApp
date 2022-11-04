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

export default function Mais() {
    return (
        <Background>
            <ContainerButton>
                <Botao>
                    <Feather name="target" size={24} color="black" />
                    <TextoBotao>Objetivos</TextoBotao>
                </Botao>
                <Botao>
                    <Ionicons name="ios-calculator" size={24} color="black" />
                    <TextoBotao>Calculadora</TextoBotao>
                </Botao>
            </ContainerButton>
        </Background>
    );
}