//#region imports
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import {
    Objetivo,
    ProgressBar,
    BackgroundProgress,
    H1,
    H2,
    H3,
    H4,
    Div,
    Container,
    Right
} from './styles';
import {
    Feather,
    FontAwesome,
    AntDesign
} from '@expo/vector-icons';
//#endregion

export default function LblObjetivoSimplificado(props) {
    const navigation = useNavigation();
    const progress = 87; // 0 a 9 - 3 | 100 - 10 menos

    return (
        <Objetivo style={styles.shadow} onPress={() => navigation.navigate('Objetivo')}>
            <Container>
                <Div>
                    <Feather name="target" size={16} color="#333" />
                    <H4>{props.data.descricao}</H4>
                </Div>
                <Div>
                    <FontAwesome name={props.data.tipo} size={16} color="#333" />
                    <H4>Compartilhado</H4>
                </Div>
                <Div>
                    <AntDesign name="calendar" size={16} color="#333" />
                    <H4>28/08/2023</H4>
                </Div>
            </Container>
            <Right>
                <Div>
                    <H3>R$</H3>
                    <H2>{props.exibirValor == true ? props.data.valor : " ****"}</H2>
                </Div>
            </Right>
            <View>
                <H3 style={{ marginLeft: progress - 3 }}>{progress}%</H3>
                <BackgroundProgress />
                <ProgressBar style={{ width: progress }} />
            </View>
        </Objetivo>
    );
}

const styles = StyleSheet.create({
    shadow: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
    }

});