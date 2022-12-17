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
                props.selected === props.data && styles.selected, styles.shadow
            ]}
            onPress={() => props.metodo(props.data.codigo, props.data)}
        >
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
        backgroundColor: '#333',
        borderWidth: 0
    },
    selectedText: {
        color: '#fff'
    },
    selectedContainer: {
        backgroundColor: '#333'
    },
    shadow: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
    }
});
