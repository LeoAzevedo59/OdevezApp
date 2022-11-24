//#region Imports
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, FlatList, VirtualizedList, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TxtMaisExtrato,
  Div,
  ObjetivoVazio
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

  const data = [
    { id: 0, tipo: 'users', descricao: 'Casa', valor: '154,90', porcentagem: '20' },
    { id: 1, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' },
    { id: 2, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' }
  ];

  const [objetivos, setObjetivo] = useState(data);

  const ext = [
    { id: 0, tipo: 'PAGAMENTO', data: '01/07/2022', valor: '545,99' },
    { id: 1, tipo: 'PAGAMENTO', data: '22/09/2022', valor: '23,12' },
    { id: 2, tipo: 'PAGAMENTO', data: '01/07/2022', valor: '545,99' },
    { id: 3, tipo: 'PAGAMENTO', data: '01/07/2022', valor: '545,99' },
    { id: 4, tipo: 'PAGAMENTO', data: '01/07/2022', valor: '545,99' },
  ]

  const [extrato, setExtratp] = useState(ext);

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
    <ScrollView>
      <Container>
        <LblPatrimonio valor={" " + patrimonio} exibirValor={exibirValor} link="Carteira" titulo="Patrimônio" />
      </Container>

      {objetivos == null
        ?
        <Container>
          <ComponenteVazio componente="Objetivo" link="Objetivo" />
        </Container>
        :
        <FlatList
          nestedScrollEnabled
          horizontal={true}
          keyExtractor={(item) => item.id}
          data={objetivos}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <LblObjetivo data={item} exibirValor={exibirValor} />}

        />
      }
      <Container>
        {extrato == null
          ?
          <ComponenteVazio componente="Objetivo" link="Objetivo" />
          :
          <FlatList
            horizontal={false}
            keyExtractor={(item) => item.id}
            data={extrato}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <LblExtrato data={item} exibirValor={exibirValor} />}
          />}
        <TxtMaisExtrato onPress={() => navigation.navigate('Extrato')}> Mais </TxtMaisExtrato>
      </Container>
    </ScrollView>
  );
}

