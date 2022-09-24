import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Background, Container, AreaInput, Input, Logo, Span, TextoPrincipal, BtnEntrar, TxtEntrar, BtnTxt } from './styles';
import { useState } from 'react';

export default function SignIn() {

    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <Background>
            <Container>
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
                <BtnEntrar><TxtEntrar>Entrar</TxtEntrar></BtnEntrar>
                <TouchableOpacity><BtnTxt style={{ marginTop: 20 }}>Recuperar minha senha</BtnTxt></TouchableOpacity>
                <TouchableOpacity><BtnTxt>cadastrar</BtnTxt></TouchableOpacity>
            </Container>
        </Background>
    );
}