import {create} from 'zustand';

interface PhonenumberStoreState {
  phonenumber: string;
  setPhonenumber: (newNumber: string) => void;
}

const usePhoneNumberStore = create<PhonenumberStoreState>((set) => ({
  phonenumber: "",
  setPhonenumber: (newNumber: string) => set({ phonenumber: newNumber }),
}));

export default usePhoneNumberStore;