import styled from 'styled-components/native';

export const Background = styled.KeyboardAvoidingView` 
flex:1;
background-color: #F3F3F3;
`;

export const AreaCadastro = styled.ScrollView`
`;

export const Container = styled.View`
flex: 1;
padding: 20px;
`;

export const AreaInput = styled.View`
margin-top: 16px;
margin-bottom: 16px;
`;

export const Input = styled.TextInput`
border-bottom-width: 1px;
height: 40px;
padding-left: 6px;
`;

export const InputMenor = styled.TextInput`
border-bottom-width: 1px;
height: 40px;
width: 80px;
padding-left: 6px;
`;

export const Btn = styled.TouchableOpacity`
background-color: #FAFF00;
height: 64px;
width: 100%;
border-radius: 16px;
align-items: center;
justify-content: center;
margin-top: 32px;
`;

export const BtnTxt = styled.Text`
font-size: 16px;
text-align: center;
margin-top: 8px;
`;

export const Div = styled.TouchableOpacity`
width: 100%;
height: 40px;
border-bottom-width: 1px;
align-items: flex-start;
justify-content: center;
`;

export const Data = styled.Text`
padding-left: 5px;
`;

export const Texto = styled.Text`
margin-top: 8px;
font-weight: 500;
`;

export const TxtEntrar = styled.Text`
font-size: 24px;
`;

export const BtnEntrar = styled.TouchableOpacity`
background-color: #FAFF00;
height: 64px;
width: 100%;
border-radius: 16px;
align-items: center;
justify-content: center;
margin-top: 32px;
margin-bottom: 16px;
`;

export const Row = styled.View`
border-bottom-width: 1px;
margin-top: -8px;
`;

export const Erro = styled.Text`
color: #e60000;
padding-top: 4px;
`;

export const ContainerData = styled.View`
align-items: center;
`;

export const InputData = styled.TouchableOpacity`
border: 1px solid #333;
height: 40px;
padding-left: 6px;
border-radius: 8px;
width: 64px;
margin-top: 16px;
align-items: center;
`;

export const FlexDirectionRow = styled.View`
flex-direction: row;
justify-content: space-between;
`;

export const ContainerBtnData = styled.View`
width: 100%;
height: 100%;
`;

export const TextoBanco = styled.Text`
margin: 16px 0;
font-size: 16px;
padding-left: 6px;
`;

export const ContainerBanco = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-right: 14px;
`;

export const ContainerPesquisaBanco = styled.View`
align-items: center;
width: 100%;
margin-top: 16px;
flex-direction: row;
justify-content: space-evenly;
`;

export const InputPesquisa = styled.TextInput`
background-color: #eeeeee;
width: 80%;
height: 48px;
border-radius: 8px;
padding-left: 16px;
padding-right: 32px;
`;

export const IconePesquisaBanco = styled.View`
position: absolute;
top: 16px;
right: 64px;
z-index: 99;
`;

export const BtnLimpar = styled.TouchableOpacity`
width: 32px;
height: 32px;
align-items: center;
justify-content: center;
`;

export const TextoNomeBanco = styled.Text`
padding: 8px;
`;

export const BotaoNomeBanco = styled.TouchableOpacity`
background-color: #f3f6f4;
margin-top: 8px;
margin-bottom: 8px;
width: 90%;
border-radius: 8px;
`;