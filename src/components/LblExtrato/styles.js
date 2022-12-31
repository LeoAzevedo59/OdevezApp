import styled from "styled-components";

export const Extrato = styled.TouchableOpacity`
width: 100%;
border-bottom-width: 1px;
border-bottom-color: #ddd;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 12px;
padding-bottom: 6px;
padding-left: 16px;
padding-right: 16px;
`;

export const IconeExtrato = styled.View`
width: 32px;
height: 32px;
background-color: #F4F811;
border-radius: 100px;
align-items: center;
justify-content: center;
position: relative;
`;

export const StatusExtrato = styled.View`
width: 10px;
height: 10px;
border-radius: 100px;
background-color: orange;
position: absolute;
right: 0;
top: 20px;
border: 1px solid #eee;
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