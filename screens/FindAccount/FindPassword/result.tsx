import React,{useState} from "react";
import { View, Text, Button, TouchableOpacity} from "react-native"
import { Container, NotifyText } from "../style";
import Header from "../../../components/layout/header";
import PhoneAuth from "../../../components/phonenumberAuthentication";
import ConfirmButton from "../../../components/button/confirmButton";
const ResultPassword = ({navigation}:any) => {
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
        <NotifyText>비밀번호를 재설정 해주세요</NotifyText>
        
    </Container>
);
}
export default ResultPassword;