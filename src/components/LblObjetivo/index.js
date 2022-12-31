
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import {
    Container,
    Left,
    Right,
    H1,
    H2,
    H3,
    BackgroundProgress,
    ProgressBar,
    Div,
    ContainerLeft
} from './styles';
import {
    Feather,
    Ionicons
} from '@expo/vector-icons';

export default function LblObjetivo(props) {
    const progress = 25; // 0 a 9 - 3 | 100 - 10 menos

    return (
        <SafeAreaView>
            <Container style={styles.shadow}>
                <Left>
                    <ContainerLeft>
                        <Div>
                            <Feather name="target" size={24} color="#333" />
                            <H1>Praia</H1>
                        </Div>
                        <H3>Objetivo Compartilhado</H3>
                        <Div>
                            <H3>R$</H3>
                            <H1>2.532,23</H1>
                        </Div>
                    </ContainerLeft>
                    <View>
                        <H3 style={{ marginLeft: progress - 3 }}>{progress}%</H3>
                        <BackgroundProgress />
                        <ProgressBar style={{ width: progress }} />
                    </View>
                </Left>
                <Right onPress={() => props.metodo(true)}>
                    <Feather name='more-horizontal' size={24} color="#333" />
                    <H3>Objetivo final</H3>
                    <Div>
                        <H3>R$</H3>
                        <H2>3.500,00</H2>
                    </Div>
                    <H3>últimos 30 dias</H3>
                    <Div>
                        <H3>R$</H3>
                        <H2>125,80</H2>
                    </Div>
                    <H3>+ 20,82%</H3>
                </Right>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadow: {
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
    }
});