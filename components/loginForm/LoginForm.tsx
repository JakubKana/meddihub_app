import { FC, useCallback } from "react";
import { FormValuesType, schema } from "./LoginForm.types";
import { router } from "expo-router";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { ThemedButton } from "../themedButton/ThemedButton";
import { ThemedText } from "../themedText/ThemedText";
import { ThemedTextInput } from "../themedTextInput/ThemedTextInput";
import { ThemedView } from "../themedView/ThemedView";
import { useAuthSession } from "@/providers/AuthProvider";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRegistrationStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Uuid from "expo-modules-core/src/uuid";

export const LoginForm: FC = () => {
  const { signIn } = useAuthSession();
  // Initialize the form with React Hook Form and Zod schema resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { registration } = useRegistrationStore();

  const onSubmit: SubmitHandler<FormValuesType> = useCallback(
    (formData) => {
      // TODO: Check store for existing user and password

      if (
        registration.email.toLowerCase() === formData.email.toLowerCase() &&
        registration.password === formData.password
      ) {
        const random: string = Uuid.v4();
        signIn(random);
        router.push("/(authorized)/(tabs)");
      } else {
        Alert.alert("Login failed");
      }
    },
    [registration.email, registration.password, signIn]
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold">Email</ThemedText>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your Email"
          />
        )}
      />
      <ThemedText
        type="small"
        style={[styles.error, errors.email ? styles.visible : styles.hidden]}
      >
        {errors?.email?.message}
      </ThemedText>

      <ThemedText style={styles.label} type="defaultSemiBold">
        Password
      </ThemedText>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your password"
            secureTextEntry
          />
        )}
      />

      <ThemedText
        type="small"
        style={[styles.error, errors.password ? styles.visible : styles.hidden]}
      >
        {errors?.password?.message}
      </ThemedText>

      <ThemedView style={styles.loginContainer}>
        <ThemedButton title="Log in" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
    padding: 20,
  },
  loginContainer: {
    alignSelf: "center",
  },
  input: {
    width: Dimensions.get("window").width / 2,
  },
  error: {
    width: Dimensions.get("window").width / 2,
    color: "red",
  },
  label: {
    marginTop: 20,
  },
  visible: {
    visibility: "visible",
  },
  hidden: {
    visibility: "hidden",
  },
});
