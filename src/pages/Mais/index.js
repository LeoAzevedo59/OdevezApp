import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Mais() {

    const { Deslogar } = useContext(AuthContext);

    return (
        <View>
            <TouchableOpacity onPress={() => Deslogar()}>
                <Text>Deslogar</Text>
            </TouchableOpacity>
        </View>
    );
}