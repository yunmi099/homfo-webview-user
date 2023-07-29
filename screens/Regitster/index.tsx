import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, StyledText, Block, StyledTextInput, StyledButton, NumberTextInput, StyledVerifybutton, Buttontext } from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
import { SERVER_DEPOLY_URL } from '../../utils/axios';
import axios, { AxiosResponse } from 'axios';
import './interface'
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
      const res: AxiosResponse = await axios.post(`${SERVER_DEPOLY_URL}/users/sign-up`, data);
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
    <ScrollView>
      <Container>
        <Block>
          <StyledText>전화번호</StyledText>
        </Block>
        <View style={{ flexDirection: 'row' }}>
          <NumberTextInput
            value={formData.userPhoneNum}
            keyboardType="numeric" // 숫자 키패드로 설정
            onChangeText={(text: string) => onChangeText("userPhoneNum", text)}
            placeholder="전화번호를 입력해주세요"
          />
          <StyledVerifybutton set={verify} onPress={() => { setVerify(true); }}>
            <Buttontext set={verify}>인증번호 받기</Buttontext>
          </StyledVerifybutton>
        </View>
        {verify ? (
          <View style={{ flexDirection: 'row' }}>
            <NumberTextInput  placeholder="인증번호를 입력해주세요"  keyboardType="numeric" />
            <StyledVerifybutton set={true} onPress={() => navigation.navigate('Main')}>
              <Buttontext set={true}>인증번호 확인</Buttontext>
            </StyledVerifybutton>
          </View>
        ) : null}
        <Block>
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
          <StyledText>닉네임</StyledText>
          <StyledTextInput
            value={formData.nickName}
            onChangeText={(text: string) => onChangeText("nickName", text)}
            placeholder={"8~15자 이내로 작성해주세요"}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
        </Block>
        <Block>
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
        </Block>
        <Block>
          <StyledText>생년월일</StyledText>
          <DatePickerModal setBirth={setFormData} />
        </Block>
        <Block>
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
              { label: '대학생', value: '대학생' },
              { label: '직장인', value: '직장인' },
              { label: '기타', value: '기타' },
            ]}
            style={pickerSelectStyles}
          />
          {jobSetting? <StyledTextInput placeholder={"20자 이내로 작성해주세요"} 
                value={detailJob}
                onChangeText={(text: string) => setDetailJob(text)}
                autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null}
        </Block>
        <StyledButton onPress={() => registerUserInfo()}>
          <Buttontext>가입하기</Buttontext>
        </StyledButton>
      </Container>
    </ScrollView>
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