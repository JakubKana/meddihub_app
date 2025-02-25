import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";
import { useAuthSession } from "@/providers/AuthProvider";
import Uuid from "expo-modules-core/src/uuid";

import { Button } from "react-native";
import { useCallback } from "react";

export default function LoginScreen() {
  const { signIn } = useAuthSession();
  const login = useCallback((): void => {
    const random: string = Uuid.v4();
    signIn(random);
  }, []);

  return (
    <ScreenWrapper>
      <ThemedText type="title" style={styles.title}>
        Login
      </ThemedText>
      <ThemedView style={styles.loginContainer}>
        <Button title={"Login"} onPress={login} />
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
