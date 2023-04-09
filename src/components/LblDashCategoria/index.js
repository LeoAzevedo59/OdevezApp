import { SafeAreaView } from 'react-native';
import {
    H1,
    TxtDinheiro,
    ContainerTextoCategoria,
    ContainerCategoria,
    Cor,
    Row
} from './styles';
import {
    MaterialIcons
} from '@expo/vector-icons';
import { FormatReais } from '../Mascara';

let MovimentacaoEnum = {
    Todos: 0,
    Entrada: 1,
    Saida: 2
}


export default function LblDashCategoria(props) {
    const negativo = props.data.movimentacao === MovimentacaoEnum.Saida ? '-' : '';
    const corExpandMore = props.data.movimentacao === MovimentacaoEnum.Saida ? 'red' : 'green';

    let value = parseFloat(props.data.valor.replace('.', '').replace(',', '.'));

    return (
        <SafeAreaView>
            <ContainerCategoria>
                <Cor style={{ backgroundColor: props.data.cor }} />
                <ContainerTextoCategoria>
                    <H1>{props.data.categoria.substring(0, 22)}</H1>
                    {
                        props.data.movimentacao === undefined ?
                            <Row>
                                <TxtDinheiro style={{ marginRight: 8 }}>{props.exibirValor === true ? " " + FormatReais(value) : " ****"}</TxtDinheiro>
                            </Row>
                            :
                            <Row>
                                <TxtDinheiro>R$ {negativo}{props.exibirValor === true ? " " + FormatReais(props.data.valor) : " ****"}</TxtDinheiro>
                                <MaterialIcons name="expand-more" size={24} color={corExpandMore} />
                            </Row>
                    }

                </ContainerTextoCategoria>
            </ContainerCategoria>
        </SafeAreaView>
    );
}