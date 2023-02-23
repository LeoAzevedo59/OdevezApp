import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
flex: 1;
padding-left: 16px;
padding-right: 16px;
background-color: #eee;
`;

export const ContainerInput = styled.View`
width: 100%;
height: 64px;
background-color: #fff;
border-radius: 8px;
flex-direction: row;
align-items: center;
`;

export const IconeInput = styled.View`
height: 100%;
width: 20%;
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
background-color: #D6D6D6;
align-items: center;
justify-content: center;
`;

export const Input = styled.TextInput`
width: 45%;
padding: 16px;
`;

export const InputFull = styled.TextInput`
width: 65%;
padding: 16px;
`;

export const ContainerTaxa = styled.View`
width: 35%;
font-size: 10px;
`;

export const Texto = styled.Text`
margin-bottom: 8px;
margin-top: 16px;
`;

export const TextoBotao = styled.Text`
font-size: 18px;
font-weight: 500;
`;

export const Botao = styled.TouchableOpacity`
background-color: #FAFF00;
height: 64px;
width: 100%;
border-radius: 16px;
align-items: center;
justify-content: center;
`;

export const AreaInput = styled.ScrollView``;

export const ContainerValue = styled.View`
margin-top: 24px;
margin-bottom: 24px;
`;

export const LblLimpar = styled.Text`
text-align: center;
margin-top: 16px;
margin-bottom: 16px;
color: #e60000;
`;