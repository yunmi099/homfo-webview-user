import {create} from 'zustand';
import { UserInfo } from '../interface/login';

interface UserStoreState {
    userInfo: UserInfo | undefined;
    setUserInfo:  (newUser: UserInfo) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    userInfo: undefined,
    setUserInfo: (newUser: UserInfo) => set({ userInfo: newUser }),
}));