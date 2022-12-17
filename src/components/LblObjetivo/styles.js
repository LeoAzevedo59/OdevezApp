import styled from "styled-components";

export const Container = styled.View`
margin-left: 16px;
margin-right: 16px;
height: 164px;
border-radius: 8px;
flex-direction: row;
background-color: #f2f2f2;
`;

export const Left = styled.View`
width: 60%;
height: 100%;
padding-left: 8px;
padding-top: 8px;
justify-content: space-between;
`;

export const Right = styled.TouchableOpacity`
width: 40%;
height: 100%;
padding-right: 8px;
padding-top: 8px;
align-items: flex-end;
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

export const Div = styled.View`
flex-direction: row;
align-items: flex-end;
`;

export const ContainerLeft = styled.View`
`;