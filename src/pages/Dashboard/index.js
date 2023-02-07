//#region Imports
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { VictoryPie, VictoryArea, VictoryLine } from 'victory-native';
import {
    Background,
    Title,
    ContainerData,
    Texto,
    Div,
    ContainerCategoria,
    Cor,
    TxtDinheiro,
    ContainerTextoCategoria
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

export default function Dashboard() {
    const [mes, setMes] = useState("Janeiro");
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(EXPRESS[mes]);
    }, [mes]);

    return (
        <SafeAreaView style={{ backgroundColor: '#FBFBFB', flex: 1 }}>
            <Background>
                <ContainerData>
                    <Title>Receitas & Despesas</Title>
                    <Div>
                        <Picker></Picker>
                    </Div>
                </ContainerData>

                <VictoryPie
                    data={data}
                    x="label"
                    y="value"
                    colorScale={data.map(exprense => exprense.color)}
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
                        <Texto>Alimentação</Texto>
                        <TxtDinheiro>R$ -982.00</TxtDinheiro>
                    </ContainerTextoCategoria>
                </ContainerCategoria>
                <ContainerCategoria>
                    <Cor style={{backgroundColor: "#FF8555"}}/>
                    <ContainerTextoCategoria>
                        <Texto>Transporte</Texto>
                        <TxtDinheiro>R$ -388.00</TxtDinheiro>
                    </ContainerTextoCategoria>
                </ContainerCategoria>
            </Background>

        </SafeAreaView>
    )
}

