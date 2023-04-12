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
                            <Titulo>O que é um aplicativo de gestão financeira pessoal?</Titulo>
                            <AntDesign name={[
                                isOpen1 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>
                    <Descricao style={[
                        isOpen1 ? { display: 'flex' } : { display: 'none' }
                    ]}>Um aplicativo de gestão financeira pessoal é uma ferramenta que ajuda os usuários a controlar suas finanças pessoais, gerenciar despesas, fazer orçamentos e planejar suas finanças a longo prazo.</Descricao>
                </ContainerDuvida>

                <ContainerDuvida>
                    <TouchableOpacity onPress={() => AlterarIcone(2)} >
                        <Header>
                            <Titulo>Quais são os benefícios de usar um aplicativo de gestão financeira pessoal?</Titulo>
                            <AntDesign name={[
                                isOpen2 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>

                    <Descricao style={[
                        isOpen2 ? { display: 'flex' } : { display: 'none' }
                    ]}>Os benefícios incluem um maior controle sobre as finanças pessoais, a capacidade de ver claramente onde o dinheiro está sendo gasto e identificar áreas onde pode haver oportunidades de economia. Além disso, esses aplicativos podem ajudar os usuários a economizar tempo e esforço ao automatizar tarefas de rastreamento de despesas e fornecer relatórios de gastos.</Descricao>
                </ContainerDuvida>

                <ContainerDuvida>
                    <TouchableOpacity onPress={() => AlterarIcone(3)} >
                        <Header>
                            <Titulo>Como esses aplicativos funcionam?</Titulo>
                            <AntDesign name={[
                                isOpen3 ? 'down' : 'right'
                            ]} size={24} color="#333" />
                        </Header>
                    </TouchableOpacity>

                    <Descricao style={[
                        isOpen3 ? { display: 'flex' } : { display: 'none' }
                    ]}>Esses aplicativos geralmente permitem que os usuários adicionem suas contas bancárias, cartões de crédito e outras contas financeiras para que possam ver um panorama completo de suas finanças. Eles também permitem que os usuários categorizem suas despesas, definam orçamentos e recebam alertas quando atingirem um limite de gastos ou quando uma conta estiver baixa.</Descricao>
                </ContainerDuvida>

                <Button onPress={() =>
                    Linking.openURL('mailto:suporte@odevez.com')
                }
                    title="suporte@odevez.com" />
            </ScrollView>
        </Background>
    );
}