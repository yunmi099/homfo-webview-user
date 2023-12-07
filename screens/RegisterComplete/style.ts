import styled from 'styled-components/native';
export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color:white;
  align-items:center;
  justify-content:center;
`;
export const TextContainer = styled.View`
    flex-direction: row;
    margin-top: 30px;
`;

export const PurpleText = styled.Text`
    color: #842CFF;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
`;

export const NormalText = styled.Text`
    text-align: center;
    font-size: 25;
    color: black;
    font-weight: 400;
`;