import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Background, ContainerButton, Botao, TextoBotao} from './styles';

export default function Mais() {
    const { Deslogar } = useContext(AuthContext);

    return (
        <Background>
            <ContainerButton>
                <Botao onPress={() => Deslogar()}>
                    <TextoBotao>Deslogar</TextoBotao>
                </Botao>
            </ContainerButton>
        </Background>
    );
}