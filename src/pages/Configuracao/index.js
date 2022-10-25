import React from 'react';
import { View, Text } from 'react-native';

export default function Configuracao({ navigation }) {
    return (
        <View>
            <Text onPress={() => navigation.navigate('Duvidas')}> btnConfiguracao </Text>
        </View>
    );
}