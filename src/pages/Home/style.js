import styled from 'styled-components';

export const Background = styled.KeyboardAvoidingView` 
background-color: #F3F3F3;
padding: 16px;
`;

// PATRIMONIO

export const PatrimonioClick = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 24px;
`;

export const ContainerPatrimonio = styled.View`
`;

export const TxtPatrimonio = styled.Text`
font-size: 16px;
font-weight: bold;
`;

export const TxtValorPatrimonio = styled.Text`
font-size: 20px;
font-weight: 400;
`;

//OBJETIVO

export const ContainerObjetivo = styled.View`
flex-direction: row;
margin-top: 24px;
`;

export const Objetivo = styled.TouchableOpacity`
width: 140px;
height: 200px;
border-radius: 8px;
margin-left: 16px;
padding: 8px;
background-color: #EEEEEE;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const ContainerIcones = styled.View`
flex-direction: row;
justify-content: space-between;
`;

export const TxtObjetivoDescricao = styled.Text`
margin-top: 8px;
`;

export const TxtValorObjetivo = styled.Text`
text-align: right;
margin-top: 80px;
`;

export const BarraProgressaoBackground = styled.View`
width: 100px;
height: 6px;
margin-top: 6px;
align-self: center;
border-radius: 8px;
position: relative;
background-color: rgba(17, 17, 17, 0.4);
`;

export const BarraProgressao = styled.View`
width: 25px;
height: 6px;
border-radius: 8px;
position: absolute;
top: 164px;
left: 20px;
background-color: yellow;
`;

export const TxtValorPorcentagem = styled.Text`
width: 100%;
text-align: center;
font-size: 12px;
margin-top: 6px;
`;

// INICIO EXTRATO

export const ContainerExtrato = styled.View`
width: 100%;
height: 80px;
margin-top: 24px;
align-items: center;
`;

export const Extrato = styled.TouchableOpacity`
width: 100%;
border-bottom-width: 1px;
border-bottom-color: #ddd;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 16px;
padding-bottom: 6px;
`;

export const IconeExtrato = styled.View`
width: 32px;
height: 32px;
background-color: yellow;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

export const ContainerDescricao = styled.View`
margin-left: 16px;
`;

export const TxtDescricao = styled.Text`
text-transform: uppercase;
font-size: 12px;
font-weight: bold;
`;

export const TxtData = styled.Text`
font-size: 10px;
font-weight: 300;
`;

export const TxtValorExtrato = styled.Text`
`;

export const ContainerInfo = styled.View`
flex-direction: row;
align-items: center;
`;

export const TxtMaisExtrato = styled.Text`
margin-top: 16px;
`;