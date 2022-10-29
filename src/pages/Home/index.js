import React, { useContext } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import {
  Feather,
  FontAwesome,
  MaterialIcons
} from '@expo/vector-icons';
import {
  Background,
  PatrimonioClick,
  ContainerPatrimonio,
  TxtPatrimonio,
  TxtValorPatrimonio,
  Objetivo,
  ContainerObjetivo,
  ContainerExtrato,
  Extrato,
  IconeExtrato,
  ContainerDescricao,
  TxtDescricao,
  TxtData,
  TxtValorExtrato,
  ContainerInfo,
  ContainerIcones,
  TxtObjetivoDescricao,
  TxtValorObjetivo,
  BarraProgressaoBackground,
  BarraProgressao,
  TxtValorPorcentagem,
  TxtMaisExtrato
} from './style';

export default function Home({ navigation }) {
  const { usuario } = useContext(AuthContext);

  return (
    <Background>
      <PatrimonioClick>
        <ContainerPatrimonio>
          <TxtPatrimonio> Patrimônio </TxtPatrimonio>
          <TxtValorPatrimonio> R$ 485.324,11 </TxtValorPatrimonio>
        </ContainerPatrimonio>
        <Image source={require('../../../assets/icons/arrow.png')} />
      </PatrimonioClick>

      <ScrollView
        showsVerticalScrollIndicator={false}   //vertical
        showsHorizontalScrollIndicator={false} //horizontal
        horizontal={true}
      >
        <ContainerObjetivo>
          <Objetivo>
            <ContainerIcones>
              <Feather name="target" size={24} color="black" />
              <FontAwesome name="users" size={24} color="black" />
            </ContainerIcones>
            <TxtObjetivoDescricao>Casa</TxtObjetivoDescricao>
            <TxtValorObjetivo>R$ 154,90</TxtValorObjetivo>
            <BarraProgressaoBackground />
            <BarraProgressao />
            <TxtValorPorcentagem>20%</TxtValorPorcentagem>
          </Objetivo>
        </ContainerObjetivo>

        <ContainerObjetivo>
          <Objetivo>
            <ContainerIcones>
              <Feather name="target" size={24} color="black" />
              <FontAwesome name="user" size={24} color="black" />
            </ContainerIcones>
            <TxtObjetivoDescricao>Carro</TxtObjetivoDescricao>
            <TxtValorObjetivo>R$ 154,90</TxtValorObjetivo>
            <BarraProgressaoBackground />
            <BarraProgressao />
            <TxtValorPorcentagem>20%</TxtValorPorcentagem>
          </Objetivo>
        </ContainerObjetivo>

        <ContainerObjetivo>
          <Objetivo>
            <ContainerIcones>
              <Feather name="target" size={24} color="black" />
              <FontAwesome name="user" size={24} color="black" />
            </ContainerIcones>
            <TxtObjetivoDescricao>Carro</TxtObjetivoDescricao>
            <TxtValorObjetivo>R$ 154,90</TxtValorObjetivo>
            <BarraProgressaoBackground />
            <BarraProgressao />
            <TxtValorPorcentagem>20%</TxtValorPorcentagem>
          </Objetivo>
        </ContainerObjetivo>
      </ScrollView>


      <ContainerExtrato>
        <Extrato>
          <ContainerInfo>
            <IconeExtrato>
              <MaterialIcons name="payments" size={24} color="black" />
            </IconeExtrato>
            <ContainerDescricao>
              <TxtDescricao>
                Pagamento
              </TxtDescricao>
              <TxtData>
                01/07/2022 - 12:35
              </TxtData>
            </ContainerDescricao>
          </ContainerInfo>
          <TxtValorExtrato>
            + R$ 545,90
          </TxtValorExtrato>
        </Extrato>

        <Extrato>
          <ContainerInfo>
            <IconeExtrato>
              <MaterialIcons name="payments" size={24} color="black" />
            </IconeExtrato>
            <ContainerDescricao>
              <TxtDescricao>
                Pagamento
              </TxtDescricao>
              <TxtData>
                01/07/2022 - 12:35
              </TxtData>
            </ContainerDescricao>
          </ContainerInfo>
          <TxtValorExtrato>
            + R$ 545,90
          </TxtValorExtrato>
        </Extrato>
        <TxtMaisExtrato> Mais </TxtMaisExtrato>
      </ContainerExtrato>
    </Background>
  );
}