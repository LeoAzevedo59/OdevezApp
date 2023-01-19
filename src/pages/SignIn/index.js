import React, { useState, useContext } from 'react';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Background, Container, AreaInput, Input, Logo, Span, TextoPrincipal, BtnEntrar, TxtEntrar, BtnTxt, Texto, Erro } from './styles';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';
import { MascaraCelular } from '../../components/Mascara';

export default function SignIn() {

    const navigation = useNavigation();
    const { Logar } = useContext(AuthContext);

    const [celular, setCelular] = useState('(19)98235-8635'); //deBug
    const [senha, setSenha] = useState('1'); //deBug
    // const [celular, setCelular] = useState(''); //producao 
    // const [senha, setSenha] = useState(''); //producao
    const [erroSenha, SetErroSenha] = useState('');
    const [erroCelular, setErroCelular] = useState('');


    function MascararCelular(numeroCelular) {
        setCelular(MascaraCelular(numeroCelular))
    }

    function isValid() {
        let retorno = true;

        if (celular == '') {
            setErroCelular('O campo celular não pode ser vazio.')
            retorno = false;
        } else if (celular.length <= 12) {
            setErroCelular('Celular inválido.')
            retorno = false;
        }

        if (senha == '') {
            SetErroSenha('O campo senha não pode ser vazio.')
            retorno = false;
        }

        return retorno
    }

    async function handlerLogin() {
        if (isValid()) {
            if (!await Logar(celular, senha)) {
                setErroCelular(' ')
                SetErroSenha('Celular e/ou senha incorreta.')
            }
        }
    }

    return (

        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enable
            >
                <Logo source={require('../../../assets/images/logo.png')} />
                <Span>Entre na Odevez ou crie uma conta.</Span>
                <TextoPrincipal>O gerenciamento de finanças feito para você.</TextoPrincipal>

                <AreaInput>
                    <Texto>Celular</Texto>
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={celular}
                        onChangeText={(text) => {
                            MascararCelular(text)
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
                            SetErroSenha('')
                        }}
                        style={[
                            erroSenha != '' ? styles.styleErro : styles.styleInput
                        ]}
                    />
                    <Erro>{erroSenha}</Erro>

                </AreaInput>
                <BtnEntrar onPress={handlerLogin}><TxtEntrar>Entrar</TxtEntrar></BtnEntrar>
                <TouchableOpacity>
                    <BtnTxt style={{ marginTop: 20 }}>Recuperar minha senha</BtnTxt>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><BtnTxt>cadastrar</BtnTxt></TouchableOpacity>
            </Container>
        </Background >
    );
}


const styles = StyleSheet.create({
    styleErro: {
        borderWidth: 1,
        borderColor: '#e60000',
        borderRadius: 4
    },
    styleInput: {
        borderColor: '##333'
    }
})