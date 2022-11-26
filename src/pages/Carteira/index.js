import React, { useRef, useContext } from 'react';
import { ScrollView, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import { AuthContext } from '../../contexts/auth';
import LblPatrimonio from '../../components/LblPatrimonio';
import LblCarteira from '../../components/LblCarteira';

import {
    Background
} from './styles';

import {
    Feather,
    FontAwesome,
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons';

export default function Carteira() {
    const navigation = useNavigation();
    const modalizeRef = useRef(null);
    const { usuario, exibirValor } = useContext(AuthContext);

    function onOpen(txt) {
        console.log(txt)
        modalizeRef.current?.open();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Background>
                <LblPatrimonio valor={" " + "485.324,11"} exibirValor={exibirValor} link="AdicionarAlterarCarteira" titulo="Carteira" />
                {/* <LblCarteira metodo={onOpen} valor={" " + "367,77"} exibirValor={exibirValor} />
                <LblCarteira metodo={onOpen} valor={" " + "280,88"} exibirValor={exibirValor} /> */}
                {/* <FlatList
                    data={ }

                    renderItem={ }
                /> */}
            </Background >

            <Modalize
                ref={modalizeRef}
                snapPoint={180}
                modalHeight={180}
            >
                <Background>
                    <ContainerButton>
                        <Botao onPress={() => alert('Alteração de carteira')}>
                            <AntDesign name="retweet" size={24} color="black" />
                            <TextoBotao>Alterar</TextoBotao>
                        </Botao>
                        <Botao onPress={() => alert('Exclusão de carteira')}>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="black" />
                            <TextoBotao>Excluir</TextoBotao>
                        </Botao>
                    </ContainerButton>
                </Background>
            </Modalize>
        </GestureHandlerRootView>
    );
}