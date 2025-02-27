import { City } from "@/types/city";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface Registration {
  email: string;
  password: string;
  phoneNumber: string;
  defaultCity: City;
}

interface RegistrationStore {
  registration: Registration;
  setRegistration: (data: Registration) => void;
  resetRegistration: () => void;
}

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set) => ({
      registration: {
        email: "",
        password: "",
        phoneNumber: "",
        defaultCity: { id: 0, name: "", address: { postCode: "" } },
      },
      setRegistration: (newData) =>
        set(() => {
          return {
            registration: { ...newData },
          };
        }),
      resetRegistration: () =>
        set(() => ({
          registration: {
            email: "",
            password: "",
            phoneNumber: "",
            defaultCity: { id: 0, name: "", address: { postCode: "" } },
          },
        })),
    }),
    {
      name: "registration-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
