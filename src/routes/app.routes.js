import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';

import Home from '../pages/Home';
import Carteira from '../pages/Carteira';
import Dashboard from '../pages/Dashboard';
import Mais from '../pages/Mais';
import Adicionar from '../pages/Adicionar';

import styled from 'styled-components/native';

const AppStack = createBottomTabNavigator();

function AppRoutes() {

    const window = useWindowDimensions();
    const tamanho = window.width;

    const [eye, setEye] = useState('eye');

    const { usuario } = useContext(AuthContext);

    function exibirSimNao() {
        if (eye === 'eye')
            setEye('eye-off')
        else
            setEye('eye')
    }

    return (
        <AppStack.Navigator
            screenOptions={{
                headerTitle: () => { return null },
                headerRight: () => { return null },
                headerLeft: () => (
                    <Container style={{ width: tamanho }}>
                        <ContainerPerfil>
                            <TouchableOpacity>
                                <ImgPerfil source={require('../../assets/images/homer.jpeg')} />
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center' }}>
                                <NomeUsuario>{usuario.apelido}</NomeUsuario>
                            </View>
                        </ContainerPerfil>
                        <ContainerIcons>
                            <TouchableOpacity >
                                <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={exibirSimNao}>
                                <Feather name={eye} size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Octicons name="gear" size={24} color="black" />
                            </TouchableOpacity>
                        </ContainerIcons>
                    </Container>
                )
            }}>

            <AppStack.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => ([
                        color === 'black' ?
                            <Ionicons name={'home'} size={size} color={color} />
                            :
                            <Ionicons name={'home-outline'} size={size} color={color} />
                    ])
                }} />

            <AppStack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => (
                        [
                            color === 'black' ?
                                <MaterialCommunityIcons name='view-dashboard' size={size} color={color} />
                                :
                                <MaterialCommunityIcons name='view-dashboard-outline' size={size} color={color} />
                        ])
                }} />

            <AppStack.Screen
                name='Adicionar'
                component={Adicionar}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => (
                        <Octicons name='diff-added' size={size} color={color} /> // wallet-outline
                    )
                }} />

            <AppStack.Screen
                name='Carteira'
                component={Carteira}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => ([
                        color === 'black' ?
                            <Ionicons name='wallet' size={size} color={color} /> // wallet
                            :
                            <Ionicons name='wallet-outline' size={size} color={color} /> // wallet
                    ])
                }} />

            <AppStack.Screen
                name='Mais'
                component={Mais}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name='more-horizontal' size={size} color={color} />
                    )
                }} />

        </AppStack.Navigator>
    );
}

export default AppRoutes;

const Container = styled.View`
background-color: #FAFF00;
height: 60px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 16px;
`;

const ContainerPerfil = styled.View`
position: relative;
flex-direction: row;
`;

const Notificacao = styled.Text`
background-color: #212121;
width: 16px;
height: 16px;
color: #FAFF00;
border-radius: 50px;
text-align: center;
font-size: 12px;
position: absolute;
margin-left: 36px;
`;

const ContainerIcons = styled.View`
width: 120px;
flex-direction: row;
justify-content: space-between;
`;

const ImgPerfil = styled.Image`
width: 50px;
height: 50px;
border-radius: 50px;
`;

const NomeUsuario = styled.Text`
padding-left: 8px;
font-size: 16px;
font-weight: bold;
`;

const Icone = styled.Image`
height: 20px;
width: 20px;
`;