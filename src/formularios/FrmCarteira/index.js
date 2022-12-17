//#region imports

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

import {
    Background,
    Container,
    Input,
    Texto,
    AreaCadastro,
    TxtEntrar,
    BtnEntrar,
    Row,
    Erro,
    InputMenor
} from './styles';

import api from '../../contexts/api';

//#endregion

export default function FrmCarteira() {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const navigation = useNavigation();

    const [descricao, setDescricao] = useState('');
    const [isCredito, setIsCredito] = useState(true);
    const [tiposCarteiras, setTiposCarteiras] = useState();
    const [selectedTipoCarteira, setSelectedTipoCarteira] = useState(0);
    const [erroDescricao, setErroDescricao] = useState('');


    async function ObterTipoCarteira() {
        await api.get("carteira/obter-tipo-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            setTiposCarteiras(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de carteira");
        });
    }

    function HabilitarOpcoes(itemValue) {
        setSelectedTipoCarteira(itemValue);

        if (tiposCarteiras[itemValue].descricao == 'CRÉDITO')
            setIsCredito(true);
        else
            setIsCredito(false);
    }

    function IsValid() {
        if (descricao == '') {
            setErroDescricao("Campo descrição não pode ser vazio.")
        }

        IncluirTipoCarteira();
    }

    async function IncluirTipoCarteira() {
        await api.post("carteira/incluir-tipo-carteira", {
            Descricao: descricao,
            Usuario: usuario.codigo,
            TipoCarteira: tiposCarteiras[selectedTipoCarteira].codigo
        }, {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            if (response.data)
            {
                ExibirValor(!exibirValor);
                ExibirValor(exibirValor);
                navigation.goBack();
            }
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
            return false;
        });
    }

    useEffect(() => {
        ObterTipoCarteira();
    }, []);

    return (
        <Background>
            <Container>
                <AreaCadastro>

                    <Texto>Tipo da Carteira</Texto>
                    <Picker
                        selectedValue={selectedTipoCarteira}
                        onValueChange={(itemValue, itemIndex) => HabilitarOpcoes(itemValue)}
                    >
                        {
                            tiposCarteiras != null
                                ?
                                tiposCarteiras.map((value, key) => {
                                    return <Picker.Item key={key} value={key} label={value.descricao} />
                                })
                                :
                                <Row />
                        }
                    </Picker>
                    <Row></Row>

                    {isCredito == true
                        ?
                        <View>
                            <Texto>Data Vencimento da Fatura</Texto>
                            <InputMenor
                                keyboardType='numeric'
                                placeholder={"0/mês"}
                            />

                            <Texto>Data Fechamento da Fatura</Texto>
                            <InputMenor
                                keyboardType='numeric'
                                placeholder={"0/mês"}
                            />
                        </View>
                        :
                        <View />
                    }

                    <Texto>Descrição</Texto>
                    <Input
                        onChangeText={(text) => {
                            setDescricao(text)
                            setErroDescricao('')
                        }}
                        placeholder={"Descrição"}
                        style={[
                            erroDescricao != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    {erroDescricao != '' ? <Erro>{erroDescricao}</Erro> : <View />}

                    <BtnEntrar onPress={() => IsValid()}><TxtEntrar>Cadastrar</TxtEntrar></BtnEntrar>
                </AreaCadastro>
            </Container>
        </Background>
    );
}

const styles = StyleSheet.create({
    styleErro: {
        borderWidth: 1,
        borderColor: '#e60000',
        borderRadius: 4
    },
    styleInput: {
        borderColor: '##333'
    }
})