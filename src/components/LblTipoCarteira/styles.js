import styled from "styled-components";

export let Container = styled.TouchableOpacity`
border: 1px solid #FFA881;
height: 32px;
justify-content: center;
align-items: center;
margin-right: 16px;
flex-direction: row;
position: relative;
border-radius: 8px;
`;

export const Cor = styled.View`
background-color: #FFA881;
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