import { create } from "zustand";

interface Registration {
  email: string;
  password: string;
  phoneNumber: string;
  defaultCity: {
    name: string;
    address: {
      postCode: string;
    };
  } | null;
}

interface RegistrationStore {
  registration: Registration;
  setRegistration: (data: Partial<Registration>) => void;
  resetRegistration: () => void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  registration: {
    email: "",
    password: "",
    phoneNumber: "",
    defaultCity: null,
  },
  setRegistration: (data) =>
    set((state) => ({
      registration: { ...state.registration, ...data },
    })),
  resetRegistration: () =>
    set(() => ({
      registration: {
        email: "",
        password: "",
        phoneNumber: "",
        defaultCity: null,
      },
    })),
}));
