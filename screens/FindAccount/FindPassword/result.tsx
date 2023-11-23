import React,{useState} from "react";
import { View, Text, Button, TouchableOpacity, TextInput} from "react-native"
import { ButtonText, Container, InputContainer, NotifyText, StyledTextInput } from "../style";
import Header from "../../../components/layout/header";
import { xButton } from "../../../assets/icons/register/registerIcon";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const ResultPassword = ({navigation}:any) => {
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
        <NotifyText>비밀번호를 재설정 해주세요</NotifyText>
        <InputContainer>
            <StyledTextInput 
                placeholder="새 비밀번호를 입력하세요."
                placeholderTextColor ="lightgrey"
                // value = {password}
                // onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize={"none"}
            />
            <TouchableOpacity><Image source={xButton} style={{width: 17, height:17}}/></TouchableOpacity>
        </InputContainer>
        <Text></Text>
        <InputContainer>
            <StyledTextInput 
                placeholder="새 비밀번호를 한번 더 확인해주세요."
                placeholderTextColor ="lightgrey"
                // value = {password}
                // onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize={"none"}
            />
            <TouchableOpacity><Image source={xButton} style={{width: 17, height:17}}/></TouchableOpacity>
        </InputContainer>   
        <Text></Text>
        <TouchableOpacity>            
            <LinearGradient
              colors={['#842CFF', '#7674F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{width:"90%", height: 52, alignItems:'center', justifyContent:'center', marginLeft: '5%', marginTop: 30}}
            ><ButtonText>비밀번호 변경</ButtonText>
            </LinearGradient>
        </TouchableOpacity>
    </Container>
);
}
export default ResultPassword;