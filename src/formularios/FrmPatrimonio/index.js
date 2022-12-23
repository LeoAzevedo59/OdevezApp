//#region imports

import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, Switch } from 'react-native';
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
    Div,
    Data,
    Row,
    Erro,
    H2,
    Span
} from './styles';

import api from '../../contexts/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import ComponenteVazio from '../../components/ComponenteVazio';

//#endregion

export default function FrmPatrimonio() {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const navigation = useNavigation();

    const [date, setDate] = useState(new Date());
    const [dateFormat, setDateFormat] = useState(date.getDate().toString() + '/' + (parseInt(date.getMonth() + 1)).toString() + '/' + date.getFullYear().toString());
    const [show, setShow] = useState(false);
    const [carteiras, setCarteiras] = useState();
    const [selectedCarteira, setSelectedCarteira] = useState(0);
    const [movimentacoes, setMovimentacoes] = useState();
    const [selectedMovimentacao, setSelectedMovimentacao] = useState(0);
    const [categorias, setCategorias] = useState();
    const [selectedCategoria, setSelectedCategoria] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroValor, setErroValor] = useState("");
    const [efetivado, setEfetivado] = useState(true);
    const [status, setStatus] = useState(1);

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
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
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
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
        });
    }

    async function ObterDescricaoCategorias() {
        await api.get("carteira/obter-categoria-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        }).then((response) => {
            setCategorias(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
        });
    }

    async function IncluirMovimentacao() {
        await api.post("extrato/incluir-movimentacao-carteira", {
            DataCriacao: dateFormat,
            Descricao: descricao,
            Valor: valor,
            Status: status,
            Movimentacao: {
                Codigo: movimentacoes[selectedMovimentacao].codigo,
                Descricao: movimentacoes[selectedMovimentacao].descricao
            },
            Carteira: {
                Codigo: carteiras[selectedCarteira].codigo,
                Descricao: carteiras[selectedCarteira].descricao
            },
            Categoria: {
                Codigo: categorias[selectedCategoria].codigo,
                Descricao: categorias[selectedCategoria].descricao,
                Usuario: usuario.codigo,
            }
        }, {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            if (response.data) {
                Keyboard.dismiss();
                ExibirValor(!exibirValor);
                ExibirValor(exibirValor);
                navigation.goBack();
            }
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
            return false;
        });
    }

    function IsValid() {
        if (descricao == '') {
            setErroDescricao("Campo descrição não pode ser vazio.")
        }
        if (valor == '') {
            setErroValor("Campo valor não pode ser vazio.")
        }

        if (descricao != '' && valor != '')
            IncluirMovimentacao();
    }

    function AltStatus() {
        if (status === 1)
            setStatus(2)
        else
            setStatus(1)
        console.log(status);
        setEfetivado(!efetivado)
    }

    useEffect(() => {
        ObterDescricaoCarteiras();
        ObterDescricaoMovimentacoes();
        ObterDescricaoCategorias();
    }, [])

    useEffect(() => {
        ObterDescricaoCarteiras();
        ObterDescricaoMovimentacoes();
        ObterDescricaoCategorias();
    }, [exibirValor])

    return (
        <Background>
            {carteiras == ''
                ?
                <Container>
                    <ComponenteVazio componente="Carteira" link="FrmCarteira" />
                </Container>
                :
                <Container>
                    <AreaCadastro>

                        <Texto>Valor</Texto>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='numeric'
                            placeholder={"0.00"}
                            onChangeText={(text) => {
                                setValor(text)
                                setErroValor('')
                            }}
                            style={[
                                erroValor != '' ? styles.styleErro : styles.styleInput
                            ]}
                        />
                        {erroValor != '' ? <Erro>{erroValor}</Erro> : <View />}

                        <Texto>Status</Texto>

                        <Span>
                            <H2>
                                {efetivado === true ? "Efetivado" : "Pendente"}
                            </H2>

                            <Switch
                                value={efetivado}
                                onValueChange={(valor) => AltStatus()}
                                thumbColor="yellow"
                                trackColor={{ false: "gray", true: "#FFD700" }}
                            />
                        </Span>

                        <Texto>Transação</Texto>
                        <Picker
                            selectedValue={selectedMovimentacao}
                            onValueChange={(itemValue, itemIndex) => setSelectedMovimentacao(itemValue)}
                            style={{ fontSize: 16 }}
                        >
                            {
                                movimentacoes != null
                                    ?
                                    movimentacoes.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
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
                                    carteiras.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
                                    })
                                    :
                                    <Row />
                            }
                        </Picker>
                        <Row></Row>

                        <Texto>Categoria</Texto>
                        <Picker
                            selectedValue={selectedCategoria}
                            onValueChange={(itemValue, itemIndex) => setSelectedCategoria(itemValue)}
                        >
                            {
                                categorias != null
                                    ?
                                    categorias.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
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
            }
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
        borderColor: '#333'
    }
})