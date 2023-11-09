import React from "react";
import { View, Text} from "react-native"
import { Container, StyledText } from "./style";
const Splash = ({ navigation }: any) => {
    setTimeout(() => navigation.navigate('로그인'), 1000);
    return(
    <Container>
        <StyledText>Hom fo</StyledText>
    </Container>
);
}
export default Splash;