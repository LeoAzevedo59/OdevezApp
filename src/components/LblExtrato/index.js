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
    ContainerInfo,
    StatusExtrato
} from './styles';
import { SafeAreaView, StyleSheet } from 'react-native';
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
            return (<MaterialIcons name="attach-money" size={24} color="#333" />)
        }

        return (
            <MaterialCommunityIcons name={nome} size={24} color="#333" />
        )
    }

    return (
        <SafeAreaView>
             <Extrato onPress={() => props.resumido !== true && props.metodo(props.data.codigo, props.data.carteira.codigo, props.data.status, props.data.valor)}>
                <ContainerInfo>
                    <IconeExtrato>
                        {
                            exibirIcone()
                        }
                        <StatusExtrato
                            style={[
                                props.data.status === 1 ? styles.Efetivado : styles.Pendente
                            ]}
                        />
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
                <ContainerInfo>
                    <TxtValorExtrato>
                        R$
                        {props.exibirValor === true ? " " + props.data.valor.toFixed(2) : " ****"}
                    </TxtValorExtrato>
                    <MaterialIcons name="expand-more" size={24} color="black" />
                </ContainerInfo>
            </Extrato>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Pendente: {
        backgroundColor: 'orange'
    },
    Efetivado: {
        backgroundColor: 'green'
    }
})