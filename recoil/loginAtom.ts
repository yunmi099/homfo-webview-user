import { atom } from "recoil";
import { UserInfo } from "../store/interface/login";

export const userAtom = atom<UserInfo>({
    key: "user_info",
    default: undefined,
  });
  