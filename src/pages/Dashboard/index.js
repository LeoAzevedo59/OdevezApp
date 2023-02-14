//#region Imports
import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { VictoryPie } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../contexts/auth';
import api from '../../contexts/api';
import LblDashCategoria from '../../components/LblDashCategoria';

import {
    Background,
    Title,
    Head,
    Header,
    Texto,
    ContainerData,
    ContainerMovimentacao,
    Row,
    TxtTotal

} from './styles';
//#endregion

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
    const { usuario, exibirValor } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [selectedMovimentacao, SetSelectedMovimentacao] = useState(0);
    const [showStart, setStartShow] = useState(false);
    let d = new Date();
    d.setMonth(0);
    const [dateStart, setDateStart] = useState(new Date(d));
    const [showEnd, setEndShow] = useState(false);
    const [dateEnd, setDateEnd] = useState(new Date());

    const [dateStartFormat, setDateStartFormat] = useState(dateStart.getDate().toString() + '/' + (parseInt(dateStart.getMonth() + 1)).toString() + '/' + dateStart.getFullYear().toString());
    const [filtroDateStartFormat, setFiltroDateStartFormat] = useState(dateStart.getFullYear().toString() + '/' + (parseInt(dateStart.getMonth() + 1)).toString() + '/' + dateStart.getDate().toString());
    const [dateEndFormat, setDateEndFormat] = useState(dateEnd.getDate().toString() + '/' + (parseInt(dateEnd.getMonth() + 1)).toString() + '/' + dateEnd.getFullYear().toString());
    const [FiltroDateEndFormat, setFiltroDateEndFormat] = useState(dateEnd.getFullYear().toString() + '/' + (parseInt(dateEnd.getMonth() + 1)).toString() + '/' + dateEnd.getDate().toString());

    async function ObterDashboardPizza() {
        await api.post("extrato/obter-dashboard-pizza", {
            DataInicio: new Date(filtroDateStartFormat),
            DataFim: new Date(FiltroDateEndFormat),
            Movimentacao: selectedMovimentacao,
            Usuario: usuario.codigo,
        }, {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            setData(response.data.dados);
            setValorTotal(response.data.valorTotal);
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
            setFiltroDateStartFormat(selectedDateStart.getFullYear().toString() + '/' + (parseInt(selectedDateStart.getMonth() + 1)).toString() + '/' + selectedDateStart.getDate().toString())
        }
    }

    const onChangeEnd = (event, selectedDateEnd, alt) => {
        if (showEnd == false && alt !== true)
            setEndShow(true)
        else {
            setEndShow(false)
            setDateEnd(selectedDateEnd);
            setDateEndFormat(selectedDateEnd.getDate().toString() + '/' + (parseInt(selectedDateEnd.getMonth() + 1)).toString() + '/' + selectedDateEnd.getFullYear().toString())
            setFiltroDateEndFormat(selectedDateEnd.getFullYear().toString() + '/' + (parseInt(selectedDateEnd.getMonth() + 1)).toString() + '/' + selectedDateEnd.getDate().toString())
        }
    }

    function ValidarData() {
        var dtI = new Date(dateStartFormat.split('/').reverse().join('/'));
        var dtF = new Date(dateEndFormat.split('/').reverse().join('/'));

        if (dtI >= dtF) {

            alert('Data início deve ser menor que a data Fim');

            const dataFim = new Date();
            const d = new Date();
            const dataInicio = new Date(d.setMonth(0));

            setDateStart(dataInicio);
            setDateStartFormat(dataInicio.getDate().toString() + '/' + (parseInt(dataInicio.getMonth() + 1)).toString() + '/' + dataInicio.getFullYear().toString());
            setFiltroDateStartFormat(dataInicio.getFullYear().toString() + '/' + (parseInt(dataInicio.getMonth() + 1)).toString() + '/' + dataInicio.getDate().toString());

            setDateEnd(dataFim);
            setDateEndFormat(dataFim.getDate().toString() + '/' + (parseInt(dataFim.getMonth() + 1)).toString() + '/' + dataFim.getFullYear().toString());
            setFiltroDateEndFormat(dataFim.getFullYear().toString() + '/' + (parseInt(dataFim.getMonth() + 1)).toString() + '/' + dataFim.getDate().toString());

            ObterDashboardPizza();
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (ValidarData())
            ObterDashboardPizza();

    }, [dateStart, dateEnd, selectedMovimentacao, exibirValor]);

    return (
        <SafeAreaView style={{ backgroundColor: '#FBFBFB' }}>
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
                    height={200}
                    colorScale={data.map(exprense => exprense.cor)}
                    innerRadius={80}
                    style={{
                        labels: {
                            display: 'none'
                        }
                    }}
                />

                {data.length !== 0
                    ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TxtTotal>Total</TxtTotal><Texto style={{ marginLeft: 16 }}>R$ {valorTotal.toFixed(2)}</Texto>
                    </View>
                    :
                    <></>
                }


                <FlatList
                    keyExtractor={(item) => item.codigo}
                    data={data}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <LblDashCategoria data={item} />}
                />
            </Background>

        </SafeAreaView >
    )
}

