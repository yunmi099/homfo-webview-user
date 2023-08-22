import React,{useEffect, useState} from "react";
import { Container, FoundIdBox, FoundIdText, NotifyText } from "../style";
import Header from "../../../components/layout/header";
import { fetchFromApi } from "../../../utils/axios";
import usePhoneNumberStore from "../../../store/context/useNumberStore";
import ConfirmButton from "../../../components/button/confirmButton";
import { formatDateToCustomFormat } from "../../../utils/dateFormat";
import { ActivityIndicator } from "react-native";
interface AccountInfo{
    userAccount:string;
    createdAt:string;
}
const ResultId = ({navigation}:any) => {
    const {phonenumber} = usePhoneNumberStore();
    const [userAccount, setUserAccount] = useState<undefined|AccountInfo>()
    const [error, setError] = useState("");
    const FindAccountId = async (): Promise<void> => {
        let data = {"userPhoneNum":phonenumber}
        try {
            const res = await fetchFromApi('POST', `/users/find/id`, data);
            setUserAccount(res.data);
            console.log(res.data);
        } catch (e:any) {
            setUserAccount({userAccount: "", createdAt:""})
            setError(e.response.data.message);
        }
        
    };
    useEffect(()=>{FindAccountId()},[])
    return(
    <Container>
        <Header title={"아이디 찾기"}/>
        <NotifyText>전화번호 정보와 일치하는{"\n"}아이디를 찾은 결과 입니다.</NotifyText>
        <FoundIdBox>{userAccount!==undefined?(error.length===0?
            <>
            <FoundIdText>아이디: {userAccount.userAccount}</FoundIdText>
            <FoundIdText>가입일: {formatDateToCustomFormat(userAccount.createdAt)}</FoundIdText>
            </>
            :<FoundIdText>{error}</FoundIdText>)
        :<ActivityIndicator/>}</FoundIdBox>
        <ConfirmButton
         title={error.length === 0 ? "로그인 하기" : "회원가입 하기"}
         location={error.length === 0 ? "로그인" : "회원가입"}
         navigation={navigation}
        />
    </Container>
    );
    }
export default ResultId;