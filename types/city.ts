export type City = {
  isDefault?: boolean;
  id: number;
  name: string;
  address: { postCode: string };
};

export type CityItem = {
  id: number;
  name: string;
  temperature: number;
  weather: string;
  humidity: number;
  pressure: number;
  isDefault?: boolean;
};
