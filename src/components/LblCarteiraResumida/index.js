import { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
    Carteira,
    CarteiraHeader,
    CarteiraFooter,
    CarteiraData,
    CarteiraValor,
    H2,
    Span,
    H1,
    Div
} from './styles';

import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import api from '../../contexts/api';
import { FormatReais } from '../Mascara';

export default function LblCarteiraResumida(props) {
    const dateObj = new Date();
    const monthNameShort = dateObj.toLocaleString("pt-BR").toString().slice(4, 7);

    const { usuario, exibirValor } = useContext(AuthContext);

    const [valorCarteira, setValorCarteira] = useState(0);

    async function ObterValorCarteira() {
        await api.get("carteira/obter-valor-por-codigo", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                carteira: props.data.codigo
            }
        }).then((response) => {
            setValorCarteira(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Carteira - Obter Valro Carteira");
        });
    }

    useEffect(() => {
        ObterValorCarteira();
    }, [exibirValor])

    return (
        <>
            {props.data.chkExibirHome === true ?
                <Carteira style={styles.shadow}>
                    <CarteiraHeader>
                        <Div>
                            <FontAwesome name="bank" size={24} color="#333" />
                            <H1>{props.data.descricao}</H1>
                        </Div>
                        <H2>{props.data.bancoDTO?.name}</H2>
                    </CarteiraHeader>
                    <CarteiraFooter>
                        <CarteiraData>
                            {props.data.fechamentoFatura > 0 ?
                                <>
                                    <Span>{props.data.fechamentoFatura} / {monthNameShort}</Span>
                                    <Span>{props.data.vencimentoFatura} / {monthNameShort}</Span>
                                </>
                                :
                                <></>}
                        </CarteiraData>
                        <CarteiraValor>
                            <H2>Saldo</H2>
                            <Span>R$  {props.exibirValor == true ? FormatReais(valorCarteira) : " ****"}</Span>
                        </CarteiraValor>
                    </CarteiraFooter>
                </Carteira>
                :
                <></>
            }
        </>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 5,
    }
});