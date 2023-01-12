//#region imports

import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import { GestureHandlerRootView, RotationGestureHandler } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

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
    InputMenor,
    InputData,
    FlexDirectionRow,
    ContainerData,
    ContainerBtnData
} from './styles';

import api from '../../contexts/api';
import CheckBox from '../../components/Checkbox';
import LblDataBall from '../../components/LblDataBall';

//#endregion

let dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var dataBKP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

const TipoCarteiraEnum = {
    Nenhum: '0',
    Credito: '1',
    Conta_Corrente: '2',
    Poupanca: '3',
    Cedula: '4',
    Outro: '5'
};

const TipoDataEnum = {
    Data_Vencimento: '1',
    Data_Fechamento: '2',
};

export default function FramCarteira() {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const navigation = useNavigation();
    const modalizeRef = useRef(null);

    const [descricao, setDescricao] = useState('');
    const [tiposCarteiras, setTiposCarteiras] = useState(null);
    const [selectedTipoCarteira, setSelectedTipoCarteira] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [exibirHomeIsChecked, setExibirHomeIsChecked] = useState(false);
    const [naoSomaPatrimonioIsChecked, setNaoSomaPatrimonioIsChecked] = useState(false);
    const [valorInicial, setValorInicial] = useState(0);
    const [dataVencimento, setDataVencimento] = useState(0);
    const [dataFechamento, setDataFechamento] = useState(0);
    const [tipoData, setTipoData] = useState(0);
    const [data, setData] = useState(dataArray);


    const [erroDescricao, setErroDescricao] = useState('');
    const [erroTipoCarteira, setErroTipoCarteira] = useState('');
    const [erroDataVencimento, setErroDataVencimento] = useState('');
    const [erroDataFechamento, setErroDataFechamento] = useState('');

    async function ObterTipoCarteira() {
        await api.get("carteira/obter-tipo-carteira", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            }
        }).then((response) => {
            const array = [{
                codigo: 0,
                descricao: 'NENHUM'
            }]

            const jun = [...array, ...response.data]
            setTiposCarteiras(jun);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de carteira - ObterTipoCarteira()");
        });
    }

    function onOpen(value) {

        if (value.toString() === TipoDataEnum.Data_Fechamento && dataVencimento <= 0) {
            alert('Preencha primeiro o vencimento da fatura.')
            return;
        }

        if (value.toString() === TipoDataEnum.Data_Fechamento && dataVencimento > 0) {
            setErroDataFechamento('');
            data.splice(dataVencimento - 1, 28);
        }

        if (value.toString() === TipoDataEnum.Data_Vencimento) {
            setErroDataVencimento('');
            data.splice(0, 28);

            var newData = data.concat(dataBKP);
            setData(newData);
        }

        setTipoData(value);
        modalizeRef.current?.open();
    }

    function HabilitarOpcoes(itemValue) {
        setSelectedTipoCarteira(itemValue);
        LimparCampos();
    }

    function AltData(value) {
        if (tipoData.toString() === TipoDataEnum.Data_Vencimento)
            setDataVencimento(value);
        else if (tipoData.toString() === TipoDataEnum.Data_Fechamento)
            setDataFechamento(value);

        modalizeRef.current?.close();
    }

    function IsValid() {
        setIsLoading(true);

        if (selectedTipoCarteira.toString() === TipoCarteiraEnum.Nenhum) {
            setErroTipoCarteira("Selecione um tipo de Carteira");
            setIsLoading(false);
            return;
        }

        if (descricao == '') {
            setErroDescricao("Campo descrição não pode ser vazio.")
            setIsLoading(false);
            return;
        }

        if (selectedTipoCarteira.toString() === TipoCarteiraEnum.Credito || selectedTipoCarteira.toString() === TipoCarteiraEnum.Credito) {
            if (dataVencimento === 0) {
                setErroDataVencimento('Dia incorreto');
                setIsLoading(false);
                return;
            }

            if (dataFechamento === 0) {
                setErroDataFechamento('Dia incorreto');
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(false);
        IncluirTipoCarteira();
    }

    function chkExibirHome() {
        setExibirHomeIsChecked(!exibirHomeIsChecked);
    }

    function chkNaoSomarPatrimonio() {
        setNaoSomaPatrimonioIsChecked(!naoSomaPatrimonioIsChecked);
    }

    function LimparCampos() {
        setErroDataFechamento('');
        setErroDataVencimento('');
        setErroDescricao('');
        setErroTipoCarteira('');
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
            if (response.data) {
                ExibirValor(!exibirValor);
                ExibirValor(exibirValor);
                navigation.goBack();
            }
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de carrteira - IncluirTipoCarteira()");
            return false;
        });
    }

    const getContent = () => {
        if (isLoading)
            return <ActivityIndicator size="large" />
    }

    const inputDescricao = () => {
        return (
            <View>
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
            </View>
        );
    }

    const inputVlrInicial = () => {
        return (
            <View>
                <Texto>Valor Inicial</Texto>
                <Input
                    onChangeText={(value) => {
                        setValorInicial(value)
                    }}
                    placeholder={"0.00"}
                    keyboardType='numeric'
                />
            </View>
        );
    }

    const inputDataVencimento = () => {
        return (
            <View>
                <FlexDirectionRow>
                    <ContainerData>
                        <Texto>Vencimento da Fatura</Texto>
                        <InputData
                            onPress={() => onOpen(1)}
                            style={[
                                erroDataVencimento != '' ? styles.styleErro : styles.styleInput
                            ]}>
                            <Texto>
                                {dataVencimento}
                            </Texto>
                        </InputData>
                        <Erro>{erroDataVencimento}</Erro>
                    </ContainerData>
                    <ContainerData>
                        <Texto>Fechamento da Fatura</Texto>
                        <InputData
                            onPress={() => onOpen(2)}
                            style={[
                                erroDataFechamento != '' ? styles.styleErro : styles.styleInput
                            ]}>
                            <Texto>
                                {dataFechamento}
                            </Texto>
                        </InputData>
                        <Erro>{erroDataFechamento}</Erro>
                    </ContainerData>
                </FlexDirectionRow>
            </View>
        );
    }

    const RenderTipoCarteira = () => {
        switch (selectedTipoCarteira.toString()) {

            case TipoCarteiraEnum.Credito:
                return (
                    <View>
                        {inputDescricao()}
                        {inputDataVencimento()}
                    </View>
                );
            case TipoCarteiraEnum.Conta_Corrente:
                return (
                    <View>
                        {inputDescricao()}
                        {inputVlrInicial()}
                    </View>
                );
            case TipoCarteiraEnum.Poupanca:
                return (
                    <View>
                        {inputDescricao()}
                        {inputVlrInicial()}
                    </View>
                );
            case TipoCarteiraEnum.Cedula:
                return (
                    <View>
                        {inputDescricao()}
                        {inputVlrInicial()}
                    </View>
                );
            case TipoCarteiraEnum.Outro:
                return (
                    <View>
                        {inputDescricao()}
                        {inputVlrInicial()}
                    </View>
                );
        }

    }

    useEffect(() => {
        ObterTipoCarteira();
    }, []);

    useEffect(() => {

    }, [dataVencimento, dataFechamento]);

    return (
        <Background>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Container>
                    <AreaCadastro>

                        <Texto>Tipo da Carteira</Texto>

                        <Picker
                            selectedValue={selectedTipoCarteira}
                            onValueChange={(itemValue, itemIndex) => HabilitarOpcoes(itemValue)}
                            style={{ borderWidth: 1 }}
                        >
                            {
                                tiposCarteiras != null
                                    ?
                                    tiposCarteiras.map((value, key) => {
                                        return <Picker.Item key={key} value={key} label={value.descricao} />
                                    })
                                    :
                                    <></>
                            }
                        </Picker>
                        <Row
                            style={[
                                erroTipoCarteira != '' ? styles.styleErro : styles.styleInput
                            ]}
                        />

                        {erroTipoCarteira != '' ? <Erro>{erroTipoCarteira}</Erro> : <></>}

                        {RenderTipoCarteira()}

                        <CheckBox onPress={chkExibirHome} isChecked={exibirHomeIsChecked} title={"Exibir Home"} />
                        <CheckBox onPress={chkNaoSomarPatrimonio} isChecked={naoSomaPatrimonioIsChecked} title={"Não somar no patrimônio"} />

                        <BtnEntrar disabled={isLoading} onPress={() => IsValid()}>
                            {
                                isLoading === false
                                    ?
                                    <TxtEntrar>Cadastrar</TxtEntrar>
                                    :
                                    getContent()
                            }
                        </BtnEntrar>

                    </AreaCadastro>
                </Container>

                <Modalize
                    ref={modalizeRef}
                    snapPoint={120}
                    modalHeight={120}
                >
                    <View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                            {tipoData.toString() === TipoDataEnum.Data_Fechamento ? 'Data Fechamento' : 'Data Vencimento'}
                        </Text>
                        <FlatList
                            style={{ marginLeft: 16, height: 80 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            data={data}
                            renderItem={({ item }) => <LblDataBall
                                data={item}
                                selectedData={AltData}
                                tipoData={tipoData}
                                valorData={
                                    tipoData.toString() === TipoDataEnum.Data_Fechamento ? dataFechamento : dataVencimento
                                }
                            />}
                        />
                    </View>
                </Modalize>
            </GestureHandlerRootView>
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
});