import React, { useEffect, useState } from 'react';
import { Container,  Block, } from './style';
import Header from '../../components/layout/header';
import PhoneAuth from '../../components/phonenumberAuthentication';
import ConfirmButton from '../../components/button/confirmButton';
import * as registerIcon from '../../assets/icons/register/registerIcon'
import usePhoneNumberStore from '../../store/context/useNumberStore';
import { UserFormData } from '../../store/interface/userForm';
import { FirstStep } from './step/FirstStep';
import { SecondStep } from './step/SecondStep';
import { registerUserInfo } from '../../store/api/register';
const Register = ({ navigation }: any) => {
  const [step, setStep] = useState<number>(0);
  const [verifyComplete, setVerifyComplete]=useState(false);
  const {phonenumber, setPhonenumber} = usePhoneNumberStore();
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
  // const handleButtonAuth = ()=>{
  //   switch (step){
  //     case 0: 
  //       if (){

  //       }
  //   }

  // }
  return (
      <Container>
        <Header title={"회원가입"}/>
        {/* <Image source={registerIcon.noneCheck}/> */}
        <Block>
        {step===0&&
        <>
          <FirstStep 
            formData={formData}
            setFormData={setFormData}
            onChangeText={onChangeText}
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
              title="가입하기"
              auth={false}
              onPress={()=>registerUserInfo(formData, detailJob, phonenumber)}
              navigation={navigation}
              location='로그인'
            />
            :<ConfirmButton 
              title="다음" 
            // auth={handleButtonAuth()}
             onPress={()=>setStep(step+1)}
             />
          }
      </Container>
  );
};


export default Register;