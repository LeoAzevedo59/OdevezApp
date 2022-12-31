import styled from "styled-components";

export const Objetivo = styled.TouchableOpacity`
width: 140px;
height: 200px;
border-radius: 16px;
padding: 8px;
margin-right: 8px;
margin-left: 8px;
border-radius: 16px;
background-color: #f2f2f2;
margin-top: 4px;
flex-direction: column;
justify-content: space-between;
`;

export const BackgroundProgress = styled.View`
background-color: #333;
width: 100px;
height: 8px;
border-radius: 8px;
position: relative;
`;

export const ProgressBar = styled.View`
position: absolute;
height: 8px;
background-color: #F4F811;
top: 20px;
left: 0;
border-radius: 3px;
`;

export const H1 = styled.Text`
font-weight: bold;
font-size: 18px;
margin-left: 4px;
`;

export const H2 = styled.Text`
font-size: 16px;
margin-left: 4px;
font-weight: bold;
`;

export const H3 = styled.Text`
font-size: 10px;
margin-top: 6px;
text-align: right;
`;

export const H4 = styled.Text`
font-size: 10px;
margin-left: 6px;
`;

export const Div = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`;


export const Right = styled.View`
align-items: flex-end;
`;

export const Container = styled.View`
height: 100px;
`;