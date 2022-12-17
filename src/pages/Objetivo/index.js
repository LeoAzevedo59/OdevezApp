import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import {
    Container
} from './styles';

import {
    ContainerButton,
    Botao,
    TextoBotao
} from '../Mais/styles';

import {
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import LblPatrimonio from '../../components/LblPatrimonio';
import LblObjetivo from '../../components/LblObjetivo';


export default function Objetivo() {
    const valor = 123;
    const modalizeRef = useRef(null);
    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);

    function onOpen(codigo) {
        // setCodigoCarteira(codigo);
        modalizeRef.current?.open();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <Container>
                    <LblPatrimonio valor={" " + valor.toFixed(2)} exibirValor={exibirValor} link="FrmObjetivo" titulo="Objetivo" />
                </Container>

                <View style={{ marginTop: 24 }} />

                <LblObjetivo metodo={onOpen} />
            </SafeAreaView>
            
            <Modalize
                ref={modalizeRef}
                snapPoint={180}
                modalHeight={180}
            >
                <Container>
                    <ContainerButton>
                        <Botao onPress={() => alert('Alteração de objetivo')}>
                            <AntDesign name="retweet" size={24} color="#333" />
                            <TextoBotao>Alterar</TextoBotao>
                        </Botao>
                        <Botao onPress={() => alert('Exclusão')}>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="#333" />
                            <TextoBotao>Excluir</TextoBotao>
                        </Botao>
                    </ContainerButton>
                </Container>
            </Modalize>
        </GestureHandlerRootView>
    );
}