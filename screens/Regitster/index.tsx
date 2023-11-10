import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Container, StyledText, Block, StyledTextInput, CommentText, HorizontalLine } from './style';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from './DateTimePicker';
import { fetchFromApi } from '../../utils/axios';
import { AxiosResponse } from 'axios';
import './interface'
import Header from '../../components/layout/header';
import PhoneAuth from '../../components/phonenumberAuthentication';
import { useDebounce } from '../../hooks/useDebounce';
import ConfirmButton from '../../components/button/confirmButton';
import * as registerIcon from '../../assets/icons/register/registerIcon'
const Register = ({ navigation }: any) => {
  const [jobSetting, setJob] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [verifyComplete, setVerifyComplete]=useState(false);
  const [message, setMessage] = useState({"nickname":"영문(대소문자가능),숫자,한글 가능 8~15글자 {'\n'}닉네임을 입력해주세요.", "id":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요.", "password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요."});
  const [color, setColor]= useState({"nickname":"#D1D1D1","id":"#D1D1D1","password":"#D1D1D1"});
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
  const doubleCheck = async (nickname: string): Promise<void> => {
    try {
        const res = await fetchFromApi('GET', `/users/auth/duplicate/nickname/${nickname}`);
        if (res.status === 200) {
            setMessage(prev=>({...prev,"nickname":"사용 가능한 닉네임입니다."}));
            setColor(prev=>({...prev,"nickname":"#39A03E"}));
        }
    } catch (e:any) {
        setMessage(prev=>({...prev,"nickname":e.response.data.message}));
        setColor(prev=>({...prev,"nickname":"#FF6666"}));
    }
  };
  const nickNameRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
  const debouncedNickname = useDebounce(formData.nickName, 500);
  useEffect(() => {
   if(debouncedNickname.length===0){
       setMessage(prev=>({...prev,"nickname":"영문(대소문자가능),숫자,한글 가능 15글자 이내의\n닉네임을 입력해주세요."}));
       setColor(prev=>({...prev,"nickname":"#D1D1D1"}));
   } else if (debouncedNickname.length<=15){
     if (nickNameRegex.test(formData.nickName)){
        setMessage(prev=>({...prev,"nickname":"영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요."}));
        setColor(prev=>({...prev,"nickname":"#D1D1D1"}));
     } else {
       doubleCheck(debouncedNickname);
     }
   }
  }, [debouncedNickname]);
  const idRegex =  /^[a-zA-Z0-9]{8,15}$/
  // const debouncedID = useDebounce(formData.userAccount, 500);
  // useEffect(() => {
  //  if(debouncedID.length===0){
  //      setMessage("영문(대소문자가능),숫자,한글 가능 8~15글자\n닉네임을 입력해주세요.");
  //      setColor("#D1D1D1");
  //  } else if (debouncedNickname.length<=15){
  //    if (idRegex.test(formData.nickName)){
  //      setMessage("영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요.");
  //      setColor("#FF6666");
  //    } else {
  //      doubleCheck(debouncedNickname);
  //    }
  //  }
  // }, [debouncedNickname]);
  return (
      <Container>
        <Header title={"회원가입"}/>
        {/* <Image source={registerIcon.noneCheck}/> */}
        <Block>
        {step===0&&
        <>
          <StyledText>닉네임</StyledText>
          <StyledTextInput
            value={formData.nickName}
            onChangeText={(text: string) => onChangeText("nickName", text)}
            placeholder={"닉네임을 입력해주세요."}
            maxLength={15}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={color.nickname}>{message.nickname}</CommentText>
          <StyledText>아이디</StyledText>
          <StyledTextInput
            value={formData.userAccount}
            onChangeText={(text: string) => onChangeText("userAccount", text)}
            placeholder={"아이디를 입력해주세요."}
            maxLength={15}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={"lightgrey"}>영문,숫자만 포함 8-15글자의 아이디를 입력해주세요.</CommentText>
          <StyledText>비밀번호</StyledText>
          <StyledTextInput
            secureTextEntry={true}
            value={formData.userPassword}
            onChangeText={(text: string) => onChangeText("userPassword", text)}
            placeholder={"비밀번호를 입력해주세요."}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={"lightgrey"}>영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요.</CommentText>
          <StyledTextInput
            secureTextEntry={true}
            placeholder={"다시 한 번 작성해주세요."}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={"lightgrey"}></CommentText>
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
          <HorizontalLine/>
          <StyledText>직업</StyledText>
          <RNPickerSelect
            textInputProps={{ underlineColorAndroid: 'transparent' }}
            placeholder={{
              label: "선택",
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
          <HorizontalLine/>
          {jobSetting? <StyledTextInput placeholder={"20자 이내로 작성해주세요"} 
                value={detailJob}
                onChangeText={(text: string) => setDetailJob(text)}
                autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null
          }
          <StyledText>생년월일</StyledText>
          <DatePickerModal setBirth={setFormData} />
          <HorizontalLine/>
        </>}
        </Block>
          {
            step===2&&<PhoneAuth verifyComplete={verifyComplete} setVerifyComplete={setVerifyComplete}/>
          }
          {
            step===2?<ConfirmButton title="로그인" navigation={navigation} location='로그인'/>:<ConfirmButton title="다음" onPress={()=>setStep(step+1)}/>
          }
      </Container>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginHorizontal: "6.8%",
    marginVertical:5,
  },
  inputAndroid: {
    marginHorizontal: 20,
    marginVertical: 3,
    height: 45,
    // borderWidth:1,
    paddingLeft: 10,
    borderColor: "lightgrey",
  },
});

export default Register;