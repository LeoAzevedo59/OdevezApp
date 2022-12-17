import React, { useState, useContext } from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Background, Container, Input, Logo, BtnEntrar, TxtEntrar, Back, Header, AreaCadastro, Texto, Erro } from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';
import { MascaraCPF, MascaraCelular, InputString50, InputEmail } from '../../components/Mascara';

export default function SignIn() {

    const navigation = useNavigation();
    const { Cadastrar } = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [erroNome, setErroNome] = useState('');
    const [erroSobrenome, setErroSobrenome] = useState('');
    const [erroCpf, setErroCPF] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroCelular, setErroCelular] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroSenhaConfirma, setErroSenhaConfirma] = useState('');
    const [erroGeral, setErroGeral] = useState('');



    function isValid() {
        let retorno = true;

        if (nome == '') {
            retorno = false;
            setErroNome('O campo Nome não pode ser nulo.')
        }

        if (sobrenome == '') {
            retorno = false;
            setErroSobrenome('O campo Sobrenome não pode ser nulo.')
        }

        if (cpf == '') {
            retorno = false;
            setErroCPF('O campo CPF não pode ser nulo.')
        }

        if (email == '') {
            retorno = false;
            setErroEmail('O campo E-mail não pode ser nulo.')
        }

        if (celular == '') {
            retorno = false;
            setErroCelular('O campo Celular não pode ser nulo.')
        }

        if (senha == '') {
            retorno = false;
            setErroSenha('O campo Senha não pode ser nulo.')
        }

        if (senha == '') {
            retorno = false;
            setErroSenhaConfirma('O campo de confirmação de senha não pode ser nulo.')
        }
        else if (senha != confirmarSenha) {
            retorno = false;
            setErroSenhaConfirma('A confirmação da senha está diferente da senha.')
        }

        return retorno
    }

    async function handlerCadastrar() {
        if (isValid()) {
            if (!await Cadastrar(nome, sobrenome, cpf, email, celular, senha, confirmarSenha)) {
                setErroCPF('CPF já cadastrado.')
                setErroGeral('Erro ao cadastrar-se.')
            }
        }
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
                        onChangeText={(text) => {
                            setNome(InputString50(text))
                            setErroNome('')
                        }}
                        style={[
                            erroNome != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroNome}</Erro>

                    <Texto>Sobrenome</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={sobrenome}
                        onChangeText={(text) => {
                            setSobrenome(InputString50(text))
                            setErroSobrenome('')
                        }}
                        style={[
                            erroSobrenome != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroSobrenome}</Erro>

                    <Texto>CPF</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={(text) => {
                            setCPF(MascaraCPF(text))
                            setErroCPF('')
                            setErroGeral('')
                        }}
                        style={[
                            erroCpf != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroCpf}</Erro>

                    <Texto>E-mail</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        keyboardType='email-address'
                        onChangeText={(text) => {
                            setEmail(InputEmail(text))
                            setErroEmail('')
                        }}
                        style={[
                            erroEmail != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroEmail}</Erro>

                    <Texto>Celular</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={celular}
                        onChangeText={(text) => {
                            setCelular(MascaraCelular(text))
                            setErroCelular('')
                        }}
                        style={[
                            erroCelular != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroCelular}</Erro>

                    <Texto>Senha</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(text) => {
                            setSenha(text)
                            setErroSenha('')
                        }}
                        style={[
                            erroSenha != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroSenha}</Erro>

                    <Texto>Confirmar Senha</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={(text) => {
                            setConfirmarSenha(text)
                            setErroSenhaConfirma('')
                        }}
                        style={[
                            erroSenhaConfirma != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroSenhaConfirma}</Erro>
                    <Erro>{erroGeral}</Erro>
                    <BtnEntrar onPress={handlerCadastrar}><TxtEntrar>Cadastrar</TxtEntrar></BtnEntrar>
                </AreaCadastro>
            </Container>
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