//#region Imports
import { useNavigation } from '@react-navigation/native';

import {
    PatrimonioClick,
    ContainerPatrimonio,
    TxtPatrimonio,
    TxtValorPatrimonio
} from './styles';
import { AntDesign } from '@expo/vector-icons';
//#endregion

export default function LblPatrimonio(props) {
    const navigation = useNavigation();
    
    return (
        <PatrimonioClick onPress={() => navigation.navigate('Carteira')}>
            <ContainerPatrimonio>
                <TxtPatrimonio> Patrimônio </TxtPatrimonio>
                <TxtValorPatrimonio> R$
                    {props.exibirValor == true ? props.valor : " ****"}
                </TxtValorPatrimonio>
            </ContainerPatrimonio>
            <AntDesign name="arrowright" size={24} color="black" />
        </PatrimonioClick>
    );
}