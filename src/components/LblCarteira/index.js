import { useNavigation } from '@react-navigation/native';
import {
    CarteiraContainer,
    InfoCarteira,
    HeaderInfo,
    CarteiraDesc,
    TextoLowOpacity,
    Texto,
    AltCarteira,
    InfoFooter,
    AltFooter,
    AltHeader
} from './styles';
import {
    Feather,
    FontAwesome
} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

export default function LblCarteira(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <CarteiraContainer>
                <InfoCarteira onPress={() => navigation.navigate("Extrato")}>
                    <HeaderInfo>
                        <FontAwesome name="bank" size={24} color="white" />
                        <CarteiraDesc>{props.data.descricao}</CarteiraDesc>
                    </HeaderInfo>
                    <TextoLowOpacity>Mastercard</TextoLowOpacity>
                    <InfoFooter>
                        {/* <Texto>{props.data.fechamentoFatura}</Texto>
                        <TextoLowOpacity>Fechamento</TextoLowOpacity> */}
                    </InfoFooter>
                </InfoCarteira>
                <AltCarteira onPress={() => props.metodo(props.data.codigo)}>
                    <AltHeader>
                        <Feather name='more-horizontal' size={24} color="white" />
                    </AltHeader>
                    <AltFooter>
                        <TextoLowOpacity>Saldo</TextoLowOpacity>
                        <Texto>R$  {props.exibirValor == true ? props.data.valor.toFixed(2) : " ****"}</Texto>
                    </AltFooter>
                </AltCarteira>
            </CarteiraContainer>
        </SafeAreaView>
    );
}