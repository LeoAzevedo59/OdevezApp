//#region Imports
import React, { useState, useEffect, useContext } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { VictoryPie, VictoryArea, VictoryLine } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../contexts/auth';
import api from '../../contexts/api';
import {
    Background,
    Title,
    Head,
    H1,
    Header,
    ContainerCategoria,
    Cor,
    TxtDinheiro,
    ContainerTextoCategoria,
    Texto,
    ContainerData,
    ContainerMovimentacao,
    Row
} from './styles';
//#endregion

const EXPRESS = {
    'Janeiro': [
        {
            id: "1",
            label: "Alimentação",
            value: 982.00,
            color: "#975FFF"
        },
        {
            id: "2",
            label: "Transporte",
            value: 388,
            color: "#FF8555"
        },
        {
            id: "3",
            label: "Lazer",
            value: 280,
            color: "#55FF85"
        }
    ]
}

const MOVIMENTACAO = [
    {
        codigo: 0,
        descricao: 'TODOS'
    }, {
        codigo: 1,
        descricao: 'ENTRADA'
    },
    {
        codigo: 2,
        descricao: 'SAIDA'
    }
]

export default function Dashboard() {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedMovimentacao, SetSelectedMovimentacao] = useState(0);
    const [showStart, setStartShow] = useState(false);
    let d = new Date();
    d.setMonth(0);
    const [dateStart, setDateStart] = useState(new Date(d));
    const [dateStartFormat, setDateStartFormat] = useState(dateStart.getDate().toString() + '/' + (parseInt(dateStart.getMonth() + 1)).toString() + '/' + dateStart.getFullYear().toString());
    const [showEnd, setEndShow] = useState(false);
    const [dateEnd, setDateEnd] = useState(new Date());
    const [dateEndFormat, setDateEndFormat] = useState(dateEnd.getDate().toString() + '/' + (parseInt(dateEnd.getMonth() + 1)).toString() + '/' + dateEnd.getFullYear().toString());

    async function ObterDashboardPizza() {
        await api.post("extrato/obter-dashboard-pizza", {
            DataInicio: new Date(dateStartFormat),
            DataFim: new Date(dateEndFormat),
            Movimentacao: selectedMovimentacao,
            Usuario: usuario.codigo,
        }, {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
        }).catch(function (error) {
            console.log(error + " Componente: Dashboard - ObterDashboardPizza()");
            return false;
        });
        
    }

    const showDateStartPicker = () => {
        if (showStart == false)
            setStartShow(true)
        else
            setStartShow(false)
    }

    const showDateEndPicker = () => {
        if (showEnd == false)
            setEndShow(true)
        else
            setEndShow(false)
    }

    const onChangeStart = (event, selectedDateStart, alt) => {
        if (showStart == false && alt !== true)
            setStartShow(true)
        else {
            setStartShow(false)
            setDateStart(selectedDateStart);
            setDateStartFormat(selectedDateStart.getDate().toString() + '/' + (parseInt(selectedDateStart.getMonth() + 1)).toString() + '/' + selectedDateStart.getFullYear().toString())
        }
    }

    const onChangeEnd = (event, selectedDateEnd, alt) => {
        if (showEnd == false && alt !== true)
            setEndShow(true)
        else {
            setEndShow(false)
            setDateEnd(selectedDateEnd);
            setDateEndFormat(selectedDateEnd.getDate().toString() + '/' + (parseInt(selectedDateEnd.getMonth() + 1)).toString() + '/' + selectedDateEnd.getFullYear().toString())
        }
    }

    useEffect(() => {
        ObterDashboardPizza();
    }, [selectedMovimentacao]);

    return (
        <SafeAreaView style={{ backgroundColor: '#FBFBFB', flex: 1 }}>
            <Background>
                <Head>
                    <Title>Receitas & Despesas</Title>
                    <Header>
                        <ContainerMovimentacao>
                            <Picker
                                selectedValue={selectedMovimentacao}
                                onValueChange={(itemValue) => SetSelectedMovimentacao(itemValue)}
                                style={{ width: 135 }}
                            >
                                {
                                    MOVIMENTACAO.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
                                    })
                                }
                            </Picker>
                        </ContainerMovimentacao>
                        <ContainerData>
                            <Row>
                                <Texto style={{ fontWeight: 'bold' }}>Inicio</Texto>
                                <TouchableOpacity onPress={showDateStartPicker}><Text>{dateStartFormat}</Text></TouchableOpacity>
                                {showStart && (
                                    <DateTimePicker
                                        value={dateStart}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeStart}
                                        locale="pt-BR"
                                    />
                                )}
                            </Row>
                            <Row>
                                <Texto style={{ fontWeight: 'bold' }}>Fim</Texto>
                                <TouchableOpacity onPress={showDateEndPicker}><Text>{dateEndFormat}</Text></TouchableOpacity>
                                {showEnd && (
                                    <DateTimePicker
                                        value={dateEnd}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeEnd}
                                        locale="pt-BR"
                                    />
                                )}
                            </Row>
                        </ContainerData>
                    </Header>
                </Head>

                <VictoryPie
                    data={data}
                    x="descricao"
                    y="valor"
                    colorScale={data.map(exprense => exprense.cor)}
                    innerRadius={80}
                    style={{
                        labels: {
                            display: 'none'
                        }
                    }}
                />

                <ContainerCategoria>
                    <Cor />
                    <ContainerTextoCategoria>
                        <H1>Alimentação</H1>
                        <TxtDinheiro>R$ -982.00</TxtDinheiro>
                    </ContainerTextoCategoria>
                </ContainerCategoria>

            </Background>

        </SafeAreaView>
    )
}

