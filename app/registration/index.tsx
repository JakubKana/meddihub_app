import { StyleSheet } from "react-native";
import { RegistrationForm, ThemedText, ThemedView } from "@/components";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";

export default function LoginScreen() {
  return (
    <ScreenWrapper>
      <ThemedText type="title" style={styles.title}>
        Registration
      </ThemedText>
      <ThemedView style={styles.registrationContainer}>
        <RegistrationForm />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
  },
  registrationContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
