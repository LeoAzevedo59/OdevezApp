//#region Improts
import {
    MaterialCommunityIcons,
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

    function exibirIcone() {
        let nome = "";

        if (props.data.categoria.descricao == "TRANSPORTE")
            nome = "train-car-passenger-variant";
        else if (props.data.categoria.descricao == "ALIMENTAÇÃO")
            nome = "food";
        else if (props.data.categoria.descricao == "LAZER")
            nome = "table-tennis";
        else if (props.data.categoria.descricao == "COMPRA ONLINE")
            nome = "shopping";
        else if (props.data.categoria.descricao == "MERCADO")
            nome = "cart";
        else if (props.data.categoria.descricao == "SALARIO") {
            return (<MaterialIcons name="attach-money" size={24} color="black" />)
        }

        return (
            <MaterialCommunityIcons name={nome} size={24} color="black" />
        )
    }

    return (
        <Extrato>
            <ContainerInfo>
                <IconeExtrato>
                    {
                        exibirIcone()
                    }
                </IconeExtrato>
                <ContainerDescricao>
                    <TxtDescricao>
                        {props.data.categoria.descricao}
                    </TxtDescricao>
                    <TxtData>
                        {props.data.descricao}
                    </TxtData>
                    <TxtData>
                        {props.data.dataCriacao.slice(0, 10)}
                    </TxtData>
                </ContainerDescricao>
            </ContainerInfo>
            <TxtValorExtrato>
                {props.data.movimentacao.codigo == 1 ? "+ " : "- "}
                R$
                {props.exibirValor == true ? " " + props.data.valor.toFixed(2) : " ****"}
            </TxtValorExtrato>
        </Extrato>
    );
}