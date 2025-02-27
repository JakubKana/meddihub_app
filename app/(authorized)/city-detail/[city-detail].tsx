import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CityDetailModal() {
  const item = useLocalSearchParams();
  const navigation = useNavigation();
  console.log({ item });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item["city-detail"],
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Modal screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
