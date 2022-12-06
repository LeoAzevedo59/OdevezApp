//#region Imports
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, FlatList, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TxtMaisExtrato
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
          <LblPatrimonio valor={" " + patrimonio.toFixed(2)} exibirValor={exibirValor} link="Carteira" titulo="Patrimônio" />
        </Container>

        {objetivos.length === 0
          ?
          <Container>
            <ComponenteVazio componente="Objetivo" link="Objetivo" />
          </Container>
          :
          <View>
            <FlatList
              horizontal={true}
              keyExtractor={(item) => item.id}
              data={objetivos}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <LblObjetivo data={item} exibirValor={exibirValor} />}
            />
          </View>
        }

        {extrato.length === 0
          ?
          <Container>
            <ComponenteVazio componente="Extrato" link="FrmPatrimonio" />
          </Container>
          :
          <Container>
            <LblExtrato data={extrato[0]} exibirValor={exibirValor} />

            {extrato.length > 1
              ?
              <LblExtrato data={extrato[1]} exibirValor={exibirValor} />
              :
              <View />
            }

            <TxtMaisExtrato onPress={() => navigation.navigate('Extrato')}> Mais </TxtMaisExtrato>

          </Container>
        }

      </ScrollView>
    </SafeAreaView>
  );
}











// {
//   extrato == null
//   ?
//   <Container>
//     <ComponenteVazio componente="Extrato" link="Extrato" />
//   </Container>
//   :
//   <View>
//     <FlatList
//       horizontal={true}
//       keyExtractor={(item) => item.id}
//       data={extrato}
//       showsVerticalScrollIndicator={false}
//       renderItem={({ item }) => <LblExtrato data={item} exibirValor={exibirValor} />}

//     />
//   </View>
// }