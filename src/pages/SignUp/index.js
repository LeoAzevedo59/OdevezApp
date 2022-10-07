import React, { useState, useContext } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Background, Container, Input, Logo, BtnEntrar, TxtEntrar, Back, Header, AreaCadastro, Texto } from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';
import { MascaraCPF, MascaraCelular } from '../../components/Mascara';

export default function SignIn() {

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const { Cadastrar } = useContext(AuthContext);

    function handlerCadastrar() {
        Cadastrar(nome, sobrenome, cpf, email, celular, senha, confirmarSenha);
    }

    function MascararCPF(numeroCPF) {
        setCPF(MascaraCPF(numeroCPF))
    }

    function MascararCelular(numeroCelular) {
        setCelular(MascaraCelular(numeroCelular))
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enable
            >
                <Header>
                    <Logo source={require('../../../assets/images/logo.png')} />
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Back source={require('../../../assets/icons/arrow.png')} />
                    </TouchableOpacity>
                </Header>

                <AreaCadastro
                    showsVerticalScrollIndicator={false}>
                    <Texto>Nome</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={nome}
                        onChangeText={(text) => setNome(text)}

                    />
                    <Texto>Sobrenome</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={sobrenome}
                        onChangeText={(text) => setSobrenome(text)}
                    />
                    <Texto>CPF</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={(text) => MascararCPF(text)}
                    />
                    <Texto>E-mail</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Texto>Celular</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={celular}
                        onChangeText={(text) => MascararCelular(text)}
                    />
                    <Texto>Senha</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />
                    <Texto>Confirmar Senha</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={(text) => setConfirmarSenha(text)}
                    />
                    <BtnEntrar onPress={handlerCadastrar}><TxtEntrar>Cadastrar</TxtEntrar></BtnEntrar>
                </AreaCadastro>
            </Container>
        </Background>
    );
}