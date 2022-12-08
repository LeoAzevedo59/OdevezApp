import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';

import {
    Container,
    Header,
    Left,
    Right,
    Center,
    H1,
    H2,
    ContainerCarteira,
    Bank,
    Calendar
} from './styles';
import {
    AntDesign,
    FontAwesome
} from '@expo/vector-icons';

import LblExtrato from '../../components/LblExtrato';
import api from '../../contexts/api';

export default function Extrato() {
    const { usuario, exibirValor } = useContext(AuthContext);
    const [extrato, setExtrato] = useState([]);

    async function ObterExtrato() {
        await api.get("extrato/obter-extrato-resumido", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        }).then((response) => {
            setExtrato(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Home - Extrato resumido");
        });
    }

    useEffect(() => {
        ObterExtrato();
    }, [])

    useEffect(() => {
        ObterExtrato();
    }, [exibirValor])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header>
                <Left>
                    <AntDesign name="left" size={24} color="white" />
                </Left>
                <Center>
                    <H1>R$ 276.12,22</H1>
                    <H2>Vencimento 22 AGO</H2>
                    <H2>Fechamento 14 AGO</H2>
                </Center>
                <Right>
                    <AntDesign name="right" size={24} color="white" />
                </Right>
            </Header>
            <Container>
                <ContainerCarteira>
                    <Bank>
                        <FontAwesome name="bank" size={20} color="#000" />
                        <H1 style={{ color: 'black', marginLeft: 16 }}>Itau</H1>
                    </Bank>
                    <Calendar>
                        <AntDesign name="calendar" size={16} color="black" />
                        <H2 style={{ color: 'black', marginLeft: 16 }}>Agosto</H2>
                    </Calendar>
                </ContainerCarteira>
                <FlatList
                    horizontal={false}
                    keyExtractor={(item) => item.id}
                    data={extrato}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <LblExtrato data={item} exibirValor={exibirValor} />}
                />
            </Container>
        </GestureHandlerRootView>
    );
}