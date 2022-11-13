import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
    Background,
    AreaInput,
    Container,
    Input,
    Texto,
    Btn,
    BtnTxt,
    AreaCadastro,
    TxtEntrar,
    BtnEntrar,
    Div,
    Data,
    Row
} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';

export default function Patrimonio() {
    const [date, setDate] = useState(new Date());
    const [dateFormat, setDateFormat] = useState(date.getDate().toString() + '/' + (parseInt(date.getMonth() + 1)).toString() + '/' + date.getFullYear().toString());
    const [show, setShow] = useState(false);

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

    return (
        <Background>
            <Container>
                <AreaCadastro>
                    <Texto>Modalidade</Texto>
                    <Picker>
                        <Picker.Item key={1} value={1} label="Receita"></Picker.Item>
                        <Picker.Item key={2} value={3} label="Despesa"></Picker.Item>
                    </Picker>
                    <Row></Row>

                    <Texto>Carteira</Texto>
                    <Picker>
                        <Picker.Item key={1} value={1} label="Itau"></Picker.Item>
                        <Picker.Item key={2} value={3} label="Nu Bank"></Picker.Item>
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