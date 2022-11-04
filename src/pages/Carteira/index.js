import React from 'react';
import { ScrollView } from 'react-native';
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
    FontAwesome
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function Carteira() {
    const navigation = useNavigation();

    return (
        <Background>
            <PatrimonioClick>
                <ContainerPatrimonio>
                    <TxtPatrimonio> Carteiras </TxtPatrimonio>
                    <TxtValorPatrimonio> R$ 485.324,11 </TxtValorPatrimonio>
                </ContainerPatrimonio>
                <Feather name="plus-circle" size={24} color="black" />
            </PatrimonioClick>
            <ScrollView>
                <Cartao onPress={() => navigation.navigate('Extrato')}>
                    <Container>
                        <ContainerHeader>
                            <Header>
                                <ContainerNome>
                                    <FontAwesome name="bank" size={24} color="white" />
                                    <TxtNomeBanco>Itau</TxtNomeBanco>
                                </ContainerNome>
                                <Feather name='more-horizontal' size={24} color="white" />
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
    );
}