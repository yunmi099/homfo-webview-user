import React from "react";
import { View, Text, TouchableOpacity} from "react-native"
import {BoxContainer, HorizontalLine, LineContainer,NumberInput} from "./style";
import { TextInput } from "react-native-gesture-handler";
import AuthButton from "./AuthButton";
const PhoneAuth = () => {
    return(
        <BoxContainer>
            <Text style={{marginBottom:'3%', fontSize:17.5}}>전화번호</Text>
            <LineContainer>
                <NumberInput placeholder="000-0000-0000"></NumberInput>
                <AuthButton title="인증요청"/>
            </LineContainer>
            <HorizontalLine></HorizontalLine>
            <LineContainer>
                <NumberInput placeholder="인증번호를 입력해주세요"></NumberInput>
                <AuthButton title="인증확인"/>
            </LineContainer>
            <HorizontalLine></HorizontalLine>
        </BoxContainer>
);
}
export default PhoneAuth;