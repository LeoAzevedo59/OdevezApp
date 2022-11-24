//#region Improts
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

export default function LblExtrato(props) {
    return (
        <Extrato>
            <ContainerInfo>
                <IconeExtrato>
                    <MaterialIcons name="payments" size={24} color="black" />
                </IconeExtrato>
                <ContainerDescricao>
                    <TxtDescricao>
                        {props.data.tipo}
                    </TxtDescricao>
                    <TxtData>
                        {props.data.data}
                    </TxtData>
                </ContainerDescricao>
            </ContainerInfo>
            <TxtValorExtrato>
                + R$
                {props.exibirValor == true ? props.data.valor : " ****"}
            </TxtValorExtrato>
        </Extrato>
    );
}