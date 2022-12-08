import {
    Container,
    Cor,
    Texto
} from './styles';

import { StyleSheet } from 'react-native';

export default function LblTipoCarteira(props) {
    return (
        <Container
            style={[
                props.selected === props.data && styles.selected
            ]}
            onPress={() => props.metodo(props.data.codigo, props.data)}>
            <Cor
                style={[
                    props.selected === props.data && styles.selectedContainer
                ]}
            />
            <Texto
                style={[
                    props.selected === props.data && styles.selectedText
                ]}
            >{props.data.descricao}</Texto>
        </Container>
    )
}

const styles = StyleSheet.create({
    selected: {
        backgroundColor: 'red',
        borderColor: 'red'
    },
    selectedText: {
        color: 'white'
    },
    selectedContainer: {
        backgroundColor: '#DC1111'
    }
});
