import React from 'react';
import Home from '../pages/Home';
import Carteira from '../pages/Carteira';
import Dashboard from '../pages/Dashboard';
import Mais from '../pages/Mais';
import Adicionar from '../pages/Adicionar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';

const AppStack = createBottomTabNavigator();

function AppRoutes() {
    return (
        <AppStack.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#111',
                tabBarStyle: {
                    alignItems: 'center',
                    paddingBottom: 5,
                    paddingTop: 5
                }
            }}>

            <AppStack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name='home-outline' size={size} color={color} /> // home
                    )
                }} />

            <AppStack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name='view-dashboard-outline' size={size} color={color} /> // view-dashboard
                    )
                }} />

            <AppStack.Screen
                name='adicionar'
                component={Adicionar}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Octicons name='diff-added' size={size} color={color} /> // wallet-outline
                    )
                }} />

            <AppStack.Screen
                name='Carteira'
                component={Carteira}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name='wallet-outline' size={size} color={color} /> // wallet
                    )
                }} />

            <AppStack.Screen
                name='Mais'
                component={Mais}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name='more-horizontal' size={size} color={color} />
                    )
                }} />

        </AppStack.Navigator>
    );
}

export default AppRoutes;