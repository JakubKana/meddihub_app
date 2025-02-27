import { Image, ImageBackground, StyleSheet } from "react-native";

import {
  ParallaxScrollView,
  ThemedButton,
  ThemedText,
  ThemedTextInput,
  ThemedView,
} from "@/components";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";
import { useRegistrationStore } from "@/store/userStore";
import { City, CityItem } from "@/types/city";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "@/app/utils/debounce";
import { useFavoriteCitiesStore } from "@/store/favoriteCitiesStore";
import { WeatherData } from "@/types/weather";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const registration = useRegistrationStore((store) => store.registration);
  const favoriteCities = useFavoriteCitiesStore(
    (store) => store.favoriteCities
  );
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<WeatherData | null>();
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = useCallback(
    async (term: string, isSearch?: boolean) => {
      try {
        console.log("Fetching data for search term:", term, isSearch);
        setError(null);
        // Perform an API request based on the search term
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            term
          )}&appid=91a8b0d4c5d50d9617d0cce89862204e&units=metric`,
          { method: "GET", cache: "default" }
        );

        const data = await response.json();
        if (data.cod === "404") {
          throw new Error("City not found");
        }
        if (isSearch) {
          setSearchResults(data);
        }

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Error orccured when searching data: ${error}`);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    },
    []
  );

  const debouncedSearch = debounce(fetchSearchResults, 500);

  const handleSearch = useCallback(() => {
    setLoading(true);
    debouncedSearch(searchQuery, true);
    setSearchQuery("");
  }, [searchQuery, debouncedSearch]);

  const updateCityData = useCallback(() => {
    const processCities = async (cities: City[]) => {
      const responseCities: any[] = [];
      for (let i = 0; i < cities.length; i++) {
        await fetchSearchResults(cities[i].name).then((response) => {
          responseCities.push(response);
        });
      }
      return responseCities;
    };

    (async () => {
      if (favoriteCities.length > 0) {
        const responses = await processCities([
          ...favoriteCities,
          registration.defaultCity,
        ]);

        const mappedCities = responses.map((response, index) => {
          if (favoriteCities[index] === undefined) {
            return {
              ...(registration.defaultCity as City),
              temperature: response.main.temp,
              weather: response.weather[0].main,
              pressure: response.main.pressure,
              humidity: response.main.humidity,
            };
          }
          return {
            ...(favoriteCities[index] as City),
            temperature: response.main.temp,
            weather: response.weather[0].main,
            pressure: response.main.pressure,
            humidity: response.main.humidity,
          };
        });

        setCities([...mappedCities]);
      } else {
        console.log("No favorite cities to fetch");
      }
    })();
  }, [favoriteCities, fetchSearchResults, registration.defaultCity]);

  useFocusEffect(
    useCallback(() => {
      updateCityData();
    }, [updateCityData])
  );

  useEffect(() => {
    if (!registration.defaultCity?.name) {
      return;
    }
    console.log("Fetching data for default city", registration.defaultCity);

    fetchSearchResults(registration.defaultCity.name, false).then(
      (response) => {
        const newCity = {
          ...(registration.defaultCity as City),
          temperature: response.main.temp,
          weather: response.weather[0].main,
          pressure: response.main.pressure,
          humidity: response.main.humidity,
        };

        setCities((prevCities) => [
          ...prevCities.filter((city) => !city.isDefault),
          newCity,
        ]);
      }
    );

    return () => {};
  }, [fetchSearchResults, registration]);

  useEffect(() => {
    if (!searchResults) {
      return;
    }

    router.push({
      pathname: `/city-detail/${searchResults?.name}`,
      params: {
        isSearch: "true",
        cityId: searchResults.id,
        cityPostCode: searchResults.sys.id,
        cityName: searchResults.name,
        cityTemperature: searchResults.main.temp,
        cityWeather: searchResults.weather[0].main,
        cityPressure: searchResults.main.pressure,
        cityHumidity: searchResults.main.humidity,
      },
    });
    setSearchResults(null);
  }, [searchResults]);

  return (
    <ScreenWrapper>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/search-weather.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Search weather in your city!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.searchContainer}>
          <ThemedTextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <ThemedButton
            title=""
            onPress={() => handleSearch()}
            style={styles.searchButton}
          >
            <Ionicons
              name="search"
              size={24}
              color="#888"
              style={styles.searchIcon}
            />
          </ThemedButton>
        </ThemedView>
        {loading && <ThemedText style={styles.loading}>Loading...</ThemedText>}
        {error && <ThemedText style={styles.searchError}>{error}</ThemedText>}

        {cities.map((city) => (
          <ThemedView
            style={styles.itemWrapper}
            key={`${city.id}-${city.name}`}
          >
            <Link
              href={{
                pathname: `/city-detail/${city.name}`,
                params: {
                  cityId: city.id,
                  cityName: city.name,
                  cityTemperature: city.temperature,
                  cityWeather: city.weather,
                  cityPressure: city.pressure,
                  cityHumidity: city.humidity,
                },
              }}
              style={styles.link}
            >
              <ImageBackground
                source={require("@/assets/images/item.png")}
                style={styles.itemBackground}
                resizeMode="cover"
              >
                <ThemedView style={styles.itemContainer}>
                  <ThemedText style={styles.link}>
                    {city.name?.toUpperCase()}
                  </ThemedText>
                  <ThemedText style={styles.link}>
                    {city.temperature} °C
                  </ThemedText>
                  <ThemedText style={styles.link}>{city.weather}</ThemedText>
                </ThemedView>
              </ImageBackground>
            </Link>
          </ThemedView>
        ))}
      </ParallaxScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  itemWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  itemBackground: {
    width: "100%",

    height: 80,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0, 0.3)",
    height: 80,
    padding: 10,
  },
  reactLogo: {
    height: 200,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  link: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
  },
  searchInput: {
    borderColor: "#ccc",
  },
  searchError: {
    color: "red",
  },
  searchButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 0,
    shadowColor: "transparent",
    height: 40,
  },
  searchIcon: {
    width: 40,
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  loading: {
    alignSelf: "center",
  },
});
