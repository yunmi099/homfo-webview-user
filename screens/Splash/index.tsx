import React from "react";
import { View, Text} from "react-native"
import styled from 'styled-components/native';
const Splash = ({ navigation }) => {
    setTimeout(() => navigation.navigate('로그인'), 1000);
    return(
    <Container>
        <StyledText>Hom fo</StyledText>
    </Container>
);
}
export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
export const StyledText = styled.Text`
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #6C00F8;
`;
export default Splash;