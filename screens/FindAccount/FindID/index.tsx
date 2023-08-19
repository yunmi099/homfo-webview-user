import React from "react";
import { View, Text} from "react-native"
import { Container, NotifyText } from "../style";
import Header from "../../../components/layout/header";
import PhoneAuth from "../../../components/phonenumberAuthentication";
import NoneActiveButton from "../../../components/phonenumberAuthentication/NoneActiveButton";
const FindID = () => {
    return(
    <Container>
        <Header title={"아이디 찾기"}/>
        <NotifyText>가입하신 전화번호를{"\n"}입력해주세요.</NotifyText>
        <PhoneAuth/>
    </Container>
);
}
export default FindID;