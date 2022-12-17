//#region Imports
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, FlatList, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TxtMaisExtrato
} from './styles';

import api from '../../contexts/api';
import LblPatrimonio from '../../components/LblPatrimonio';
import LblObjetivoSimplificado from '../../components/LblObjetivoSimplificado';
import LblExtrato from '../../components/LblExtrato';
import ComponenteVazio from '../../components/ComponenteVazio';

//#endregion

export default function Home() {
  const navigation = useNavigation();
  const { usuario, exibirValor } = useContext(AuthContext);
  const [patrimonio, setPatrimonio] = useState(0.00);

  const data = [
    { codigo: 0, tipo: 'users', descricao: 'Casa', valor: '154,90', porcentagem: '20' },
    { codigo: 1, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' },
    { codigo: 2, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' }
  ];

  const [objetivos, setObjetivo] = useState(data);
  const [extrato, setExtrato] = useState([]);

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

  async function ObterExtrato() {
    await api.get("extrato/obter-extrato-resumido", {
      headers: {
        Authorization: usuario.type + " " + usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setExtrato(response.data);
    }).catch(function (error) {
      console.log(error.response.status + " Componente: Home - Extrato resumido");
    });
  }

  useEffect(() => {
    ObterPatrimonio();
    ObterExtrato();
  }, [])

  useEffect(() => {
    ObterPatrimonio();
    ObterExtrato();
  }, [exibirValor])

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <LblPatrimonio valor={" " + patrimonio.toFixed(2)} exibirValor={exibirValor} link="FrmPatrimonio" titulo="Patrimônio" />
        </Container>

        {objetivos.length === 0
          ?
          <Container>
            <ComponenteVazio componente="Objetivo" link="FrmObjetivo" />
          </Container>
          :
          <View>
            <FlatList
              style={{ height: 220, marginTop: 20 }}
              horizontal={true}
              keyExtractor={(item) => item.codigo}
              data={objetivos}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <LblObjetivoSimplificado data={item} exibirValor={exibirValor} />}
            />
          </View>
        }

        {extrato.length === 0
          ?
          <Container>
            <ComponenteVazio componente="Extrato" link="FrmPatrimonio" />
          </Container>
          :
          <View>
            <LblExtrato data={extrato[0]} exibirValor={exibirValor} resumido={true} />

            {extrato.length > 1
              ?
              <LblExtrato data={extrato[1]} exibirValor={exibirValor} resumido={true} />
              :
              <View />
            }

            <TxtMaisExtrato onPress={() => navigation.navigate('Extrato')}> Mais </TxtMaisExtrato>
          </View>
        }

      </ScrollView>
    </SafeAreaView>
  );
}