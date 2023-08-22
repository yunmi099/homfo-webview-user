import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, StyledText, Block, StyledTextInput, StyledButton, NumberTextInput, StyledVerifybutton, Buttontext } from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
import { fetchFromApi } from '../../utils/axios';
import { AxiosResponse } from 'axios';
import './interface'
import Header from '../../components/layout/header';
import PhoneAuth from '../../components/phonenumberAuthentication';
import ConfirmButton from '../../components/button/confirmButton';
const Register = ({ navigation }: any) => {
  const [jobSetting, setJob] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [verifyComplete, setVerifyComplete]=useState(false);
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
        {step===0&&
        <>
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
        </>}
        {step===1&&
        <>
          <StyledText>성별</StyledText>
          <RNPickerSelect
            placeholder={{
              label: "성별",
            }}
            textInputProps={{ underlineColorAndroid: 'transparent' }}
            value={formData.gender}
            onValueChange={(value: string) => onChangeText("gender", value)}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            items={[
              { label: '남성', value: 'M' },
              { label: '여성', value: 'W' },
            ]}
            style={pickerSelectStyles}
          />
          <StyledText>생년월일</StyledText>
          <DatePickerModal setBirth={setFormData} />
          <StyledText>직업</StyledText>
          <RNPickerSelect
            textInputProps={{ underlineColorAndroid: 'transparent' }}
            placeholder={{
              label: "직업",
            }}
            fixAndroidTouchableBug={true}
            value={formData.job}
            onValueChange={(value: string) => jobHandleEvent(value)}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: '학생', value: '학생'},
              { label: '직장인', value: '직장인'},
              { label: '자영업자', value: '자영업자'},
              { label: '프리랜서', value: '프리랜서'},
              { label: '주부', value: '주부'},
              { label: '기타', value: '기타'},
            ]}
            style={pickerSelectStyles}
          />
          {jobSetting? <StyledTextInput placeholder={"20자 이내로 작성해주세요"} 
                value={detailJob}
                onChangeText={(text: string) => setDetailJob(text)}
                autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null
          }
        </>}
          {
            step===2&&<PhoneAuth verifyComplete={verifyComplete} setVerifyComplete={setVerifyComplete}/>
          }
          {
            step===2?<ConfirmButton title="로그인" navigation={navigation} location='로그인'/>:<ConfirmButton title="확인" onPress={()=>setStep(step+1)}/>
          }
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