import styled from 'styled-components/native';

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

// CARTAO

export const Container = styled.View`
justify-content: space-between;
flex-direction: column;
height: 100%;
`;

export const Cartao = styled.TouchableOpacity`
width: 100%;
height: 124px;
border-radius: 8px;
margin-top: 24px;
background-color: #FF3F3F;
padding: 6px;
`;

export const Header = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
`;

export const ContainerHeader = styled.View`

`;

export const ContainerNome = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 6px;
`;

export const TxtNomeBanco = styled.Text`
font-size: 18px;
color: white;
font-weight: bold;
margin-left: 6px;
`;

export const TxtDescricao = styled.Text`
color: white;
opacity: 0.8;
font-size: 12px;
`;

export const Footer = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
`;

export const ContainerVencimento = styled.View``;

export const TxtDataVencimento = styled.Text`
color: white;
`;

export const TxtValorBanco = styled.Text`
color: white;
`;

export const ContainerSaldo = styled.View``;
