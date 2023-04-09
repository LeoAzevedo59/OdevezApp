import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { SomenteNumero } from '../../components/Mascara';
import {
    MaterialIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import {
    Container,
    ContainerInput,
    IconeInput,
    Input,
    InputFull,
    ContainerTaxa,
    Texto,
    Botao,
    TextoBotao,
    AreaInput,
    ContainerValue,
    LblLimpar
} from './styles';

const PERIODO = [
    { codigo: 0, tipo: 'Mês' },
    { codigo: 1, tipo: 'Anual' }
];

import { FormatReais } from '../../components/Mascara'
import LblDashCategoria from '../../components/LblDashCategoria';

export default function CalcJurosCompostosAporteMensal() {
    const [selectedTaxa, setSelectedTaxa] = useState(0);
    const [selectedPeriodo, setSelectedPeriodo] = useState(0);
    const [valorInicial, setValorInicial] = useState(0);
    const [valorMensal, setValorMensal] = useState(0);
    const [taxa, setTaxa] = useState(0);
    const [periodo, setPeriodo] = useState(0);
    const [resultado, setResultado] = useState([]);

    function Limpar() {
        setResultado([]);
        setValorInicial(0);
        setValorMensal(0);
        setTaxa(0);
        setPeriodo(0);
    }

    function CalcularJurosCompostos() {

        const periodoData = selectedPeriodo == 0 ? periodo : periodo * 12.0;
        const taxaData = selectedTaxa == 0 ? taxa : taxa / 12.0;

        var resultado = valorInicial * Math.pow(1 + (taxaData / 100.0), periodoData) +
            valorMensal * (Math.pow(1 + (taxaData / 100.0), periodoData) - 1.0) / (taxaData / 100.0);

        var totalInvestido = parseFloat(valorMensal) * parseFloat(periodoData) + parseFloat(valorInicial);
        var totalFinal = resultado;
        var totalJuros = parseFloat(resultado) - totalInvestido;

        const RESULT = [
            {
                categoria: 'INVESTIMENTO',
                cor: '#FFDC5F',
                valor: FormatReais(totalInvestido)
            },
            {
                categoria: 'VALOR FINAL',
                cor: '#975FFF',
                valor: FormatReais(totalFinal)
            },
            {
                categoria: 'JUROS',
                cor: '#55FF85',
                valor: FormatReais(totalJuros)
            }
        ];

        setResultado(RESULT);
    }

    return (
        <Container>

            <AreaInput
                showsVerticalScrollIndicator={false}>

                <Texto>Valor inicial</Texto>
                <ContainerInput>
                    <IconeInput>
                        <MaterialIcons name="attach-money" size={24} color="#333" />
                    </IconeInput>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder={"0,00"}
                        value={valorInicial}
                        onChangeText={(text) => {
                            setValorInicial(text)
                        }}
                    />
                </ContainerInput>

                <Texto>Valor mensal</Texto>
                <ContainerInput>
                    <IconeInput>
                        <MaterialIcons name="attach-money" size={24} color="#333" />
                    </IconeInput>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder={"0,00"}
                        value={valorMensal}
                        onChangeText={(text) => {
                            setValorMensal(text)
                        }}
                    />
                </ContainerInput>

                <Texto>Taxa de juros</Texto>
                <ContainerInput>
                    <IconeInput>
                        <MaterialCommunityIcons name="percent" size={24} color="#333" />
                    </IconeInput>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder={"0,00"}
                        value={taxa}
                        onChangeText={(text) => {
                            setTaxa(text)
                        }}
                    />
                    <ContainerTaxa>
                        <Picker
                            selectedValue={selectedTaxa}
                            onValueChange={(itemValue, itemIndex) => setSelectedTaxa(itemValue)}
                        >
                            {

                                PERIODO.map((value, key) => {
                                    return <Picker.Item key={key} value={key} label={value.tipo} />
                                })
                            }
                        </Picker>
                    </ContainerTaxa>
                </ContainerInput>

                <Texto>Período em</Texto>
                <ContainerInput>
                    <InputFull
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder={"0"}
                        value={periodo}
                        onChangeText={(text) => {
                            setPeriodo(SomenteNumero(text))
                        }}
                    />
                    <ContainerTaxa>
                        <Picker
                            selectedValue={selectedPeriodo}
                            onValueChange={(itemValue, itemIndex) => setSelectedPeriodo(itemValue)}
                        >
                            {
                                PERIODO.map((value, key) => {
                                    return <Picker.Item key={key} value={key} label={value.tipo} />
                                })
                            }
                        </Picker>
                    </ContainerTaxa>
                </ContainerInput>

                <ContainerValue>
                    {
                        resultado.map((value, key) => {
                            return <LblDashCategoria key={key} data={value} exibirValor={true}/>
                        })
                    }
                </ContainerValue>

                <Botao onPress={() => CalcularJurosCompostos()}>
                    <TextoBotao>Calcular</TextoBotao>
                </Botao>

                <LblLimpar onPress={() => Limpar()} style={{ alingText: 'center' }}>
                    Limpar
                </LblLimpar>
            </AreaInput>
        </Container >
    );
}