import React from "react";
import { View, Text} from "react-native"
import { Container, StyledText } from "../style";
import Header from "../../../components/layout/header";
const FindPassword = () => {
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
    </Container>
);
}
export default FindPassword;