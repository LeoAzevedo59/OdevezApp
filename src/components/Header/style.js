import styled from 'styled-components/native';

export const Container = styled.View`
background-color: #FAFF00;
height: 80px;
width: 100%;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 16px;
`;

export const ContainerPerfil = styled.View`
position: relative;
flex-direction: row;
`;

export const Notificacao = styled.Text`
background-color: black;
width: 16px;
height: 16px;
color: #FAFF00;
border-radius: 50px;
text-align: center;
font-size: 12px;
position: absolute;
margin-left: 48px;
`;

export const ContainerIcons = styled.View`
width: 120px;
flex-direction: row;
justify-content: space-between;
`;

export const ImgPerfil = styled.Image`
width: 64px;
height: 64px;
border-radius: 50px;
`;

export const NomeUsuario = styled.Text`
padding-left: 8px;
font-size: 16px;
font-weight: bold;
`;

export const Icone = styled.Image`
height: 20px;
width: 20px;

`;