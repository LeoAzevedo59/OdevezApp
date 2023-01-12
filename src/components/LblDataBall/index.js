import {
    Container,
    Texto
} from './styles';
import { StyleSheet } from 'react-native';

export default function LblDataBall(props) {
    return (
        <Container style={[
            props.data === props.valorData ? styles.itemSelected : styles.default
        ]}
            onPress={() => props.selectedData(props.data)} >
            <Texto style={[
                props.data === props.valorData ? styles.textSelected : styles.default
            ]}>
                {props.data}
            </Texto>
        </Container>
    )
}

const styles = StyleSheet.create({
    itemSelected: {
        backgroundColor: '#333',
        borderColor: '#333'
    },
    textSelected: {
        color: '#fff23d'
    },
    default: {}
});