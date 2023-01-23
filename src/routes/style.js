import styled from 'styled-components/native';

export const Container = styled.View`
background-color: #F4F811;
height: 60px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 16px;
`;

export const ContainerPerfil = styled.TouchableOpacity`
position: relative;
flex-direction: row;
`;

export const Notificacao = styled.Text`
background-color: #212121;
width: 16px;
height: 16px;
color: #FAFF00;
border-radius: 50px;
text-align: center;
font-size: 12px;
position: absolute;
margin-left: 36px;
`;

export const ContainerIcons = styled.View`
width: 120px;
flex-direction: row;
justify-content: space-between;
`;

export const ImgPerfil = styled.View`
width: 40px;
height: 40px;
border-radius: 50px;
background-color: #333;
align-items: center;
justify-content: center;
`;

export const NomeUsuario = styled.Text`
padding-left: 8px;
font-size: 16px;
`;

export const TxtPerfil = styled.Text`
font-size: 10px;
padding-left: 8px;
color: #333;
`;

export const Icone = styled.Image`
height: 20px;
width: 20px;
`;