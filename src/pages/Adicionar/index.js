import React from 'react';
import { } from 'react-native';
import { Background, ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import {
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Adicionar() {
    const navigation = useNavigation();
    return (
        <Background>
            <ContainerButton>
                <Botao onPress={() => navigation.navigate('Patrimonio')}>
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