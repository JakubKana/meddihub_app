import { City } from "@/types/city";

export const cities: {
  label: string;
  value: City;
}[] = [
  {
    label: "Praha",
    value: { id: 1, name: "Praha", address: { postCode: "11000" } },
  },
  {
    label: "Brno",
    value: { id: 2, name: "Brno", address: { postCode: "60200" } },
  },
  {
    label: "Ostrava",
    value: { id: 3, name: "Ostrava", address: { postCode: "70200" } },
  },
];
