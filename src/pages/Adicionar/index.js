import React from 'react';
import { } from 'react-native';
import { Background, ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import {
    Feather,
    Ionicons,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';

export default function Adicionar() {
    return (
        <Background>
            <ContainerButton>
                <Botao>
                    <MaterialIcons name="attach-money" size={24} color="black" />
                    <TextoBotao>Patrimônio</TextoBotao>
                </Botao>
                <Botao>
                    <AntDesign name="barschart" size={24} color="black" />
                    <TextoBotao>Ações</TextoBotao>
                </Botao>
                <Botao>
                    <MaterialIcons name="apartment" size={24} color="black" />
                    <TextoBotao>Fundos Imobiliários</TextoBotao>
                </Botao>
            </ContainerButton>
        </Background>
    );
}