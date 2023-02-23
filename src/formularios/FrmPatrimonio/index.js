//#region imports

import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, Switch, ActivityIndicator, Text } from 'react-native';
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
    Span,
    Icon
} from './styles';

import {
    MaterialIcons
} from '@expo/vector-icons';

import api from '../../contexts/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import ComponenteVazio from '../../components/ComponenteVazio';

//#endregion

export default function FrmPatrimonio({ route }) {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const navigation = useNavigation();

    const [date, setDate] = useState(new Date());
    const [dateFormat, setDateFormat] = useState(date.getDate().toString() + '/' + (parseInt(date.getMonth() + 1)).toString() + '/' + date.getFullYear().toString());
    const [show, setShow] = useState(false);
    const [carteiras, setCarteiras] = useState();
    const [selectedCarteira, setSelectedCarteira] = useState(0);
    const [movimentacoes, setMovimentacoes] = useState();
    const [selectedMovimentacao, setSelectedMovimentacao] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [categoriasBkp, setCategoriasBkp] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [erroValor, setErroValor] = useState('');
    const [efetivado, setEfetivado] = useState(true);
    const [status, setStatus] = useState(1);
    const [txtBtn, setTxtBtn] = useState('');
    const [alterar, setAlterar] = useState(false);
    const [codExtrato, setCodExtrato] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pressButton, setPressButton] = useState(false);
    const [corExpandMore, setCorExpandMore] = useState('red');

    const onChange = (event, selectedDate, alt) => {

        if (show == false && alt !== true)
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
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio - ObterDescricaoCarteiras()");
        });
    }

    async function ObterDescricaoMovimentacoes() {
        await api.get("carteira/obter-movimentacao-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {

            response.data.sort(function (obj1, obj2) {
                return obj1.descricao > obj2.descricao ? -1 :
                    (obj1.descricao < obj2.descricao ? 1 : 0);
            });

            setMovimentacoes(response.data);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio - ObterDescricaoMovimentacoes()");
        });
    }

    async function AlterarAsync(codExtratoAlt) {
        setAlterar(true);

        const retornoExtrato = await api.get("extrato/obter-extrato-por-codigo", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                extrato: codExtratoAlt
            }
        });

        setCodExtrato(retornoExtrato.data.codigo);
        setDescricao(retornoExtrato.data.descricao.toString());
        setStatus(retornoExtrato.data.status);

        let data = retornoExtrato.data.dataCriacao.toString("yyyy-MM-dd HH:mm:ss").substring(0, 10).split('/');
        data = data[1] + '/' + data[0] + '/' + data[2]
        data = new Date(data);
        data.setDate(data.getDate());
        onChange(null, data, true);

        const retornoCarteiras = await api.get("carteira/obter-descricao-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        });

        const retornoMovimentacoes = await api.get("carteira/obter-movimentacao-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        });

        const retornoCategorias = await api.get("carteira/obter-categoria-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        });

        retornoExtrato.data.valor > 0
            ? setValor(retornoExtrato.data.valor.toString())
            : setValor((retornoExtrato.data.valor * -1).toString())

        if (retornoExtrato.data.status === 1)
            setEfetivado(true);
        else if (retornoExtrato.data.status === 2)
            setEfetivado(false);

        setMovimentacoes(retornoMovimentacoes.data);

        for (let x = 0; x < retornoMovimentacoes.data.length; x++) {
            if (retornoExtrato.data.movimentacao.codigo === retornoMovimentacoes.data[x].codigo)
                setSelectedMovimentacao(x);
        }

        setCarteiras(retornoCarteiras.data);

        for (let x = 0; x < retornoCarteiras.data.length; x++) {
            if (retornoExtrato.data.carteira.codigo === retornoCarteiras.data[x].codigo)
                setSelectedCarteira(x);
        }

        setCategorias(retornoCategorias.data);

        for (let x = 0; x < retornoCategorias.data.length; x++) {
            if (retornoExtrato.data.categoria.codigo === retornoCategorias.data[x].codigo)
                setSelectedCategoria(x);
        }

        setIsLoading(false);
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
            setCategoriasBkp(response.data);

            let categoriasSaida = [];

            response.data.map((value, key) => {
                if (value.movimentacao === 2)
                    categoriasSaida.push(value);
            });

            categoriasSaida.sort(function (obj1, obj2) {
                return obj1.descricao < obj2.descricao ? -1 :
                    (obj1.descricao > obj2.descricao ? 1 : 0);
            });

            setCategorias(categoriasSaida);

        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
        });
        setIsLoading(false);
    }

    async function IncluirExtrato() {
        await api.post("extrato/incluir-movimentacao-carteira", {
            DataCriacao: dateFormat,
            Descricao: descricao === '' ? categorias[selectedCategoria].descricao : descricao,
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

    async function AlterarExtrato() {
        setIsLoading(true);

        await api.put("extrato/alterar", {
            Codigo: codExtrato,
            DataCriacao: dateFormat,
            Descricao: descricao === '' ? categorias[selectedCategoria].descricao : descricao,
            Valor: valor,
            Status: status,
            Movimentacao: {
                Codigo: movimentacoes[selectedMovimentacao].codigo
            },
            Carteira: {
                Codigo: carteiras[selectedCarteira].codigo
            },
            Categoria: {
                Codigo: categorias[selectedCategoria].codigo
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
            console.log(error.response.status + " Componente: Alteração de patrimonio");
            return false;
        });
    }

    function IsValid() {
        setPressButton(true);

        if (valor == '') {
            setPressButton(false);
            setErroValor("Campo valor não pode ser vazio.")
        }

        if (valor != '' && alterar)
            AlterarExtrato();
        else
            IncluirExtrato();
    }

    const getContent = () => {
        if (isLoading)
            return <ActivityIndicator size="large" />
    }

    function AltStatus() {
        if (status === 1)
            setStatus(2)
        else
            setStatus(1)

        setEfetivado(!efetivado)
    }

    function onValueChangeMovimentacao(itemValue) {
        itemValue = itemValue === 1 ? 1 : 2;
        itemValue === 1 ? setCorExpandMore('green') : setCorExpandMore('red')
        let categoriasSaida = [];

        categoriasBkp.map((value, key) => {
            if (value.movimentacao === itemValue)
                categoriasSaida.push(value);
        });

        categoriasSaida?.sort(function (obj1, obj2) {
            return obj1.descricao < obj2.descricao ? -1 :
                (obj1.descricao > obj2.descricao ? 1 : 0);
        });

        setCategorias(categoriasSaida);
        setSelectedMovimentacao(itemValue)
    }

    useEffect(() => {
        if (route.params !== undefined) {
            AlterarAsync(route.params.extrato);
            setTxtBtn('Salvar');
        }
        else {
            ObterDescricaoCarteiras();
            ObterDescricaoMovimentacoes();
            ObterDescricaoCategorias();
            setTxtBtn('Cadastrar');
        }
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
                    {isLoading === false
                        ?
                        <AreaCadastro>

                            <Texto>Valor</Texto>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder={"0.00"}
                                    value={valor}
                                    onChangeText={(text) => {
                                        setValor(text)
                                        setErroValor('')
                                    }}
                                    style={[
                                        erroValor != '' ? styles.styleErro : styles.styleInput
                                    ]}
                                />
                                <Icon>
                                    <MaterialIcons name="expand-more" size={24} color={corExpandMore} />
                                </Icon>
                            </View>
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
                                onValueChange={(itemValue, itemIndex) => onValueChangeMovimentacao(itemValue)}
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
                                value={descricao}
                                onChangeText={(text) => {
                                    setDescricao(text)
                                }}
                                placeholder={"Descrição"}
                            />
                            <BtnEntrar disabled={pressButton} onPress={() => IsValid()}><TxtEntrar>{txtBtn}</TxtEntrar></BtnEntrar>
                        </AreaCadastro>
                        :
                        getContent()
                    }
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