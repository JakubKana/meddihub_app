import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedTextInput } from "../themedTextInput/ThemedTextInput";

import { FC, useCallback, useEffect } from "react";
import { ThemedButton } from "../themedButton/ThemedButton";
import { FormValuesType, schema } from "./RegistrationForm.types";
import { useRegistrationStore } from "@/store/userStore";
import { router } from "expo-router";
import { cities } from "@/constants/cities";
import { ThemedText } from "../themedText/ThemedText";
import { ThemedView } from "../themedView/ThemedView";

import { Picker } from "@react-native-picker/picker";

export const RegistrationForm: FC = () => {
  // Initialize the form with React Hook Form and Zod schema resolver
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const setRegistration = useRegistrationStore(
    (state) => state.setRegistration
  );

  const onSubmit: SubmitHandler<FormValuesType> = useCallback(
    (formData) => {
      const findCity = cities.find(
        // @ts-ignore
        (c) => c.value.id === parseInt(formData.defaultCity, 10)
      );

      setRegistration({
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        defaultCity: {
          isDefault: true,
          id: findCity?.value.id!,
          name: findCity?.value.name!,
          address: findCity?.value.address!,
        },
      });
      Alert.alert("Registration successful");
      router.replace("/");
    },
    [setRegistration]
  );

  useEffect(() => {
    setValue("defaultCity", cities[1].value.id);
  }, [setValue]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label} type="defaultSemiBold">
        Email
      </ThemedText>
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
      <ThemedText style={styles.label} type="defaultSemiBold">
        Phone number
      </ThemedText>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(val) => onChange(val)}
            value={value}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            textContentType="telephoneNumber"
          />
        )}
      />
      <ThemedText
        type="small"
        style={[
          styles.error,
          errors.phoneNumber ? styles.visible : styles.hidden,
        ]}
      >
        {errors?.phoneNumber?.message}
      </ThemedText>
      <Controller
        control={control}
        name="defaultCity"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={styles.dropdownContainer}>
            <Picker
              style={styles.dropdown}
              selectedValue={value}
              onValueChange={(itemValue) => {
                // This is a workaround for iOS, as the picker does not trigger the onChange event
                // WT actual Fuck IOS is setting value but UI is reseting???
                if (Platform.OS === "ios") {
                  // @ts-ignores
                  onChange(parseInt(itemValue, 10));
                } else {
                  onChange(itemValue);
                }
              }}
              onBlur={onBlur}
            >
              {cities.map((item) => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value.id}
                />
              ))}
            </Picker>
          </ThemedView>
        )}
      />
      <ThemedText
        type="small"
        style={[
          styles.error,
          errors.defaultCity ? styles.visible : styles.hidden,
        ]}
      >
        {errors?.defaultCity?.message}
      </ThemedText>

      <ThemedView style={styles.submitContainer}>
        <ThemedButton title="Submit" onPress={handleSubmit(onSubmit)} />
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
  dropdownContainer: {
    justifyContent: "center",
    width: Dimensions.get("window").width / 2,
    height: 60,
    overflow: "hidden",
  },
  dropdown: {
    width: Dimensions.get("window").width / 2,
  },
  submitContainer: {
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
    marginTop: 10,
  },
  visible: {
    visibility: "visible",
  },
  hidden: {
    visibility: "hidden",
  },
});
