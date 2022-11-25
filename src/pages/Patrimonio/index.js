import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';

import {
    Background,
    Container,
    Input,
    Texto,
    AreaCadastro,
    TxtEntrar,
    BtnEntrar,
    Div,
    Data,
    Row
} from './styles';

import api from '../../contexts/api';

export default function Patrimonio() {
    const { usuario } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [dateFormat, setDateFormat] = useState(date.getDate().toString() + '/' + (parseInt(date.getMonth() + 1)).toString() + '/' + date.getFullYear().toString());
    const [show, setShow] = useState(false);
    const [carteiras, setCarteiras] = useState();
    const [selectedCarteira, setSelectedCarteira] = useState();
    const [movimentacoes, setMovimentacoes] = useState();
    const [selectedMovimentacao, setSelectedMovimentacao] = useState(0);

    const onChange = (event, selectedDate) => {

        if (show == false)
            setShow(true)
        else {
            setShow(false)
            setDate(selectedDate);
            setDateFormat(selectedDate.getDate().toString() + '/' + (parseInt(selectedDate.getMonth() + 1)).toString() + '/' + selectedDate.getFullYear().toString())
        }
    }

    const showDatePicker = () => {
        if (show == false)
            setShow(true)
        else
            setShow(false)
    };

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
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Home");
        });
    }

    async function ObterDescricaoMovimentacoes() {
        await api.get("carteira/obter-movimentacao-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            setMovimentacoes(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Home");
        });
    }

    useEffect(() => {
        ObterDescricaoCarteiras();
        ObterDescricaoMovimentacoes();
    }, [])

    return (
        <Background>
            <Container>
                <AreaCadastro>

                    <Texto>Modalidade</Texto>
                    <Picker
                        selectedValue={selectedMovimentacao}
                        onValueChange={(itemValue, itemIndex) => setSelectedMovimentacao(itemValue)}
                    >
                        {
                            movimentacoes != null
                                ?
                                movimentacoes.map((v, k) => {
                                    return <Picker.Item key={k} value={k} label={v.descricao} />
                                })
                                :
                                <Row />
                        }
                    </Picker>
                    <Row></Row>

                    <Texto>Carteira</Texto>
                    <Picker
                        selectedValue={selectedCarteira}
                        onValueChange={(itemValue, itemIndex) => setSelectedCarteira(itemValue)}
                    >
                        {
                            carteiras != null
                                ?
                                carteiras.map((v, k) => {
                                    return <Picker.Item key={k} value={k} label={v.descricao} />
                                })
                                :
                                <Row />
                        }
                    </Picker>
                    <Row></Row>

                    <Texto>Data de movimentação</Texto>
                    <Div onPress={showDatePicker}><Data>{dateFormat}</Data></Div>
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            locale="pt-BR"
                        />
                    )}
                    <Texto>Descrição</Texto>
                    <Input
                        placeholder={"Descrição"}
                    />

                    <Texto>Valor</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder={"0.00"}
                    />

                    <BtnEntrar><TxtEntrar>Cadastrar</TxtEntrar></BtnEntrar>
                </AreaCadastro>
            </Container>
        </Background>
    );
}