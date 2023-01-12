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
border: 1px solid red;
width: 100%;
height: 100%;
`;