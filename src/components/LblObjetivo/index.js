//#region imports
import { useNavigation } from '@react-navigation/native';

import {
    ContainerObjetivo,
    Objetivo,
    ContainerIcones,
    TxtObjetivoDescricao,
    TxtValorObjetivo,
    BarraProgressaoBackground,
    BarraProgressao,
    TxtValorPorcentagem
} from './styles';
import {
    Feather,
    FontAwesome
} from '@expo/vector-icons';
//#endregion

export default function LblObjetivo(props) {
    const navigation = useNavigation();

    return (
        <ContainerObjetivo>
            <Objetivo onPress={() => navigation.navigate('Objetivo')}>
                <ContainerIcones>
                    <Feather name="target" size={24} color="black" />
                    <FontAwesome name={props.data.tipo} size={24} color="black" />
                </ContainerIcones>
                <TxtObjetivoDescricao>{props.data.descricao}</TxtObjetivoDescricao>
                <TxtValorObjetivo>R$
                    {props.exibirValor == true ? props.data.valor : " ****"}
                </TxtValorObjetivo>
                <BarraProgressaoBackground />
                <BarraProgressao />
                <TxtValorPorcentagem>
                    {props.exibirValor == true ? props.data.porcentagem : " ****"}
                    %</TxtValorPorcentagem>
            </Objetivo>
        </ContainerObjetivo>
    );
}