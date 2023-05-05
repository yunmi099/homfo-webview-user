import React, { useState } from 'react';
import { Text ,View, TextInput, Button, StyleSheet } from 'react-native';
import { Container,StyledText,Block ,StyledTextInput,StyledButton, NumberTextInput,StyledVerifybutton,ButtonText,Buttontext} from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
const Register = ({ navigation }) => {
  const [job, setJob]= useState("")
  const [verify, setVerify]= useState(false);
  const onChangeText = (value: string) => {
    setJob(value);
  } 
  return (
    <Container>
      <Block>
        <StyledText>전화번호</StyledText>
      </Block>
       <View style={{flexDirection:'row'}}>
          <NumberTextInput
            placeholder="전화번호를 입력해주세요"
          />
          <StyledVerifybutton set={verify} onPress={()=>{setVerify(true)}}> 
            <Buttontext set={verify}>
              인증번호 받기
            </Buttontext>
          </StyledVerifybutton>
        </View>
        {verify?
        <View style={{flexDirection:'row'}}>
          <NumberTextInput
            placeholder="인증번호를 입력해주세요"
          />
          <StyledVerifybutton set={true}  onPress={() => navigation.navigate('Main')}> 
            <Buttontext set={true}>
              인증번호 확인
            </Buttontext>
          </StyledVerifybutton>
        </View>: null}
      <Block>
        <StyledText>닉네임</StyledText>
        <StyledTextInput  placeholder={"20자 이내로 작성해주세요"} maxLength={20} autoCorrect={false} autoCapitalize={"none"}/>
      </Block>
      <Block>
        <StyledText>성별</StyledText>
        <RNPickerSelect
                placeholder={{
                  label: "성별",
                }}
                onValueChange={(value) => console.log(value)}
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
        <DatePickerModal/>
      </Block>
      <Block>
        <StyledText>직업</StyledText>
        <RNPickerSelect
          textInputProps={{ underlineColorAndroid: 'transparent'}}
          placeholder={{
  	        label: "직업",
          }}
          fixAndroidTouchableBug={true}
          value={job}
          onValueChange={value => onChangeText(value)}
          useNativeAndroidPickerStyle={false}
          items={[
            { label: '대학생', value: '대학생'},
            { label: '직장인', value: '직장인'},
            { label: '기타', value: '기타'},
          ]}
          style={pickerSelectStyles}
        />
        {job==="기타"?<StyledTextInput placeholder={"20자 이내로 작성해주세요"} autoCorrect={false} maxLength={20} autoCapitalize={"none"}/>:null}
      </Block>
      <StyledButton onPress={() => navigation.navigate('Main')}> 
        <ButtonText>
          가입하기
        </ButtonText>
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