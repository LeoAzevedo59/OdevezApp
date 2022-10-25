import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Container, ContainerPerfil, ContainerIcons, ImgPerfil, NomeUsuario, Icone } from './style';

import Home from '../pages/Home';
import Carteira from '../pages/Carteira';
import Dashboard from '../pages/Dashboard';
import Mais from '../pages/Mais';
import Adicionar from '../pages/Adicionar';
import Configuracao from '../pages/Configuracao';
import Duvidas from '../pages/Duvidas';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs({ navigation }) {
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
        <Tab.Navigator
            screenOptions={{
                headerTitle: () => { return null },
                headerRight: () => { return null },
                headerLeft: () => (
                    <Container style={{ width: tamanho }}>
                        <ContainerPerfil>
                            <TouchableOpacity>
                                <ImgPerfil source={require('../../assets/images/julius-rock.jpg')} />
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center' }}>
                                <NomeUsuario>{usuario.apelido}</NomeUsuario>
                            </View>
                        </ContainerPerfil>
                        <ContainerIcons>
                            <TouchableOpacity onPress={() => navigation.navigate('Duvidas')} >
                                <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={exibirSimNao}>
                                <Feather name={eye} size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Configuracao')}>
                                <Octicons name="gear" size={24} color="black" />
                            </TouchableOpacity>
                        </ContainerIcons>
                    </Container>
                )
            }}>

            <Tab.Screen
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

            <Tab.Screen
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

            <Tab.Screen
                name='Adicionar'
                component={Adicionar}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => (
                        <Octicons name='diff-added' size={size} color={color} /> // wallet-outline
                    )
                }} />


            <Tab.Screen
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

            <Tab.Screen
                name='Mais'
                component={Mais}
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name='more-horizontal' size={size} color={color} />
                    )
                }} />

        </Tab.Navigator>
    )
}

function AppRoutes() {
    return (

        <Stack.Navigator>
            <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name='Configuracao' component={Configuracao} />
            <Stack.Screen name='Duvidas' component={Duvidas} />
        </Stack.Navigator>
    );
}

export default AppRoutes;