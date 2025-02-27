import { Image, StyleSheet } from "react-native";

import { ParallaxScrollView, ThemedText, ThemedView } from "@/components";
import { Link } from "expo-router";
import { useState } from "react";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";

export default function HomeScreen() {
  const [currentCity, setCurrentCity] = useState("currentCity");

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
          <ThemedText type="title">Search weather in your city!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href={`/cityDetail/${currentCity}`} style={styles.link}>
            Open modal
          </Link>
        </ThemedView>
      </ParallaxScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
