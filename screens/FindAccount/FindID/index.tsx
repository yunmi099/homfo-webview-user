import React,{useState} from "react";
import { View, Text, Button, TouchableOpacity} from "react-native"
import { Container, NotifyText } from "../style";
import Header from "../../../components/layout/header";
import PhoneAuth from "../../../components/phonenumberAuthentication";
import ConfirmButton from "../../../components/button/confirmButton";
const FindID = () => {
    const [verifyComplete, setVerifyComplete] = useState(false);
    return(
    <Container>
        <Header title={"아이디 찾기"}/>
        <NotifyText>가입하신 전화번호를{"\n"}입력해주세요.</NotifyText>
        <PhoneAuth verifyComplete={verifyComplete} setVerifyComplete={setVerifyComplete}/>
        {verifyComplete&&<ConfirmButton title={"확인"}/>}
    </Container>
);
}
export default FindID;