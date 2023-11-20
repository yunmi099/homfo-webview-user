import React,{useEffect, useState} from 'react'
import { StyledText, StyledTextInput, HorizontalLine, CommentText } from '../style'
import { fetchFromApi } from '../../../utils/axios';
import { useDebounce } from '../../../hooks/useDebounce';
import { UserFormData } from '../../../store/interface/userForm';

interface registerProps {
    formData: UserFormData;
    setFormData:  React.Dispatch<React.SetStateAction<UserFormData>>;
    onChangeText: (name: string, value: string) => void;
}

export const FirstStep = ({formData, setFormData, onChangeText}: registerProps)=>{
    
    const [message, setMessage] = useState({"nickname":"영문(대소문자가능),숫자,한글 가능 8~15글자 {'\n'}닉네임을 입력해주세요.", "account":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요.", "password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요."});
    const [color, setColor]= useState({"nickname":"#D1D1D1","account":"#D1D1D1","password":"#D1D1D1"});
    const [possible, setPossible]= useState({"nickname":false,"account":false,"password":false});
    
    const doubleCheck = async (key: string,data: string): Promise<void> => {
        try {
            const res = await fetchFromApi('GET', `/users/auth/duplicate/${key}/${data}`);
            if (res.status === 200) {
              console.log(res.data)
              if (key==="nickname"){
                setMessage(prev=>({...prev,[key]:"사용 가능한 닉네임입니다."}));
              } else {
                setMessage(prev=>({...prev,[key]:"사용 가능한 아이디입니다."}));
              }
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
        } else {
          if (!nickNameRegex.test(formData.nickName)){
            setMessage(prev=>({...prev,"nickname":"영문(대소문자가능),숫자,한글로 15글자이내로 입력해주세요."}));
            setColor(prev=>({...prev,"nickname":"#FF6666"}));
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
        } else {
          if (!idRegex.test(formData.userAccount)){
            setMessage(prev=>({...prev,"account":"영문,숫자만 포함 8-15글자의 아이디를 입력해주세요."}));
            setColor(prev=>({...prev,"account":"#FF6666"}));
         } else {
           doubleCheck("account",debouncedId);
         }
        }
       }, [debouncedId]);

  
    return(
    <>
        <StyledText>닉네임</StyledText>
          <StyledTextInput
            value={formData.nickName}
            placeholderTextColor ="lightgrey"
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
            placeholderTextColor ="lightgrey"
            onChangeText={(text: string) => onChangeText("userAccount", text)}
            placeholder={"아이디를 입력해주세요."}
            maxLength={15}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={color.account}>{message.account}</CommentText>
          <StyledText>비밀번호</StyledText>
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
          <HorizontalLine/>
          <CommentText color={"lightgrey"}>영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요.</CommentText>
          <StyledTextInput
            placeholderTextColor ="lightgrey"
            secureTextEntry={true}
            placeholder={"다시 한 번 작성해주세요."}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <HorizontalLine/>
          <CommentText color={"lightgrey"}></CommentText>
    </>)
}