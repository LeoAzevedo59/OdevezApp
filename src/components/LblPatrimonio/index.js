//#region Imports
import { useNavigation } from '@react-navigation/native';

import {
    PatrimonioClick,
    ContainerPatrimonio,
    TxtPatrimonio,
    TxtValorPatrimonio
} from './styles';
import { AntDesign, Feather } from '@expo/vector-icons';
//#endregion

export default function LblPatrimonio(props) {
    const navigation = useNavigation();

    return (
        <PatrimonioClick onPress={() => navigation.navigate(props.link)}>
            <ContainerPatrimonio>
                <TxtPatrimonio> {props.titulo} </TxtPatrimonio>
                <TxtValorPatrimonio> R$
                    {props.exibirValor == true ? props.valor : " ****"}
                </TxtValorPatrimonio>
            </ContainerPatrimonio>
            <Feather name="plus-circle" size={24} color="#333" />
        </PatrimonioClick>
    );
}