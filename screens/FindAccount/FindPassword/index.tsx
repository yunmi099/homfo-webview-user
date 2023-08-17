import React from "react";
import { View, Text} from "react-native"
import { Container, NotifyText } from "../style";
import Header from "../../../components/layout/header";
const FindPassword = () => {
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
        <NotifyText>가입하신 전화번호를{"\n"}입력해주세요.</NotifyText>
    </Container>
);
}
export default FindPassword;