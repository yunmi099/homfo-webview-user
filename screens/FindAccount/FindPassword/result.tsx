import React,{useEffect, useState} from "react";
import { View, Text, Button, TouchableOpacity, TextInput} from "react-native"
import { ButtonText, CommentText, Container, InputContainer, NotifyText, StyledTextInput } from "../style";
import Header from "../../../components/layout/header";
import { xButton } from "../../../assets/icons/register/registerIcon";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDebounce } from "../../../hooks/useDebounce";
import usePhoneNumberStore from "../../../store/context/useNumberStore";
import { registerNewPassword } from "../../../store/api/findPW";
const ResultPassword = ({navigation}:any) => {
    const [message, setMessage] = useState({"password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요.", 
    "checkPassword": "비밀번호를 다시 한 번 입력해주세요."});
   const [color, setColor]= useState({"password":"#D1D1D1", "checkPassword":"#D1D1D1"});
   const [password, setPassword] = useState<string>("");
   const [checkPassword, setCheckPassword] = useState<string>("");
   const {phonenumber, setPhonenumber} = usePhoneNumberStore();

    const passwordRegax=  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    const debouncedPassword = useDebounce(password, 500);

    const handleRegisterPassword = async ()=>{
        if (await registerNewPassword(phonenumber, password)){
            navigation.navigate("로그인")
        }
    }
    
    useEffect(() => {
        if (!passwordRegax.test(debouncedPassword)){
          setMessage(prev=>({...prev,"password":"영문,숫자,특수기호 포함 8~15글자의 비밀번호를 입력해주세요."}));
          setColor(prev=>({...prev,"password":"#D1D1D1"}));
       } else {
         setMessage(prev=>({...prev,password:"사용 가능한 비밀번호입니다."}));
         setColor(prev=>({...prev,password:"#39A03E"}));
       }
     }, [debouncedPassword]);

     useEffect(() => {
         if (debouncedPassword !== checkPassword){
           setMessage(prev=>({...prev,"checkPassword":"일치하지 않습니다."}));
           setColor(prev=>({...prev,"checkPassword":"#FF6666"}));
        } else {
          setMessage(prev=>({...prev,"checkPassword":"비밀번호와 일치합니다."}));
          setColor(prev=>({...prev,"checkPassword":"#39A03E"}));
        }
      }, [checkPassword]);
    return(
    <Container>
        <Header title={"비밀번호 찾기"}/>
        <NotifyText>비밀번호를 재설정 해주세요</NotifyText>
        <InputContainer>
            <StyledTextInput 
                placeholder="새 비밀번호를 입력하세요."
                placeholderTextColor ="lightgrey"
                value = {password}
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize={"none"}
            />
            {password.length>0&&
            <TouchableOpacity
                onPress={()=>setPassword("")}
            >
                <Image source={xButton} style={{width: 17, height:17}}/>
            </TouchableOpacity>}
        </InputContainer>
        {password.length>0&&<CommentText color={color.password}>{message.password}</CommentText>}
        <InputContainer>
            <StyledTextInput 
                placeholder="새 비밀번호를 한번 더 확인해주세요."
                placeholderTextColor ="lightgrey"
                value = {checkPassword}
                onChangeText={(text: string) => setCheckPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize={"none"}
            />
            {checkPassword.length>0&&
            <TouchableOpacity
                onPress={()=>setCheckPassword("")}
            >
                <Image source={xButton} style={{width: 17, height:17}}/>
            </TouchableOpacity>}
        </InputContainer>   
        {checkPassword.length>0&& <CommentText color={color.checkPassword}>{message.checkPassword}</CommentText>}
        <TouchableOpacity
            onPress={()=>handleRegisterPassword()}
        >            
            <LinearGradient
              colors={['#842CFF', '#7674F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{width:"90%", height: 52, alignItems:'center', justifyContent:'center', marginLeft: '5%', marginTop: 30}}
            ><ButtonText>비밀번호 변경</ButtonText>
            </LinearGradient>
        </TouchableOpacity>
    </Container>
);
}
export default ResultPassword;