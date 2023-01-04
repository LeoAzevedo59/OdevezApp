//#region Import

import React, { useRef, useContext, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
import { Modalize } from 'react-native-modalize';
import { Picker } from '@react-native-community/picker';

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
    Calendar,
    Background
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

//#endregion

export default function Extrato({ navigation }) {
    const modalizeRef = useRef(true);
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);
    const [extrato, setExtrato] = useState([]);
    const [codigoExtrato, setCodigoExtrato] = useState();
    const [codigoCarteira, setCodigoCarteira] = useState(0);
    const [mesIndex, setMesIndex] = useState(new Date().getMonth());
    const [ano, setAno] = useState(new Date().getFullYear());
    const [valorCarteira, setValorCarteira] = useState(0);
    const [iconStatus, setIconStatus] = useState('checkmark');
    const [status, setStatus] = useState(0);
    const [valor, setValor] = useState(0);
    const [selectedCarteira, setSelectedCarteira] = useState(0);
    const [carteiras, setCarteiras] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function Next(btnDescricao) {
        setIsLoading(true);

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

    function onOpen(codExtrato, codCarteira, codStatus, valorTotal) {
        setStatus(codStatus);

        if (codStatus === 1)
            setIconStatus('help');
        if (codStatus === 2)
            setIconStatus('checkmark');

        setCodigoCarteira(codCarteira);
        setValor(valorTotal);
        setCodigoExtrato(codExtrato);

        modalizeRef.current?.open();
    }

    async function ObterExtrato(carteira) {
        let codCarteira = 0;

        if (carteiras !== undefined && selectedCarteira !== undefined)
            codCarteira = carteiras[selectedCarteira].codigo;

        if (codCarteira === 0)
            codCarteira = carteira;

        await api.get("extrato/obter-extrato", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo,
                data: `${ano}-${meses[mesIndex]}`,
                carteira: codCarteira
            }
        }).then((response) => {
            setExtrato(response.data.extratos);
            setValorCarteira(response.data.valorMes);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Extrato - ObterExtrato()");
        });

        setIsLoading(false);
    }

    async function ExcluirExtrato() {
        modalizeRef.current?.close();
        setIsLoading(true);

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
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Extrato - Excluir Extrato");
        });
    }

    async function AlterarStatus() {
        setIsLoading(true);
        modalizeRef.current?.close();

        await api.put("extrato/alterar-status", {
            Codigo: codigoExtrato,
            StatusOld: status,
            Carteira: codigoCarteira,
            Valor: valor,
        },
            {
                headers: {
                    Authorization: usuario.type + " " + usuario.token
                },
            }).then((response) => {
                ExibirValor(!exibirValor)
                ExibirValor(exibirValor)
            }).catch(function (error) {
                console.log(error.response.status + " Componente: Extrato - Alterar Status");
            });
    }

    function AlterarExtrato() {
        modalizeRef.current?.close();

        navigation.navigate('FrmPatrimonio', { extrato: codigoExtrato });
    }

    async function ObterDescricaoCarteiras() {
        await api.get("carteira/obter-descricao-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        }).then((response) => {
            setCarteiras(response.data);
            ObterExtrato(response.data[0].codigo);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
        });
    }

    const getContent = () => {
        if (isLoading)
            return <ActivityIndicator size="large" />
    }

    useEffect(() => {
        ObterDescricaoCarteiras();
    }, [exibirValor, mesIndex, selectedCarteira])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header>
                <Left onPress={() => Next("LEFT")}>
                    <AntDesign name="left" size={24} color="white" />
                </Left>
                <Center>
                    <H1>
                        R$
                        {exibirValor === true ? " " + valorCarteira.toFixed(2) : " ****"}
                    </H1>
                    {/* <H2>Vencimento 22 AGO</H2>
                    <H2>Fechamento 14 AGO</H2> */}
                </Center>
                <Right onPress={() => Next("RIGHT")}>
                    <AntDesign name="right" size={24} color="white" />
                </Right>
            </Header>
            <Container>
                <ContainerCarteira>
                    <Bank>
                        <FontAwesome name="bank" size={20} color="##333" />
                    </Bank>
                    <Background>
                        <Picker
                            selectedValue={selectedCarteira}
                            onValueChange={(itemValue, itemIndex) => setSelectedCarteira(itemValue)}
                        >
                            {
                                carteiras != null
                                    ?
                                    carteiras.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
                                    })
                                    :
                                    <H1 />
                            }
                        </Picker>
                    </Background>
                    <Calendar>
                        <H2 style={{ color: '#333', marginRight: 16 }}>{meses[mesIndex]} - {ano}</H2>
                        <AntDesign name="calendar" size={16} color="#333" />
                    </Calendar>
                </ContainerCarteira>
            </Container>

            {isLoading === false
                ?
                <FlatList
                    horizontal={false}
                    keyExtractor={(item) => item.codigo}
                    data={extrato}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <LblExtrato data={item} exibirValor={exibirValor} metodo={onOpen} />}
                />
                :
                getContent()
            }

            <Modalize
                ref={modalizeRef}
                snapPoint={260}
                modalHeight={260}
            >
                <Container>
                    <ContainerButton>
                        <Botao onPress={() => AlterarExtrato()}>
                            <AntDesign name="retweet" size={24} color="#333" />
                            <TextoBotao>Alterar</TextoBotao>
                        </Botao>
                        <Botao onPress={() => ExcluirExtrato()}>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="#333" />
                            <TextoBotao>Excluir</TextoBotao>
                        </Botao>
                        <Botao onPress={() => AlterarStatus()}>
                            <Ionicons name={iconStatus} size={24} color="black" />
                            <TextoBotao>{status === 2 ? "Efetivar" : "Pendente"}</TextoBotao>
                        </Botao>
                    </ContainerButton>
                </Container>
            </Modalize>
        </GestureHandlerRootView>
    );
}