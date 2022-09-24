import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Background, Container, Input, Logo, BtnEntrar, TxtEntrar, Back, Header, AreaCadastro } from '../SignIn/styles';
import { useNavigation } from '@react-navigation/native'

export default function SignIn() {

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

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
                    <Input
                        placeholder='Nome'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        style={{ marginTop: 20 }}
                    />

                    <Input
                        placeholder='Sobrenome'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={sobrenome}
                        onChangeText={(text) => setSobrenome(text)}
                        style={{ marginTop: 20 }}
                    />

                    <Input
                        placeholder='E-mail'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ marginTop: 20 }}
                    />

                    <Input
                        placeholder='Celular'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        value={celular}
                        onChangeText={(text) => setCelular(text)}
                        style={{ marginTop: 20 }}
                    />

                    <Input
                        placeholder='Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                        style={{ marginTop: 20 }}
                    />

                    <Input
                        placeholder='Confirmar Senha'
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={(text) => setConfirmarSenha(text)}
                        style={{ marginTop: 20 }}
                    />
                </AreaCadastro>

                <BtnEntrar><TxtEntrar>Cadastrar</TxtEntrar></BtnEntrar>
            </Container>
        </Background>
    );
}