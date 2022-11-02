import styled from 'styled-components/native';

export const Background = styled.KeyboardAvoidingView` 
flex:1;
background-color: #F3F3F3;
padding: 16px;
`;

export const ContainerButton = styled.ScrollView`
`;

export const Botao = styled.TouchableOpacity`
width: 100%;
height: 64px;
justify-content: flex-start;
align-items: center;
padding-left: 16px;
border-radius: 8px;
background-color: #eee;
margin-bottom: 16px;
flex-direction: row;
`;

export const TextoBotao = styled.Text`
font-size: 16px;
margin-left: 16px;
text-transform: uppercase;
`;


