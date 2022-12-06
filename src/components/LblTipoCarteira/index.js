import {
    Container,
    Cor,
    Texto
} from './styles';

export default function LblTipoCarteira(props) {
    return (
        <Container onPress={() => props.metodo(props.data.codigo)}>
            <Cor />
            <Texto>{props.data.descricao}</Texto>
        </Container>
    )
}
