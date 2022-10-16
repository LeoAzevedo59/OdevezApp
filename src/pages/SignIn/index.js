import React, { useState, useContext } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Background, Container, AreaInput, Input, Logo, Span, TextoPrincipal, BtnEntrar, TxtEntrar, BtnTxt, Texto } from './styles';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';
import { MascaraCelular } from '../../components/Mascara';

export default function SignIn() {

    const navigation = useNavigation();
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const { Logar } = useContext(AuthContext);
    const [lembrarSenha, setLembrarSenha] = useState(false);

    function MascararCelular(numeroCelular) {
        setCelular(MascaraCelular(numeroCelular))
    }

    function handlerLogin() {
        Logar(celular, senha);
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