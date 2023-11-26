import { Alert } from "react-native";
import { UserFormData } from "../interface/userForm";
import { AxiosResponse } from "axios";
import { fetchFromApi } from "../../utils/axios";

export const registerNewPassword = async (phonenumber: string, password: string) => {
    try {
      let data = {
            "userPhoneNum": phonenumber,
            "newPassword": password
        }
      const res: AxiosResponse = await fetchFromApi('POST',`/users/find/pw`, data);
      return true;
    } catch (error: any) {
      Alert.alert(error.response.data.message)
      return false;
    }
};