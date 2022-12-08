import styled from "styled-components";

export const ContainerObjetivo = styled.View`
flex-direction: row;
margin-top: 24px;
margin-left: 16px;
`;

export const Objetivo = styled.TouchableOpacity`
width: 140px;
height: 200px;
border-radius: 8px;
padding: 8px;
background-color: #bfbfbf;
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
