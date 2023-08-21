import React,{useState} from "react";
import { Container, NotifyText } from "../style";
import Header from "../../../components/layout/header";
import PhoneAuth from "../../../components/phonenumberAuthentication";
import ConfirmButton from "../../../components/button/confirmButton";
const FindPassword = ({navigation}:any) => {
    const [verifyComplete, setVerifyComplete] = useState(false);
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
        <NotifyText>가입하신 전화번호를{"\n"}입력해주세요.</NotifyText>
        <PhoneAuth verifyComplete={verifyComplete} setVerifyComplete={setVerifyComplete}/>
        {verifyComplete&&<ConfirmButton navigation={navigation} title={"확인"} location="비밀번호찾기결과"/>}
    </Container>
);
}
export default FindPassword;
