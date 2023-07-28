import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, StyledText, Block, StyledTextInput, StyledButton, NumberTextInput, StyledVerifybutton, Buttontext } from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
import { SERVER_DEPOLY_URL } from '../../utils/axios';
import axios, { AxiosResponse } from 'axios';
import './interface'
const Register = ({ navigation }: any) => {
  const [verify, setVerify] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    userAccount: "",
    userPassWord: "",
    nickName: "",
    userPhoneNum: "",
    gender: "",
    job: "",
    dateOfBirth: ""
  });

  const onChangeText = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const registerUserInfo = async () => {
    try {
      console.log(formData);
      const res: AxiosResponse = await axios.post(`${SERVER_DEPOLY_URL}/users/sign-up`, formData);
      console.log(res.data);
    } catch (e) {
      console.log(e);
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
            value={formData.userPassWord}
            onChangeText={(text: string) => onChangeText("userPassWord", text)}
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
            onValueChange={(value: string) => onChangeText("job", value)}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: '대학생', value: '대학생' },
              { label: '직장인', value: '직장인' },
              { label: '기타', value: '기타' },
            ]}
            style={pickerSelectStyles}
          />
          {formData.job === "기타" ? <StyledTextInput placeholder={"20자 이내로 작성해주세요"} autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null}
        </Block>
        <StyledButton onPress={() => { registerUserInfo(); navigation.navigate('Home'); }}>
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