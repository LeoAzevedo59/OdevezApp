import React, { useRef, useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
import { Modalize } from 'react-native-modalize';

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
    ContainerButton,
    Botao,
    TextoBotao
} from '../Mais/styles';

import {
    AntDesign,
    FontAwesome,
    MaterialCommunityIcons,
    Ionicons
} from '@expo/vector-icons';

import LblExtrato from '../../components/LblExtrato';
import api from '../../contexts/api';

export default function Extrato() {
    const modalizeRef = useRef(true);
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);
    const [extrato, setExtrato] = useState([]);
    const [codigoExtrato, setCodigoExtrato] = useState();
    const [codigoCarteira, setCodigoCarteira] = useState();
    const [mesIndex, setMesIndex] = useState(new Date().getMonth());
    const [ano, setAno] = useState(new Date().getFullYear());
    const [valorCarteira, setValorCarteira] = useState(0);

    async function Next(btnDescricao) {
        if (btnDescricao === "LEFT") {
            if (mesIndex === 0) {
                setMesIndex(11);
                setAno(ano - 1);
            }
            else
                setMesIndex(mesIndex - 1);
        }

        if (btnDescricao === "RIGHT") {
            if (mesIndex === 11) {
                setMesIndex(0);
                setAno(ano + 1);
            }
            else
                setMesIndex(mesIndex + 1);
        }
    }

    function onOpen(codExtrato, codCarteira) {
        setCodigoExtrato(codExtrato);
        setCodigoCarteira(codCarteira);
        modalizeRef.current?.open();
    }

    async function ObterExtrato() {
        await api.get("extrato/obter-extrato", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo,
                data: `${ano}-${meses[mesIndex]}`,
                carteira: 21
            }
        }).then((response) => {
            setExtrato(response.data.extratos);
            setValorCarteira(response.data.valorMes)
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Extrato - ObterExtrato()");
        });
    }

    async function ExcluirExtrato() {
        modalizeRef.current?.close();

        await api.delete("extrato/excluir-extrato", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                extrato: codigoExtrato,
                carteira: codigoCarteira
            }
        }).then((response) => {
            ExibirValor(!exibirValor)
            ExibirValor(exibirValor)
            alert("Extrato excluido com sucesso.");
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Extrato - Excluir extrato");
        });
    }

    useEffect(() => {
        ObterExtrato();
    }, [exibirValor, mesIndex])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header>
                <Left onPress={() => Next("LEFT")}>
                    <AntDesign name="left" size={24} color="white" />
                </Left>
                <Center>
                    <H1>R$ {valorCarteira.toFixed(2)}</H1>
                    <H2>Vencimento 22 AGO</H2>
                    <H2>Fechamento 14 AGO</H2>
                </Center>
                <Right onPress={() => Next("RIGHT")}>
                    <AntDesign name="right" size={24} color="white" />
                </Right>
            </Header>
            <Container>
                <ContainerCarteira>
                    <Bank>
                        <FontAwesome name="bank" size={20} color="##333" />
                        <H1 style={{ color: '#333', marginLeft: 16 }}>Itau</H1>
                    </Bank>
                    <Calendar>
                        <H2 style={{ color: '#333', marginRight: 16 }}>{meses[mesIndex]} - {ano}</H2>
                        <AntDesign name="calendar" size={16} color="#333" />
                    </Calendar>
                </ContainerCarteira>
            </Container>

            <FlatList
                horizontal={false}
                keyExtractor={(item) => item.codigo}
                data={extrato}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <LblExtrato data={item} exibirValor={exibirValor} metodo={onOpen} />}
            />

            <Modalize
                ref={modalizeRef}
                snapPoint={260}
                modalHeight={260}
            >
                <Container>
                    <ContainerButton>
                        <Botao onPress={() => alert('Alteração de extrato')}>
                            <AntDesign name="retweet" size={24} color="#333" />
                            <TextoBotao>Alterar</TextoBotao>
                        </Botao>
                        <Botao onPress={() => ExcluirExtrato()}>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="#333" />
                            <TextoBotao>Excluir</TextoBotao>
                        </Botao>
                        <Botao onPress={() => alert('Efetivada')}>
                            <Ionicons name="checkmark" size={24} color="black" />
                            <TextoBotao>Efetivada</TextoBotao>
                        </Botao>
                    </ContainerButton>
                </Container>
            </Modalize>
        </GestureHandlerRootView>
    );
}