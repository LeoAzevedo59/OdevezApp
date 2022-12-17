import styled from "styled-components";

export let Container = styled.TouchableOpacity`
height: 32px;
justify-content: center;
align-items: center;
flex-direction: row;
position: relative;
border-radius: 8px;
background-color: #f2f2f2;
margin-top: 2px;
margin-right: 8px;
margin-left: 8px;
`;

export const Cor = styled.View`
background-color: #333;
width: 10px;
height: 100%;
position: absolute;
left: 0;
top: 0;
border-top-left-radius: 7px;
border-bottom-left-radius: 7px;
`;

export const Texto = styled.Text`
padding-left: 16px;
padding-right: 16px;
text-transform: uppercase;
`;