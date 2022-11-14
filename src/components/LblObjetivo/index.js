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

export default function LblObjetivo() {
    const navigation = useNavigation();
    
    return (
        <ContainerObjetivo>
            <Objetivo onPress={() => navigation.navigate('Objetivo')}>
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
    );
}