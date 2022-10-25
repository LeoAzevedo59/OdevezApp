import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home({ navigation }) {
  const { usuario } = useContext(AuthContext);

  return (
    <View>
      <Text> Home </Text>
    </View>
  );
}