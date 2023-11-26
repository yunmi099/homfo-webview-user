import { Alert } from "react-native";
import { fetchFromApi } from "../../utils/axios";
import { UserInfo } from "../interface/login";

export const signIn = async (id: string, password: string, setUserInfo:(newUser: UserInfo) => void) => {
    try {
      let body = {
        userAccount: id,
        userPassword: password
      }
      const signInRes = await fetchFromApi('POST',`/users/sign-in`, body);
      const res = await fetchFromApi('GET',`/users/info`, null, signInRes.headers.authorization);
      setUserInfo({...res.data,token:signInRes.headers.authorization});
      return true;
    } catch (error: any) {
      Alert.alert("아이디, 비밀번호를 확인 해주세요");
      return false;
    }   
}