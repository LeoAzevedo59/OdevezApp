import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { Background, Container, AreaInput, Input, Logo, Span, TextoPrincipal, BtnEntrar, TxtEntrar, BtnTxt } from './styles';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

    const navigation = useNavigation();
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');

    function handlerLogin() {
       
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
                    <Input
                        placeholder='Celular'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={celular}
                        onChangeText={(text) => setCelular(text)}
                    />

                    <Input
                        placeholder='Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        style={{ marginTop: 20 }}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />
                </AreaInput>

                <Text style={{ marginTop: 16 }}>Lembrar minha senha.</Text>
                <BtnEntrar onPress={handlerLogin}><TxtEntrar>Entrar</TxtEntrar></BtnEntrar>
                <TouchableOpacity><BtnTxt style={{ marginTop: 20 }}>Recuperar minha senha</BtnTxt></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><BtnTxt>cadastrar</BtnTxt></TouchableOpacity>
            </Container>
        </Background>
    );
}