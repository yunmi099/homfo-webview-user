export {type UserFormData};
interface UserFormData {
	userAccount: string;
	userPassword: string;
  nickName: string;
  userPhoneNum: string;
  gender: string|null;
  job: string|null;
  dateOfBirth: string|null;
}
