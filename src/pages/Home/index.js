//#region Imports
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container
} from './style';

import api from '../../contexts/api';
import LblPatrimonio from '../../components/LblPatrimonio';
import LblObjetivo from '../../components/LblObjetivo';
import LblExtrato from '../../components/LblExtrato';
import ComponenteVazio from '../../components/ComponenteVazio';

//#endregion

export default function Home() {
  const navigation = useNavigation();
  const { usuario, exibirValor } = useContext(AuthContext);
  const [patrimonio, setPatrimonio] = useState(0.00);

  async function ObterPatrimonio() {
    await api.get("carteira/obter-valor-carteira-por-usuario", {
      headers: {
        Authorization: usuario.type + " " + usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setPatrimonio(response.data);
    }).catch(function (error) {
      console.log(error.response.status + " Componente: Home");
    });
  }

  useEffect(() => {
    ObterPatrimonio();
  }, [])

  useEffect(() => {
    ObterPatrimonio();
  }, [patrimonio])

  return (
    <View>
      <Container>
        <LblPatrimonio valor={" " + patrimonio} exibirValor={exibirValor} />
      </Container>

      <Container>
        <ComponenteVazio componente="Objetivo" link="Objetivo" />
      </Container>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}   //vertical 
        showsHorizontalScrollIndicator={false} //horizontal
        horizontal={true}
      >
        <LblObjetivo />
        <LblObjetivo />
        <LblObjetivo />
        <LblObjetivo />
        <ObjetivoVazio />
      </ScrollView> */}

      <Container>
        <ComponenteVazio componente="Receita e Despesas" link="Patrimonio" />
      </Container>

      {/* <Container>
        <ContainerExtrato>
          <LblExtrato />
          <LblExtrato />
          <TxtMaisExtrato onPress={() => navigation.navigate('Extrato')}> Mais </TxtMaisExtrato>
        </ContainerExtrato>
      </Container> */}
    </View>
  );
}