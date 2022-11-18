import styled from "styled-components";

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