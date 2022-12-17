import styled from "styled-components";

export const CarteiraContainer = styled.View`
height: 124px;
margin-bottom: 18px;
margin-top: 4px;
background-color: transparent;
flex-direction: row;
margin-left: 16px;
margin-right: 16px;
justify-content: space-between;
`;

export const InfoCarteira = styled.TouchableOpacity`
background-color: #f2f2f2;
height: 100%;
width: 70%;
padding: 8px;
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
`;

export const HeaderInfo = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 6px;
`;

export const CarteiraDesc = styled.Text`
font-size: 18px;
color: #333;
font-weight: bold;
margin-left: 6px;
`;

export const InfoFooter = styled.View`
margin-top: 24px;
`;

export const TextoLowOpacity = styled.Text`
color: #333;
opacity: 0.8;
font-size: 12px;
`;

export const Texto = styled.Text`
color: #333;
`;

export const AltCarteira = styled.TouchableOpacity`
background-color: #f2f2f2;
height: 100%;
width: 30%;
padding: 6px;
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
`;

export const AltFooter = styled.View`
margin-top: 48px;
align-items: flex-end;
`;

export const AltHeader = styled.View`
align-items: flex-end;
`;