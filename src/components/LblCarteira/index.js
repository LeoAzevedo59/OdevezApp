//#region 
import React, { useRef, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import {
    CarteiraContainer,
    InfoCarteira,
    HeaderInfo,
    CarteiraDesc,
    TextoLowOpacity,
    Texto,
    AltCarteira,
    InfoFooter,
    AltFooter,
    AltHeader
} from './styles';
import {
    Feather,
    FontAwesome
} from '@expo/vector-icons';

import api from '../../contexts/api';
//#endregion

export default function LblCarteira(props) {
    const navigation = useNavigation();
    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);
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
    }, [])

    useEffect(() => {
        ObterValorCarteira();
    }, [exibirValor])

    return (
        <SafeAreaView>
            <CarteiraContainer>
                <InfoCarteira style={styles.shadow} onPress={() => navigation.navigate("Extrato")}>
                    <HeaderInfo>
                        <FontAwesome name="bank" size={24} color="#333" />
                        <CarteiraDesc>{props.data.descricao}</CarteiraDesc>
                    </HeaderInfo>
                    <TextoLowOpacity>Mastercard</TextoLowOpacity>
                    <InfoFooter>
                        {/* <Texto>{props.data.fechamentoFatura}</Texto>
                        <TextoLowOpacity>Fechamento</TextoLowOpacity> */}
                    </InfoFooter>
                </InfoCarteira>
                <AltCarteira style={styles.shadow} onPress={() => props.metodo(props.data.codigo)}>
                    <AltHeader>
                        <Feather name='more-horizontal' size={24} color="#333" />
                    </AltHeader>
                    <AltFooter>
                        <TextoLowOpacity >Saldo</TextoLowOpacity>
                        <Texto >R$  {props.exibirValor == true ? valorCarteira.toFixed(2) : " ****"}</Texto>
                    </AltFooter>
                </AltCarteira>
            </CarteiraContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
    }
});
