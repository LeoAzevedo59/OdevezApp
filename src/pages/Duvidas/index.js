import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    Background,
    ContainerDuvida,
    Titulo,
    Descricao,
    Header
} from './styles';
import { AntDesign } from '@expo/vector-icons';

export default function Duvidas() {
    function AlterarIcone() {
        if (icone == 'right') {
            setIcone('down')
            setExibirDescricao('flex')
        }
        else {
            setIcone('right')
            setExibirDescricao('none')
        }
    }

    const [icone, setIcone] = useState('right');
    const [exibirDescricao, setExibirDescricao] = useState('none');

    return (
        <Background>
            <ContainerDuvida>
                <Header>
                    <Titulo>Como alterar a forma de pagamento da assinatura?</Titulo>
                    <AntDesign name={icone} size={24} color="black" onPress={AlterarIcone} />
                </Header>
                <Descricao style={{ display: exibirDescricao }}>Se você fez a assinatura do Odevez Finance pela Web e deseja alterar a forma de pagamento, siga os passos abaixo:{"\n"}{"\n"}
                    1. mAcesse seu gmail e busque pela palavra chave Odevez Finance Labs. {"\n"}{"\n"}
                    2. Você encontrará um e-mail do Pagar.me. Acesse ele e então clique em Gerenciar assinatura; {"\n"}{"\n"}
                    3. Ao clicar, será apresentada uma tela com os detalhes da assinatura e poderá alterar a forma de pagamento.</Descricao>
            </ContainerDuvida>

            <ContainerDuvida>
                <Header>
                    <Titulo>Há uma cobrança que não reconheço?</Titulo>
                    <AntDesign name={icone} size={24} color="black" onPress={AlterarIcone} />
                </Header>
                <Descricao style={{ display: exibirDescricao }}>Ao verificar sua fatura de cartão de crédito, se deparou com uma cobrança que não conhece sua origem ou não sabia que haveria renovação automática? Verifique as informações abaixo e, se comprovar que a cobraça é realmente do Odevez Finance, entre em contato com nossa equipe em odevezfinance.me/contatosuporte.</Descricao>
            </ContainerDuvida>
        </Background>
    );
}