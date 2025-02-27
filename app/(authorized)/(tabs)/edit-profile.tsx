import { Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  EditProfileForm,
  ParallaxScrollView,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/components";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";

export default function EditProfileScreen() {
  return (
    <ScreenWrapper>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={require("@/assets/images/edit-profile-min.png")}
            style={styles.editLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Edit your profile</ThemedText>
          <EditProfileForm />
          <ThemedButton
            title={"Sign out"}
            onPress={() => {
              router.replace("/login");
            }}
          />
        </ThemedView>
      </ParallaxScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  editLogo: {
    height: 200,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
