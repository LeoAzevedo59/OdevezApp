import React from 'react';
import { } from 'react-native';
import { Background, ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import {
    MaterialIcons,
    MaterialCommunityIcons ,
    Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Adicionar() {
    const navigation = useNavigation();
    return (
        <Background>
            <ContainerButton>
                <Botao onPress={() => navigation.navigate('FrmPatrimonio')}>
                    <MaterialIcons name="attach-money" size={24} color="#333" />
                    <TextoBotao>Receita & Despesa</TextoBotao>
                </Botao>
                <Botao onPress={() => navigation.navigate('ImportExtrato')}>
                <MaterialCommunityIcons name="import" size={24} color="#333" />
                    <TextoBotao>Importar Extrato</TextoBotao>
                </Botao>

                {/* <Botao onPress={() => navigation.navigate('FrmObjetivo')}>
                    <Feather name="target" size={24} color="#333" />
                    <TextoBotao>Objetivo</TextoBotao>
                </Botao>
                <Botao>
                    <AntDesign name="barschart" size={24} color="#333" />
                    <TextoBotao>Ações</TextoBotao>
                </Botao>
                <Botao>
                    <MaterialIcons name="apartment" size={24} color="#333" />
                    <TextoBotao>Fundos Imobiliários</TextoBotao>
                </Botao> */}
            </ContainerButton>
        </Background>
    );
}