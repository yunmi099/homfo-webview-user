import React,{useEffect, useState} from 'react'
import {StyledView, StyledText, StyledTextInput, HorizontalLine, CommentText, StyledImage } from '../style'
import { fetchFromApi } from '../../../utils/axios';
import { useDebounce } from '../../../hooks/useDebounce';
import { UserFormData } from '../../../store/interface/userForm';
import * as registerIcon from '../../../assets/icons/register/registerIcon'
interface registerProps {
    formData: UserFormData;
    onChangeText: (name: string, value: string) => void;
    possible:{
      nickname: boolean;
      account: boolean;
      password: boolean;
      checkPassword: boolean;
    };
    setPossible: React.Dispatch<React.SetStateAction<{
      nickname: boolean;
      account: boolean;
      password: boolean;
      checkPassword: boolean;
  }>>;
}

export const FirstStep = ({formData, onChangeText, possible, setPossible}: registerProps)=>{
    
    const [message, setMessage] = useState({"nickname":"영문(대소문자가능),숫자,한글 가능 8~15글자 {'\n'}닉네임을 입력해주세요.",
     "account":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요.", "password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요.", 
     "checkPassword": "비밀번호를 다시 한 번 입력해주세요."});
    const [color, setColor]= useState({"nickname":"#D1D1D1","account":"#D1D1D1","password":"#D1D1D1", "checkPassword":"#D1D1D1"});
    const [checkPassword, setCheckPassword] = useState<string>("");

    const doubleCheck = async (key: string,data: string): Promise<void> => {
        try {
            const res = await fetchFromApi('GET', `/users/auth/duplicate/${key}/${data}`);
            if (res.status === 200) {
              console.log(res.data)
              if (key==="nickname"){
                setMessage(prev=>({...prev,[key]:"사용 가능한 닉네임입니다."}));
              } else if (key==="account") {
                setMessage(prev=>({...prev,[key]:"사용 가능한 아이디입니다."}));
              } 
                setPossible(prev=>({...prev,[key]:true}));
                setColor(prev=>({...prev,[key]:"#39A03E"}));
            }
        } catch (e:any) {
            setMessage(prev=>({...prev,[key]:e.response.data.message}));
            setColor(prev=>({...prev,[key]:"#FF6666"}));
        }
      };
      const nickNameRegex = /^[A-Za-z0-9가-힣]{8,15}$/;
      const debouncedNickname = useDebounce(formData.nickName, 500);
      useEffect(() => {
        if (debouncedNickname.length===0){
          setMessage(prev=>({...prev,"nickname":"영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요."}));
          setColor(prev=>({...prev,"nickname":"#D1D1D1"}));
          setPossible(prev=>({...prev,"nickname":false}));
        } else {
          if (!nickNameRegex.test(debouncedNickname)){
            setMessage(prev=>({...prev,"nickname":"영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요."}));
            setColor(prev=>({...prev,"nickname":"#FF6666"}));
            setPossible(prev=>({...prev,"nickname":false}));
          } else {
           doubleCheck("nickname" ,debouncedNickname);
          }
        }
      }, [debouncedNickname]);

      const idRegex =  /^[a-zA-Z0-9]{8,15}$/
      const debouncedId = useDebounce(formData.userAccount, 500);
      useEffect(() => {
        if (debouncedId.length === 0){
          setMessage(prev=>({...prev,"account":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요."}));
          setColor(prev=>({...prev,"account":"#D1D1D1"}));
          setPossible(prev=>({...prev,"account":false}));
        } else {
          if (!idRegex.test(debouncedId)){
            setMessage(prev=>({...prev,"account":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요."}));
            setColor(prev=>({...prev,"account":"#FF6666"}));
            setPossible(prev=>({...prev,"account":false}));
         } else {
           doubleCheck("account",debouncedId);
         }
        }
       }, [debouncedId]);

       const passwordRegax=  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
       const debouncedPassword = useDebounce(formData.userPassword, 500);
       useEffect(() => {
         if (debouncedPassword.length === 0){
           setMessage(prev=>({...prev,"password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요."}));
           setColor(prev=>({...prev,"password":"#D1D1D1"}));
           setPossible(prev=>({...prev,"password":false}));
         } else {
           if (!passwordRegax.test(debouncedPassword)){
             setMessage(prev=>({...prev,"password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요."}));
             setColor(prev=>({...prev,"password":"#FF6666"}));
             setPossible(prev=>({...prev,"password":false}));
          } else {
            setMessage(prev=>({...prev,password:"사용 가능한 비밀번호입니다."}));
            setColor(prev=>({...prev,password:"#39A03E"}));
            setPossible(prev=>({...prev,password:true}));
          }
        }
        }, [debouncedPassword]);

        useEffect(() => {
          if (checkPassword.length === 0){
            setMessage(prev=>({...prev,"checkPassword":""}));
            setColor(prev=>({...prev,"checkPassword":"#D1D1D1"}));
            setPossible(prev=>({...prev,"checkPassword":false}));
          } else {
            if (debouncedPassword !== checkPassword){
              setMessage(prev=>({...prev,"checkPassword":"일치하지 않습니다."}));
              setColor(prev=>({...prev,"checkPassword":"#FF6666"}));
              setPossible(prev=>({...prev,"checkPassword":false}));
           } else {
             setMessage(prev=>({...prev,"checkPassword":"비밀번호와 일치합니다."}));
             setColor(prev=>({...prev,"checkPassword":"#39A03E"}));
             setPossible(prev=>({...prev,"checkPassword":true}));
           }
         }
         }, [checkPassword]);
  
    return(
    <>
        <StyledText>닉네임</StyledText>
        <StyledView>
            <StyledTextInput
              value={formData.nickName}
              placeholderTextColor ="lightgrey"
              onChangeText={(text: string) => onChangeText("nickName", text)}
              placeholder={"닉네임을 입력해주세요."}
              maxLength={15}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <StyledImage source={possible.nickname?registerIcon.check:registerIcon.noneCheck}/>
          </StyledView>
          <HorizontalLine/>
          <CommentText color={color.nickname}>{message.nickname}</CommentText>
          <StyledText>아이디</StyledText>
          <StyledView>
            <StyledTextInput
              value={formData.userAccount}            
              placeholderTextColor ="lightgrey"
              onChangeText={(text: string) => onChangeText("userAccount", text)}
              placeholder={"아이디를 입력해주세요."}
              maxLength={15}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <StyledImage source={possible.account?registerIcon.check:registerIcon.noneCheck}/>
          </StyledView>
          <HorizontalLine/>
          <CommentText color={color.account}>{message.account}</CommentText>
          <StyledText>비밀번호</StyledText>
          <StyledView>
            <StyledTextInput
              secureTextEntry={true}
              value={formData.userPassword}
              placeholderTextColor ="lightgrey"
              onChangeText={(text: string) => onChangeText("userPassword", text)}
              placeholder={"비밀번호를 입력해주세요."}
              maxLength={20}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <StyledImage source={possible.password?registerIcon.check:registerIcon.noneCheck}/>
          </StyledView>
          <HorizontalLine/>
          <CommentText color={color.password}>{message.password}</CommentText>
          {
            possible.password ? 
            <>
              <StyledText>비밀번호 확인</StyledText>
              <StyledView>
                <StyledTextInput
                  value={checkPassword}
                  onChangeText={(text: string) => setCheckPassword(text)}
                  placeholderTextColor ="lightgrey"
                  secureTextEntry={true}
                  placeholder={"다시 한 번 작성해주세요."}
                  maxLength={20}
                  autoCorrect={false}
                  autoCapitalize={"none"}
                />
                <StyledImage source={possible.checkPassword?registerIcon.check:registerIcon.noneCheck}/>
              </StyledView>
              <HorizontalLine/>
              <CommentText color={color.checkPassword}>{message.checkPassword}</CommentText>
            </>:null

          }
    </>)
}