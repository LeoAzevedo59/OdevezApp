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
                props.selected === props.data ? styles.selected : styles.styleInput
            ]}
            onPress={() => props.metodo(props.data.codigo, props.data)}>
            <Cor
                style={[
                    props.selected === props.data ? styles.selected : styles.styleInput
                ]}
            />
            <Texto
                style={[
                    props.selected === props.data ? styles.selectedText : styles.styleInput
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
    }
});
