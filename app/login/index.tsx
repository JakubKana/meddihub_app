import { useCallback } from "react";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedButton, ThemedText, ThemedView } from "@/components";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";
import { LoginForm } from "@/components/loginForm/LoginForm";

export default function LoginScreen() {
  const onSignUpPress = useCallback((): void => {
    router.replace("/registration");
  }, []);

  return (
    <ScreenWrapper>
      <ThemedText type="title" style={styles.title}>
        Login
      </ThemedText>
      <ThemedView style={styles.loginContainer}>
        <LoginForm />
        <ThemedButton title={"Sign up"} onPress={onSignUpPress} />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
  },
  loginContainer: {
    flex: 1,
    gap: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
