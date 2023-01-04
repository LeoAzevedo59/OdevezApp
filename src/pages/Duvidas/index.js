import React, { useState } from 'react';
import { View, Linking, TouchableOpacity, Button } from 'react-native';
import {
    Background,
    ContainerDuvida,
    Titulo,
    Descricao,
    Header
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Duvidas() {
    function AlterarIcone(id) {
        switch (id) {
            case 1:
                setIsOpen1(!isOpen1);
                break;
            case 2:
                setIsOpen2(!isOpen2);
                break;
            case 3:
                setIsOpen3(!isOpen3);
                break;
        }
    }

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    return (
        <Background>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ContainerDuvida>
                    <TouchableOpacity onPress={() => AlterarIcone(1)} >
                        <Header>
                            <Titulo>Como alterar a forma de pagamento da assinatura?</Titulo>
                            <AntDesign name={[
                                isOpen1 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>
                    <Descricao style={[
                        isOpen1 ? { display: 'flex' } : { display: 'none' }
                    ]}>Se você fez a assinatura do Odevez Finance pela Web e deseja alterar a forma de pagamento, siga os passos abaixo:{"\n"}{"\n"}
                        1. mAcesse seu gmail e busque pela palavra chave Odevez Finance Labs. {"\n"}{"\n"}
                        2. Você encontrará um e-mail do Pagar.me. Acesse ele e então clique em Gerenciar assinatura; {"\n"}{"\n"}
                        3. Ao clicar, será apresentada uma tela com os detalhes da assinatura e poderá alterar a forma de pagamento.</Descricao>
                </ContainerDuvida>

                <ContainerDuvida>
                    <TouchableOpacity onPress={() => AlterarIcone(2)} >
                        <Header>
                            <Titulo>Como alterar a forma de pagamento da assinatura?</Titulo>
                            <AntDesign name={[
                                isOpen2 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>

                    <Descricao style={[
                        isOpen2 ? { display: 'flex' } : { display: 'none' }
                    ]}>Se você fez a assinatura do Odevez Finance pela Web e deseja alterar a forma de pagamento, siga os passos abaixo:{"\n"}{"\n"}
                        1. mAcesse seu gmail e busque pela palavra chave Odevez Finance Labs. {"\n"}{"\n"}
                        2. Você encontrará um e-mail do Pagar.me. Acesse ele e então clique em Gerenciar assinatura; {"\n"}{"\n"}
                        3. Ao clicar, será apresentada uma tela com os detalhes da assinatura e poderá alterar a forma de pagamento.</Descricao>
                </ContainerDuvida>

                <ContainerDuvida>
                    <TouchableOpacity onPress={() => AlterarIcone(3)} >
                        <Header>
                            <Titulo>Como alterar a forma de pagamento da assinatura?</Titulo>
                            <AntDesign name={[
                                isOpen3 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>

                    <Descricao style={[
                        isOpen3 ? { display: 'flex' } : { display: 'none' }
                    ]}>Se você fez a assinatura do Odevez Finance pela Web e deseja alterar a forma de pagamento, siga os passos abaixo:{"\n"}{"\n"}
                        1. mAcesse seu gmail e busque pela palavra chave Odevez Finance Labs. {"\n"}{"\n"}
                        2. Você encontrará um e-mail do Pagar.me. Acesse ele e então clique em Gerenciar assinatura; {"\n"}{"\n"}
                        3. Ao clicar, será apresentada uma tela com os detalhes da assinatura e poderá alterar a forma de pagamento.</Descricao>
                </ContainerDuvida>

                <Button onPress={() =>
                    Linking.openURL('mailto:support@example.com')
                }
                    title="support@example.com" />
            </ScrollView>
        </Background>
    );
}