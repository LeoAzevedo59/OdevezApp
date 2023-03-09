//#region Improts
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';
import {
    Extrato,
    IconeExtrato,
    ContainerDescricao,
    TxtDescricao,
    TxtData,
    TxtValorExtrato,
    ContainerInfo,
    StatusExtrato
} from './styles';
//#endregion
import { FormatReais } from '../../components/Mascara';

export default function LblExtrato(props) {
    let corExpandMore = props.data.movimentacao.codigo === 1 ? 'green' : 'red';

    function setColor() {
        if (props.data.categoria.descricao == "TRANSPORTE")
            return '#FF8555';
        else if (props.data.categoria.descricao == "ALIMENTAÇÃO")
            return '#975FFF';
        else if (props.data.categoria.descricao == "LAZER")
            return '#55FF85';
        else if (props.data.categoria.descricao == "TRANSFERÊNCIA")
            return '#FF55C5';
        else if (props.data.categoria.descricao == "BÔNUS")
            return '#55EBFF';
        else if (props.data.categoria.descricao == "OUTROS")
            return '#D2D2D2';
        else if (props.data.categoria.descricao == "SALÁRIO")
            return '#FFDC5F';
    }

    function exibirIcone() {
        let nome = "";
        if (props.data.categoria.descricao == "TRANSPORTE")
            return <MaterialCommunityIcons name={'train-car-passenger-variant'} size={24} color="#fff" />;
        else if (props.data.categoria.descricao == "ALIMENTAÇÃO")
            nome = "food";
        else if (props.data.categoria.descricao == "LAZER")
            nome = "table-tennis";
        else if (props.data.categoria.descricao == "TRANSFERÊNCIA")
            return (<AntDesign name="retweet" size={24} color="#fff" />)
        else if (props.data.categoria.descricao == "BÔNUS")
            return (<AntDesign name="piechart" size={24} color="#fff" />)
        else if (props.data.categoria.descricao == "OUTROS")
            return (<MaterialIcons name="more-horiz" size={24} color="#fff" />)
        else if (props.data.categoria.descricao == "SALÁRIO")
            return (<MaterialIcons name="attach-money" size={24} color="#fff" />)
        return (
            <MaterialCommunityIcons name={nome} size={24} color="#fff" />
        )
    }

    return (
        <SafeAreaView>
            <Extrato onPress={() => props.resumido !== true && props.metodo(props.data.codigo, props.data.carteira.codigo, props.data.status, props.data.valor)}>
                <ContainerInfo>
                    <IconeExtrato style={{ backgroundColor: setColor() }}>
                        {
                            exibirIcone()
                        }
                        <StatusExtrato
                            style={[
                                props.data.status === 1 ? styles.Efetivado : styles.Pendente
                            ]}
                        />
                    </IconeExtrato>
                    <ContainerDescricao>
                        <TxtDescricao>
                            {props.data.categoria.descricao}
                        </TxtDescricao>
                        <TxtData>
                            {props.data.descricao.substring(0, 30)}
                        </TxtData>
                        <TxtData>
                            {props.data.dataCriacao.slice(0, 10)}
                        </TxtData>
                    </ContainerDescricao>
                </ContainerInfo>
                <ContainerInfo>
                    <TxtValorExtrato>
                        R$
                        {props.exibirValor === true ? " " + FormatReais(props.data.valor) : " ****"}
                    </TxtValorExtrato>
                    <MaterialIcons name="expand-more" size={24} color={corExpandMore} />
                </ContainerInfo>
            </Extrato>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Pendente: {
        backgroundColor: 'orange'
    },
    Efetivado: {
        backgroundColor: 'green'
    }
})