import { ThemedButton, ThemedText, ThemedView } from "@/components";
import { useFavoriteCitiesStore } from "@/store/favoriteCitiesStore";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

export default function CityDetailModal() {
  const searchParams = useLocalSearchParams();
  const navigation = useNavigation();
  const setFavoriteCity = useFavoriteCitiesStore(
    (state) => state.setFavoriteCity
  );
  const removeFavoriteCity = useFavoriteCitiesStore(
    (state) => state.removeFavoriteCity
  );
  const [isSearch, setIsSearch] = useState(searchParams["isSearch"] === "true");
  const [isRemoved, setIsRemoved] = useState(false);

  const onPressAddToFavorites = useCallback(() => {
    setIsSearch(false);
    setFavoriteCity({
      id: parseInt(searchParams["cityId"] as string, 10),
      name: searchParams["cityName"] as string,
      address: {
        postCode: searchParams["cityPostCode"] as string,
      },
    });

    Alert.alert("City added to favorites");
  }, [searchParams, setFavoriteCity]);

  const onPressRemoveFromFavorites = useCallback(() => {
    removeFavoriteCity(parseInt(searchParams["cityId"] as string, 10));
    setIsRemoved(true);
    Alert.alert("City removed from favorites");
  }, [removeFavoriteCity, searchParams]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: searchParams["city-detail"],
    });
  }, [navigation, searchParams]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{searchParams["cityName"]}</ThemedText>

      <ThemedText type="default">Id: {searchParams["cityId"]}</ThemedText>
      <ThemedText type="default">
        Weather: {searchParams["cityWeather"]}
      </ThemedText>
      <ThemedText type="default">
        Temperature: {searchParams["cityTemperature"]} °C
      </ThemedText>
      <ThemedText type="default">
        Pressure: {searchParams["cityPressure"]} hPa
      </ThemedText>
      <ThemedText type="default">
        Humidity: {searchParams["cityHumidity"]} %
      </ThemedText>
      {isSearch && (
        <ThemedButton
          style={styles.button}
          title="Add to favorites"
          onPress={onPressAddToFavorites}
        />
      )}
      {!isSearch && !isRemoved && (
        <ThemedButton
          style={styles.button}
          title="Remove from favorites"
          onPress={onPressRemoveFromFavorites}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
});
