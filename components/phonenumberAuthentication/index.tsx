import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Alert} from "react-native"
import {BoxContainer, HorizontalLine, LineContainer,NumberInput, Timer} from "./style";
import useTimerStore from "../../hooks/useTimerStore";
import AuthButton from "./AuthButton";
import NoneActiveButton from "./NoneActiveButton";
import { fetchFromApi } from "../../utils/axios";
import { useDebounce } from "../../hooks/useDebounce";
interface PhoneAuthProps {
    verifyComplete: boolean;
    setVerifyComplete: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const PhoneAuth: React.FC<PhoneAuthProps> = (props: PhoneAuthProps) =>{
    const { isRunning, remainingTime, startTimer, resetTimer} = useTimerStore();
    const [phonenumber, setPhonenumber]=useState({
        "currentNumber": "",
        "verifyNumber":"",
    })
    const {currentNumber, verifyNumber}=phonenumber;
    const [confirm, setConfirm] = useState({
        "currentAuth":false,
        "verifyAuth":false,
    })
    const {currentAuth, verifyAuth} = confirm;
    const [count, setCount] =useState(0);
    const [open,setOpen] = useState(false)
    const [errorMessage, setErrormessage] =  useState({"mention":"","color":""})
    const onChangeCurrentValue = (key:string, value:string)=>{
        setPhonenumber((prev)=>({...phonenumber,[key]:value}));
    }
    const onChangeAuth = (key:string, value:boolean)=>{
        setConfirm((prev)=>({...confirm,[key]:value}));
    }
    const authenticationRequest = async (): Promise<void> => {
        let data = {'userPhoneNum': currentNumber}
        try {
            const res = await fetchFromApi('POST', `/users/sms-auth`,data);
            if (res.status === 200) { 
                setCount(count+1);
                setOpen(true);
                resetTimer();
                startTimer();                
            }
        } catch (e:any) {
            Alert.alert(e.response.data.message);
        }
        
    };
    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleRequest = ()=>{
            switch (true) {
                case count >= 1 && count <= 5:
                    if (remainingTime>120){
                      Alert.alert("요청은 1분 후 부터 보낼 수 있습니다.")
                    } else {
                      authenticationRequest();
                    }
                    break;
                case count === 0:
                    authenticationRequest();
                    break;
                case count > 5:
                    if (remainingTime>0){
                        Alert.alert("요청은 3분 후 부터 보낼 수 있습니다.")
                      } else {
                        authenticationRequest();
                    }
                    break;
                default:
            }
        }
    const authenticationVerify = async (): Promise<void> => {
        let data = {
            "userPhoneNum":currentNumber,
            "authNumber": verifyNumber,
          }
        try {
            const res = await fetchFromApi('POST', `/users/sms-auth/verify`,data);
            if (res.status === 200) {
                resetTimer();
                props.setVerifyComplete(true);
                setErrormessage({"mention":"인증확인이 완료 되었습니다.","color":"#39A03E"})
            }
        } catch (e:any) {
            setErrormessage({"mention":e.response.data.message,"color":"#FF6666"})
        }
        
    };
    const debouncedNumber = useDebounce(currentNumber,500);
    const regax =  /^\d{3}-\d{4}-\d{4}$/;
    useEffect(()=>{
        if (regax.test(currentNumber)){
            onChangeAuth("currentAuth",true);
        } else{
            onChangeAuth("currentAuth",false);
        }

    },[debouncedNumber])
    useEffect(()=>{
        if (verifyNumber.length===4){
            onChangeAuth("verifyAuth", true);}
        else {
            onChangeAuth("verifyAuth", false);
        }
        },[verifyNumber])
    return(
        <BoxContainer>
            <Text style={{marginBottom:'3%', fontSize:17.5}}>전화번호</Text>
            <LineContainer>
                <NumberInput  placeholder="000-0000-0000" value={currentNumber} onChangeText={(text:string)=>onChangeCurrentValue("currentNumber",text)}></NumberInput>
                {isRunning&&<Timer><Text style={{color:'#FF6666'}}>{formatTime(remainingTime)}</Text></Timer>}
                {currentAuth?
            <TouchableOpacity onPress={()=>{handleRequest();}}><AuthButton title="인증요청"/></TouchableOpacity>
             :<TouchableOpacity onPress={()=>Alert.alert("000-0000-0000형식으로 입력해주세요")}><NoneActiveButton title="인증요청"/></TouchableOpacity>}
            </LineContainer>
            <HorizontalLine></HorizontalLine>
            {open?
            <LineContainer>
                <NumberInput  keyboardType="numeric"  placeholder="인증번호를 입력해주세요"  value={verifyNumber} onChangeText={(text:string)=>onChangeCurrentValue("verifyNumber",text)}></NumberInput>
                {verifyAuth?<TouchableOpacity onPress={()=>authenticationVerify()}><AuthButton title="인증확인"/></TouchableOpacity>
                :<View><NoneActiveButton title="인증확인"/></View>}
            </LineContainer>:null}
            <HorizontalLine></HorizontalLine>
            <Text style={{color: errorMessage.color, fontSize:12, fontWeight:"400"}}>{errorMessage.mention}</Text>
        </BoxContainer>
);
}
export default PhoneAuth;