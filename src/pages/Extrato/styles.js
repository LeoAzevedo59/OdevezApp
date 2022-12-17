import styled from "styled-components";

export const Container = styled.View`
padding: 16px;
`;

export const Header = styled.View`
background-color: #333;
width: 100%;
height: 90px;
flex-direction: row;
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
`;

export const Left = styled.TouchableOpacity`
width: 20%;
justify-content: center;
align-items: flex-start;
padding-left: 16px;
`;

export const Center = styled.View`
width: 60%;
align-items: center;
justify-content: center;
`;

export const Right = styled.TouchableOpacity`
width: 20%;
justify-content: center;
align-items: flex-end;
padding-right: 16px;
`;

export const H1 = styled.Text`
color: white;
font-size: 20px;
font-weight: bold;
margin-bottom: 4px;
`;

export const H2 = styled.Text`
color: white;
font-size: 12px;
`;

export const DataTxt = styled.Text`
color: white;
font-size: 12px;
text-align: center;
padding-top: -16px;
`;

export const ContainerCarteira = styled.View`
width: 100%;
height: 45px;
border-radius: 8px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const Bank = styled.View`
flex-direction: row;
align-items: center;
`;

export const Calendar = styled.View`
flex-direction: row;
align-items: center;
`;


export const ContainerExtrato = styled.View`
border: 1px solid red;
`;
