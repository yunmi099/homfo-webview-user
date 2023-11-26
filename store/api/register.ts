import { Alert } from "react-native";
import { UserFormData } from "../interface/userForm";
import { AxiosResponse } from "axios";
import { fetchFromApi } from "../../utils/axios";

export const registerUserInfo = async (formData: UserFormData, detailJob: string, phonenumber: string) => {
    try {
      let data;
      if (formData.job === "기타") {
        data = {...formData,  job: detailJob, userPhoneNum: phonenumber}
      } else{
        data = {...formData, userPhoneNum: phonenumber}
      } 
      const res: AxiosResponse = await fetchFromApi('POST',`/users/sign-up`, data);
      return true;
    } catch (error: any) {
      Alert.alert(error.response.data.message)
      return false;
    }
};