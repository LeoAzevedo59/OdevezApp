import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';

export default function Configuracao() {
    
    const navigation = useNavigation();

    return (
        <View>
            <Header />

            <Text> Configuracao </Text>
        </View>
    );
}