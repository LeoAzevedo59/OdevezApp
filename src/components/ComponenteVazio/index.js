import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Main,
    TxtAdicionar
} from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function ComponenteVazio(props) {
    const navigation = useNavigation();

    return (
        <Container onPress={() => navigation.navigate(props.link)}>
            <Main>
                <Ionicons name="add-circle-outline" size={24} color="black" />
                <TxtAdicionar>Adicionar {props.componente}</TxtAdicionar>
            </Main>
        </Container>
    );
}