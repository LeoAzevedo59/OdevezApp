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

export default function LblCarteira(props) {
    const navigation = useNavigation();

    return (
        <CarteiraContainer>
            <InfoCarteira onPress={() => navigation.navigate("Extrato")}>
                <HeaderInfo>
                    <FontAwesome name="bank" size={24} color="white" />
                    <CarteiraDesc>Itau</CarteiraDesc>
                </HeaderInfo>
                <TextoLowOpacity>Mastercard</TextoLowOpacity>
                <InfoFooter>
                    <Texto>05/09</Texto>
                    <TextoLowOpacity>Fechamento</TextoLowOpacity>
                </InfoFooter>
            </InfoCarteira>
            <AltCarteira onPress={() => props.metodo('2')}>
                <AltHeader>
                    <Feather name='more-horizontal' size={24} color="white" />
                </AltHeader>
                <AltFooter>
                    <TextoLowOpacity>Saldo</TextoLowOpacity>
                    <Texto>R$  {props.exibirValor == true ? props.valor : " ****"}</Texto>
                </AltFooter>
            </AltCarteira>
        </CarteiraContainer>
    );
}