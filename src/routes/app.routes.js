import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather, Octicons, Entypo } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Container, ContainerPerfil, ContainerIcons, ImgPerfil, NomeUsuario, TxtPerfil } from './style';

import Home from '../pages/Home';
import Carteira from '../pages/Carteira';
import Dashboard from '../pages/Dashboard';
import Mais from '../pages/Mais';
import Adicionar from '../pages/Adicionar';
import Configuracao from '../pages/Configuracao';
import Duvidas from '../pages/Duvidas';
import Extrato from '../pages/Extrato';
import Objetivo from '../pages/Objetivo';
import FrmCarteira from '../formularios/FrmCarteira';
import FrmPatrimonio from '../formularios/FrmPatrimonio';
import FrmObjetivo from '../formularios/FrmObjetivo';
import Perfil from '../pages/Perfil';
import CalcJurosCompostosAporteMensal from '../components/CalcJurosCompostosAporteMensal';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs({ navigation }) {
    const window = useWindowDimensions();
    const tamanho = window.width;
    const [eye, setEye] = useState('eye');
    const [URLimage, setURLImage] = useState('https://containerodevez.blob.core.windows.net/container/');

    const { usuario, exibirValor, ExibirValor } = useContext(AuthContext);

    function exibirSimNao() {
        if (eye === 'eye') {
            setEye('eye-off')
            ExibirValor(false);
        }
        else {
            setEye('eye')
            ExibirValor(true);
        }
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerTitle: () => { return null },
                headerRight: () => { return null },
                headerLeft: () => (
                    <Container style={{ width: tamanho }}>
                        <ContainerPerfil onPress={() => navigation.navigate('Perfil')} >
                            <View>
                                {usuario.imagem == null ?
                                    <>
                                        <ImgPerfil>
                                            <Entypo name="image" size={20} color="yellow" />
                                        </ImgPerfil>
                                    </>
                                    :
                                    <>
                                        <Image
                                            style={{ width: 40, height: 40, borderRadius: 50 }}
                                            source={{ uri: URLimage + usuario.imagem }} />
                                    </>}
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <NomeUsuario>Olá, {usuario && usuario.apelido}</NomeUsuario>
                                <TxtPerfil>Visualizar perfil</TxtPerfil>
                            </View>
                        </ContainerPerfil>
                        <ContainerIcons>
                            <TouchableOpacity onPress={() => navigation.navigate('Duvidas')} >
                                <MaterialCommunityIcons name="comment-question-outline" size={24} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={exibirSimNao}>
                                <Feather name={eye} size={24} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Configuracao')}>
                                <Octicons name="gear" size={24} color="#333" />
                            </TouchableOpacity>
                        </ContainerIcons>
                    </Container>
                )
            }}>

            <Tab.Screen
                key={0}
                name='Home'
                component={Home}
                options={{
                    tabBarActiveTintColor: '#333',
                    tabBarIcon: ({ size, color }) => ([
                        color === '#333' ?
                            <Ionicons key={0} name={'home'} size={size} color={color} />
                            :
                            <Ionicons key={1} name={'home-outline'} size={size} color={color} />
                    ])
                }} />
            <Tab.Screen
                key={1}
                name='Dashboard'
                component={Dashboard}
                options={{
                    tabBarActiveTintColor: '#333',
                    tabBarIcon: ({ size, color }) => (
                        [
                            color === '#333' ?
                                <MaterialCommunityIcons key={0} name='view-dashboard' size={size} color={color} />
                                :
                                <MaterialCommunityIcons key={1} name='view-dashboard-outline' size={size} color={color} />
                        ])
                }} />
            <Tab.Screen
                key={2}
                name='Adicionar'
                component={Adicionar}
                options={{
                    tabBarActiveTintColor: '#333',
                    tabBarIcon: ({ size, color }) => (
                        <Octicons key={0} name='diff-added' size={size} color={color} /> // wallet-outline
                    )
                }} />
            <Tab.Screen
                key={3}
                name='Carteira'
                component={Carteira}
                options={{
                    tabBarActiveTintColor: '#333',
                    tabBarIcon: ({ size, color }) => ([
                        color === '#333' ?
                            <Ionicons key={0} name='wallet' size={size} color={color} /> // wallet
                            :
                            <Ionicons key={1} name='wallet-outline' size={size} color={color} /> // wallet
                    ])
                }} />
            <Tab.Screen
                key={4}
                name='Mais'
                component={Mais}
                options={{
                    tabBarActiveTintColor: '#333',
                    tabBarIcon: ({ size, color }) => (
                        <Feather key={0} name='more-horizontal' size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>
    )
}

function AppRoutes() {
    return (

        <Stack.Navigator>
            <Stack.Screen
                key={5}
                name='Homes'
                component={Tabs}
                options={{ headerShown: false }} />
            <Stack.Screen
                key={6}
                name='Configuracao'
                component={Configuracao}
                options={{
                    headerTitle: 'Configurações',
                }} />
            <Stack.Screen
                key={7}
                name='Duvidas'
                component={Duvidas}
                options={{
                    headerTitle: 'Dúvidas',
                }} />
            <Stack.Screen
                key={8}
                name='Extrato'
                component={Extrato}
                options={{
                    headerTitle: 'Extrato',
                }} />
            <Stack.Screen
                key={9}
                name='FrmPatrimonio'
                component={FrmPatrimonio}
                options={{
                    headerTitle: 'Patrimônio',
                }} />
            <Stack.Screen
                key={10}
                name='Objetivo'
                component={Objetivo}
                options={{
                    headerTitle: 'Objetivo',
                }} />
            <Stack.Screen
                key={11}
                name='FrmCarteira'
                component={FrmCarteira}
                options={{
                    headerTitle: 'Carteira',
                }} />
            <Stack.Screen
                key={12}
                name='FrmObjetivo'
                component={FrmObjetivo}
                options={{
                    headerTitle: 'Objetivo',
                }} />
            <Stack.Screen
                key={13}
                name='Perfil'
                component={Perfil}
                options={{
                    headerTitle: 'Perfil',
                }} />
            <Stack.Screen
                key={14}
                name='CalcJurosCompostosAporteMensal'
                component={CalcJurosCompostosAporteMensal}
                options={{
                    headerTitle: 'Juros Compostos',
                }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;