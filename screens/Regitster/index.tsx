import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, StyledText, Block, StyledTextInput, StyledButton, NumberTextInput, StyledVerifybutton, Buttontext } from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
import { fetchFromApi } from '../../utils/axios';
import { AxiosResponse } from 'axios';
import './interface'
import Header from '../../components/layout/header';
const Register = ({ navigation }: any) => {
  const [verify, setVerify] = useState<boolean>(false)
  const [jobSetting, setJob] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserFormData>({
    userAccount: "",
    userPassword: "",
    nickName: "",
    userPhoneNum: "",
    gender: "",
    job: "",
    dateOfBirth: ""
  });
  const [detailJob, setDetailJob] = useState<string>("");
  const onChangeText = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const jobHandleEvent = (value:string)=>{
    if (value === '기타'){
      setJob(true);
    } else {
      setJob(false);
    }
    onChangeText("job", value);
  } 
  const registerUserInfo = async () => {
  
    try {
      let data;
      if (formData.job === "기타") {
        data = {...formData,  job: detailJob}
      } else{
        data = {...formData}
      } 
      const res: AxiosResponse = await fetchFromApi('POST',`/users/sign-up`, data);
      console.log(res.data);
      navigation.navigate('Home')
    } catch (error: any) {
      if (error.response) {
        // 서버로부터 응답이 도착한 경우
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);
      } else if (error.request) {
        // 서버로 요청이 전송되지 않은 경우
        console.log('Request:', error.request);
      } else {
        // 오류가 발생한 경우
        console.log('Error:', error.message);
      }
    }
  };

  return (
      <Container>
        <Header title={"회원가입"}/>
          <StyledText>닉네임</StyledText>
          <StyledTextInput
            value={formData.nickName}
            onChangeText={(text: string) => onChangeText("nickName", text)}
            placeholder={"8~15자 이내로 작성해주세요"}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <StyledText>아이디</StyledText>
          <StyledTextInput
            value={formData.userAccount}
            onChangeText={(text: string) => onChangeText("userAccount", text)}
            placeholder={"8~15자 이내로 작성해주세요"}
            maxLength={15}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <StyledText>비밀번호</StyledText>
          <StyledTextInput
            secureTextEntry={true}
            value={formData.userPassword}
            onChangeText={(text: string) => onChangeText("userPassword", text)}
            placeholder={"영문,숫자,특수기호를 포함하여 8~15자 이내로 작성해주세요"}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <StyledTextInput
            secureTextEntry={true}
            placeholder={"다시 한 번 작성해주세요"}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
        <StyledButton onPress={() => registerUserInfo()}>
          <Buttontext>가입하기</Buttontext>
        </StyledButton>
      </Container>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginHorizontal: 20,
    marginVertical: 3,
    height: 45,
    paddingLeft: 10,
    borderWidth:1,
    borderColor: "lightgrey",
  },
  inputAndroid: {
    marginHorizontal: 20,
    marginVertical: 3,
    height: 45,
    borderWidth:1,
    paddingLeft: 10,
    borderColor: "lightgrey",
  },
});

export default Register;