import React, { useRef, useContext } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import { AuthContext } from '../../contexts/auth';

import {
    Background,
    PatrimonioClick,
    ContainerPatrimonio,
    TxtPatrimonio,
    TxtValorPatrimonio,
    Cartao,
    Header,
    ContainerNome,
    TxtNomeBanco,
    TxtDescricao,
    TxtDataVencimento,
    TxtValorBanco,
    Footer,
    Container,
    ContainerSaldo,
    ContainerVencimento,
    ContainerHeader
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

    function onOpen() {
        modalizeRef.current?.open();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Background>
                <PatrimonioClick onPress={() => navigation.navigate('AdicionarAlterarCarteira')}>
                    <ContainerPatrimonio>
                        <TxtPatrimonio> Carteiras </TxtPatrimonio>
                        <TxtValorPatrimonio> R$
                            {exibirValor == true ? "485.324,11" : "****"}
                        </TxtValorPatrimonio>
                    </ContainerPatrimonio>
                    <Feather name="plus-circle" size={24} color="black" />
                </PatrimonioClick>
                <ScrollView>
                    <Cartao>
                        <Container>
                            <ContainerHeader>
                                <Header>
                                    <ContainerNome>
                                        <FontAwesome name="bank" size={24} color="white" />
                                        <TxtNomeBanco>Itau</TxtNomeBanco>
                                    </ContainerNome>
                                    <TouchableOpacity onPress={onOpen}>
                                        <Feather name='more-horizontal' size={24} color="white" />
                                    </TouchableOpacity>
                                </Header>
                                <TxtDescricao>Mastercard - Crédito</TxtDescricao>
                            </ContainerHeader>
                            <Footer>
                                <ContainerVencimento>
                                    <TxtDataVencimento>05/09</TxtDataVencimento>
                                    <TxtDescricao>Fechamento</TxtDescricao>
                                </ContainerVencimento>
                                <ContainerSaldo>
                                    <TxtDescricao>Saldo</TxtDescricao>
                                    <TxtValorBanco>R$ 159,90</TxtValorBanco>
                                </ContainerSaldo>
                            </Footer>
                        </Container>
                    </Cartao>
                </ScrollView>
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