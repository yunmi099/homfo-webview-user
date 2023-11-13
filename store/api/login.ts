import { Alert } from "react-native";
import { fetchFromApi } from "../../utils/axios";
import { UserInfo } from "../interface/login";
import { SetterOrUpdater } from "recoil";

export const signIn = async (id: string, password: string, setUserInfo: SetterOrUpdater<UserInfo>) => {
    try {
      let body = {
        userAccount: id,
        userPassword: password
      }
      const res = await fetchFromApi('POST',`/users/sign-in`, body);
      setUserInfo(res.data);

      return true;
    } catch (error: any) {
      Alert.alert(error.response.data.message)
      return false;
    }   
  }