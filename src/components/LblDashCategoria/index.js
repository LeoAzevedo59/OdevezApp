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

let MovimentacaoEnum = {
    Todos: 0,
    Entrada: 1,
    Saida: 2
}


export default function LblDashCategoria(props) {
    const negativo = props.data.movimentacao === MovimentacaoEnum.Saida ? '-' : '';
    const corExpandMore = props.data.movimentacao === MovimentacaoEnum.Saida ? 'red' : 'green';
    return (
        <SafeAreaView>
            <ContainerCategoria>
                <Cor style={{ backgroundColor: props.data.cor }} />
                <ContainerTextoCategoria>
                    <H1>{props.data.categoria.substring(0, 22)}</H1>
                    {
                        props.data.movimentacao === undefined ?
                            <Row>
                                <TxtDinheiro style={{marginRight: 8}}>R$ {props.data.valor}</TxtDinheiro>
                                
                            </Row>
                            :
                            <Row>
                                <TxtDinheiro>R$ {negativo}{props.data.valor.toFixed(2)}</TxtDinheiro>
                                <MaterialIcons name="expand-more" size={24} color={corExpandMore} />
                            </Row>
                    }

                </ContainerTextoCategoria>
            </ContainerCategoria>
        </SafeAreaView>
    );
}