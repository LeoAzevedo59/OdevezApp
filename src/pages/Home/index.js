//#region Imports
import React, { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ObjetivoVazio,
  ContainerExtrato,
  TxtMaisExtrato
} from './style';

import api from '../../contexts/api';
import LblPatrimonio from '../../components/LblPatrimonio';
import LblObjetivo from '../../components/LblObjetivo';
import LblExtrato from '../../components/LblExtrato';
import ComponenteVazio from '../../components/ComponenteVazio';

//#endregion

export default function Home() {
  const { usuario, exibirValor } = useContext(AuthContext);
  const navigation = useNavigation();

  const [objetivo, setObjetivo] = useState(1);

  async function ObterPatrimonio() {
    await api.get("objetivo/obter-resumido", {
      authorization: {
        token: usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setObjetivo(response.data);
    }).catch(function (error) {
      console.log(error.response.status);
      return false;
    });
  }

  async function ObterPatrimonio() {
    await api.get("patrimonio/obter-resumido", {
      authorization: {
        token: usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setObjetivo(response.data);
    }).catch(function (error) {
      console.log(error.response.status);
      return false;
    });
  }

  async function ObterExtrato() {
    await api.get("extrato/obter-resumido", {
      authorization: {
        token: usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setObjetivo(response.data);
    }).catch(function (error) {
      console.log(error.response.status);
      return false;
    });
  }

  return (
    <View>
      <Container>
        <LblPatrimonio valor="150,03" exibirValor={exibirValor} />
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
        <ComponenteVazio componente="Extrato" link="Patrimonio" />
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