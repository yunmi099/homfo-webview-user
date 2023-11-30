import React, { useEffect, useState } from 'react';
import { Container,  Block, NotifyText, } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/layout/header';
import PhoneAuth from '../../components/phonenumberAuthentication';
import ConfirmButton from '../../components/button/confirmButton';
import usePhoneNumberStore from '../../store/context/useNumberStore';
import { UserFormData } from '../../store/interface/userForm';
import { FirstStep } from './step/FirstStep';
import { SecondStep } from './step/SecondStep';
import { registerUserInfo } from '../../store/api/register';
const Register = ({ navigation }: any) => {
  const [step, setStep] = useState<number>(0);
  const [verifyComplete, setVerifyComplete]=useState(false);
  const {phonenumber, setPhonenumber} = usePhoneNumberStore();
  const [possible, setPossible]= useState({"nickname":false,"account":false,"password":false,"checkPassword":false});
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
  const handleRegister = async ()=>{
    if (await registerUserInfo(formData, detailJob, phonenumber)){
      navigation.navigate("회원가입 완료")
    }
  }
  const onChangeText = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleButtonAuth = ()=>{
    switch (step){
      case 0: 
        if (possible.account&&possible.nickname&&possible.password&&possible.checkPassword){
          return true;
        } else {
          return false;
        }
      case 1: 
        if (
          formData.gender.length !== 0 &&
          formData.dateOfBirth.length !== 0 &&
          formData.job !== null &&
          formData.job !== undefined
        ) {
          if (formData.job.length > 0) {
            if (formData.job === "기타") {
              return detailJob.length !== 0;
            } else {
              return true;
            }
          }
        }
      return false;
      case 2:
        return true;
    }

  }
  return (
    <KeyboardAwareScrollView 
     contentContainerStyle={{ flex: 1}}
      style={{backgroundColor:'white'}}
      extraScrollHeight={40}
      resetScrollToCoords={{ x: 0, y: 0 }} 
      scrollEnabled={true}
    >
        <Header title={"회원가입"}/>
        {
            step===1&&<NotifyText>사용자에게 적합한 방을 추천드리기 위해서{"\n"}수집하는 정보입니다.</NotifyText>
        }
        <Block>
        {step===0&&
        <>
          <FirstStep 
            formData={formData}
            possible={possible}
            onChangeText={onChangeText}
            setPossible={setPossible}
          />
        </>}

        {step===1&&
        <>
          <SecondStep 
            formData={formData} 
            setFormData={setFormData} 
            onChangeText={onChangeText}
            detailJob={detailJob}
            setDetailJob={setDetailJob}
          />
        </>}
        </Block>
          {
            step===2&&
          <PhoneAuth
            verifyComplete={verifyComplete}
            setVerifyComplete={setVerifyComplete}
          />
          }
          {
            step===2?
            <ConfirmButton
              title="회원가입 완료"
              auth={verifyComplete}
              onPress={()=>handleRegister()}
            />
            :<ConfirmButton 
              title="다음" 
              auth={handleButtonAuth()}
              onPress={()=>setStep(step+1)}
             />
          }
    </KeyboardAwareScrollView>
  );
};


export default Register;