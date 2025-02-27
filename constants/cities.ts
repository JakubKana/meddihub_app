import { City } from "@/types/city";

export const cities: {
  label: string;
  value: City;
}[] = [
  {
    label: "Prague",
    value: { name: "Prague", address: { postCode: "11000" } },
  },
  { label: "Brno", value: { name: "Brno", address: { postCode: "60200" } } },
  {
    label: "Ostrava",
    value: { name: "Ostrava", address: { postCode: "70200" } },
  },
];
