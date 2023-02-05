//#region Imports
import React, { useContext, useState, useEffect, useRef } from 'react';
import { ScrollView, View, ActivityIndicator, SafeAreaView, Modal, FlatList, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';

import {
  Container,
  TxtMaisExtrato,
  Espacamento,
  ModalBackground,
  ModalContainer,
  ModalBtn,
  ModalInput,
  H1,
  Paragraph,
  ContainerGrafico
} from './styles';

import api from '../../contexts/api';
import LblPatrimonio from '../../components/LblPatrimonio';
import LblObjetivoSimplificado from '../../components/LblObjetivoSimplificado';
import LblExtrato from '../../components/LblExtrato';
import ComponenteVazio from '../../components/ComponenteVazio';
import ConfettiCannon from 'react-native-confetti-cannon';
import LblCarteira from '../../components/LblCarteira';
import LblCarteiraResumida from '../../components/LblCarteiraResumida';

//#endregion

export default function Home() {
  const navigation = useNavigation();
  const { usuario, exibirValor, AlterarApelido, ExibirValor } = useContext(AuthContext);
  const [patrimonio, setPatrimonio] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [animate, SetAnimate] = useState(false);
  const [apelido, SetApelido] = useState(null);
  const [nome, SetNome] = useState('');
  const [carteira, setCarteira] = useState();

  const data = [
    { codigo: 0, tipo: 'users', descricao: 'Casa', valor: '154,90', porcentagem: '20' },
    { codigo: 1, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' },
    { codigo: 2, tipo: 'user', descricao: 'Carro', valor: '3122,90', porcentagem: '5' }
  ];

  const [objetivos, setObjetivo] = useState(data);
  const [extrato, setExtrato] = useState([]);

  const startAnimation = () => {
    SetAnimate(true);

    setTimeout(() => {
      SetAnimate(false);
    }, 7000);

  };

  function clickModal() {
    InserirApelido();
    setVisible(!visible);
  }

  async function ObterPatrimonio() {
    await api.get("carteira/obter-valor-por-usuario", {
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
    setIsLoading(false);
  }

  async function ObterNomeUsuario() {
    await api.get("usuario/obter-nome", {
      headers: {
        Authorization: usuario.type + " " + usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      SetNome(response.data);
    }).catch(function (error) {
      console.log(error.response.status + " Componente: Home - Obter Extrato");
    });
    setIsLoading(false);
  }

  async function InserirApelido() {
    await api.post("usuario/inserir-apelido", {
      Codigo: usuario.codigo,
      Apelido: apelido,
      Usuario: usuario.codigo,
      Nome: usuario.Nome
    }, {
      headers: {
        Authorization: usuario.type + " " + usuario.token
      }
    }).then((response) => {
      AlterarApelido(response.data);
      startAnimation();
    }).catch(function (error) {
      console.log(error.response.status + " Componente: Home - Inserir apelido");
      return false;
    });
  }

  async function ObterCarteira() {
    setIsLoading(true);
    await api.get("carteira/obter-carteira-por-usuario", {
      headers: {
        Authorization: usuario.type + " " + usuario.token
      },
      params: {
        usuario: usuario.codigo
      }
    }).then((response) => {
      setCarteira(response.data);
    }).catch(function (error) {
      console.log(error.response.status + " Componente: Carteira - Obter Carteira");
    });
    setIsLoading(false);
  }

  const getContent = () => {
    if (isLoading)
      return <ActivityIndicator size="large" />
  }

  useEffect(() => {
    if (usuario.apelido === '') {
      ObterNomeUsuario();
      setVisible(true);
    }
    else {
      ObterPatrimonio();
      ObterExtrato();
      ObterCarteira();
    }
  }, [exibirValor])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBFB' }}>

      {animate ?
        <ConfettiCannon
          count={100}
          origin={{ x: -5, y: 0 }}
        />
        : null
      }

      <ScrollView>
        <Container>
          <LblPatrimonio valor={" " + patrimonio.toFixed(2)} exibirValor={exibirValor} link="FrmPatrimonio" titulo="Patrimônio" />
        </Container>
        <ContainerGrafico>
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}

              data={[
                { x: 'jan/23', y: 208 }, //x = MES -- y = VALOR
                { x: 'fev/23', y: 309 },
                { x: 'mar/23', y: 599 },
                { x: 'abr/23', y: -88 },
                { x: 'mai/23', y: 100 }
              ]}
            />
          </VictoryChart>
        </ContainerGrafico>
        {/* {objetivos.length === 0
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
        } */}

        <Espacamento />

        {extrato.length === 0
          ?
          <Container>
            <ComponenteVazio componente="Receita / Despesa" link="FrmPatrimonio" />
          </Container>
          :

          isLoading === false
            ?
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

            :
            getContent()
        }

        <FlatList
          style={{ marginRight: 10, marginTop: 24 }}
          horizontal={true}
          keyExtractor={(item) => item.codigo}
          data={carteira}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <LblCarteiraResumida data={item} exibirValor={exibirValor} />}
        />

        {usuario.apelido === ''
          ?
          <Modal transparent={false}
            animationType={"slide"}
            visible={visible}
            onRequestClose={() => setVisible(!visible)}>

            <ModalBackground>
              <ModalContainer>

                <H1>Olá! Seja Bem vindo(a) 😊</H1>

                <Paragraph>Como prefere que a gente chame você? 😉</Paragraph>

                <ModalInput
                  onChangeText={(text) => {
                    SetApelido(text);
                  }}
                  placeholder={"Digite um apelido"}
                />

                <Paragraph>Caso não digite nada, estaremos falando com: <H1>{nome}</H1>? </Paragraph>

                <ModalBtn onPress={() => clickModal()}>
                  <Text> ENVIAR </Text>
                </ModalBtn>
              </ModalContainer>
            </ModalBackground>
          </Modal>
          :
          <></>
        }



      </ScrollView>
    </SafeAreaView>


  );
}