//#region Improts

import { useNavigation } from '@react-navigation/native';
import {
    MaterialIcons
} from '@expo/vector-icons';
import {
    Extrato,
    IconeExtrato,
    ContainerDescricao,
    TxtDescricao,
    TxtData,
    TxtValorExtrato,
    ContainerInfo
} from './styles';

//#endregion

export default function LblExtrato() {
    const navigation = useNavigation();

    return (
        <Extrato onPress={() => navigation.navigate('Extrato')}>
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
    );
}