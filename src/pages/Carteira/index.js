//#region 
import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { ContainerButton, Botao, TextoBotao } from '../Mais/styles';
import { AuthContext } from '../../contexts/auth';

import LblPatrimonio from '../../components/LblPatrimonio';
import LblCarteira from '../../components/LblCarteira';
import LblTipoCarteira from '../../components/LblTipoCarteira';
import api from '../../contexts/api';

import {
    Background,
    Container
} from './styles';

import {
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons';
//#endregion

export default function Carteira() {
    const navigation = useNavigation();
    const modalizeRef = useRef(null);
    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);
    const [tipoCarteira, setTipoCarteira] = useState(null);
    const [codigoTipoCarteira, setCodigoTipoCarteira] = useState(0);
    const [carteira, setCarteira] = useState();
    const [codigoCarteira, setCodigoCarteira] = useState();
    const [valorCarteira, setValorCarteira] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function onOpen(codigo) {
        setCodigoCarteira(codigo);
        modalizeRef.current?.open();
    }

    function TipoCarteiraSelecionada(codigo, item) {
        setCodigoTipoCarteira(codigo);
        setSelectedItem(item);
    }

    function AlterarCarteira() {
        modalizeRef.current?.close();

        navigation.navigate('FrmCarteira', { codigoCarteiraAlterar: codigoCarteira });
    }

    async function ObterTipoCarteira() {
        await api.get("carteira/obter-tipo-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {

            const array = [{
                codigo: 0,
                descricao: "TODOS",
            }]

            let jun = [...array, ...response.data];

            setTipoCarteira(jun);
            setSelectedItem(jun[0]);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Carteira - Obter tipo Carteira");
        });
    }

    async function ObterCarteira() {
        setIsLoading(true);
        await api.get("carteira/obter-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo,
                tipoCarteira: codigoTipoCarteira
            }
        }).then((response) => {
            setCarteira(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Carteira - Obter Carteira");
        });
        setIsLoading(false);
    }

    async function ObterValorCarteira() {
        await api.get("carteira/obter-valor-por-tipo", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo,
                tipoCarteira: codigoTipoCarteira
            }
        }).then((response) => {
            setValorCarteira(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Carteira - Obter Valro Carteira");
        });
    }

    async function ExcluirCarteira() {
        modalizeRef.current?.close();

        await api.delete("carteira/excluir-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo,
                carteira: codigoCarteira
            }
        }).then((response) => {
            ExibirValor(!exibirValor)
            ExibirValor(exibirValor)

        }).catch(function (error) {
            console.log(error.response.status + " Componente: Carteira - Excluir Carteira");
        });
    }

    const getContent = () => {
        if (isLoading)
            return <ActivityIndicator size="large" />
    }

    useEffect(() => {
        ObterCarteira();
        ObterTipoCarteira();
        ObterValorCarteira();
    }, [])

    useEffect(() => {
        ObterCarteira();
        ObterValorCarteira();
    }, [codigoTipoCarteira, exibirValor])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Background>
                <LblPatrimonio valor={" " + valorCarteira.toFixed(2)} exibirValor={exibirValor} link="FrmCarteira" titulo="Carteira" />
            </Background >

            <View style={{ height: 50, marginTop: 24, marginBottom: 24 }}>
                <FlatList
                    style={{ height: 32 }}
                    horizontal={true}
                    keyExtractor={(item) => item.codigo}
                    data={tipoCarteira}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <LblTipoCarteira data={item} metodo={TipoCarteiraSelecionada} selected={selectedItem} />}
                />
            </View>

            {isLoading === false
                ?
                <FlatList
                    horizontal={false}
                    keyExtractor={(item) => item.codigo}
                    data={carteira}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <LblCarteira data={item} metodo={onOpen} exibirValor={exibirValor} valor={" " + valorCarteira.toFixed(2)} />}
                />
                :
                getContent()
            }

            <Modalize
                ref={modalizeRef}
                snapPoint={180}
                modalHeight={180}
            >
                <Background>
                    <ContainerButton>
                        <Botao onPress={() => AlterarCarteira()}>
                            <AntDesign name="retweet" size={24} color="#333" />
                            <TextoBotao>Alterar</TextoBotao>
                        </Botao>
                        <Botao onPress={() => ExcluirCarteira()}>
                            <MaterialCommunityIcons name="delete-forever-outline" size={24} color="#333" />
                            <TextoBotao>Excluir</TextoBotao>
                        </Botao>
                    </ContainerButton>
                </Background>
            </Modalize>
        </GestureHandlerRootView>
    );
}