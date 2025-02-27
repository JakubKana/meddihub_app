import { City } from "@/types/city";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteCitiesStore {
  favoriteCities: City[];
  setFavoriteCity: (data: City) => void;
  removeFavoriteCity: (id: number) => void;
}

export const useFavoriteCitiesStore = create<FavoriteCitiesStore>()(
  persist(
    (set) => ({
      favoriteCities: [],
      removeFavoriteCity: (id: number) => {
        set((state) => {
          console.log("Removing city with id", id);
          console.log(
            "Current favorite cities",
            state.favoriteCities,
            state.favoriteCities.filter((city) => city.id !== id)
          );

          return {
            favoriteCities: state.favoriteCities.filter(
              (city) => city.id !== id
            ),
          };
        });
      },
      setFavoriteCity: (data) =>
        set((state) => {
          if (state.favoriteCities.find((city) => city.id === data.id)) {
            return { favoriteCities: state.favoriteCities };
          }
          return { favoriteCities: [...state.favoriteCities, data] };
        }),
    }),
    {
      name: "favorite-cities-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
