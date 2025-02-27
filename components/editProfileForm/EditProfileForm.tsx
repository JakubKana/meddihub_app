import { StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedTextInput } from "../themedTextInput/ThemedTextInput";
import { ThemedView } from "../themedView/ThemedView";
import { ThemedText } from "../themedText/ThemedText";
import { FC, useCallback } from "react";
import { ThemedButton } from "../themedButton/ThemedButton";
import { useRegistrationStore } from "@/store/userStore";
import { FormValuesType, schema } from "./EditProfileForm.types";
import { cities } from "@/constants/cities";

import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "expo-router";

export const EditProfileForm: FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const registration = useRegistrationStore((state) => state.registration);
  const setRegistration = useRegistrationStore(
    (state) => state.setRegistration
  );
  const selectedCity = watch("defaultCity");
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
      Alert.alert("Update successful");
    },
    [setRegistration]
  );

  useFocusEffect(
    useCallback(() => {
      setValue("email", registration.email);
      setValue("password", registration.password);
      setValue("phoneNumber", registration.phoneNumber);
      setValue("defaultCity", registration.defaultCity.id);
    }, [
      registration.defaultCity.id,
      registration.email,
      registration.password,
      registration.phoneNumber,
      setValue,
    ])
  );

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
      <ThemedText style={styles.label} type="defaultSemiBold">
        Default city
      </ThemedText>
      <Controller
        control={control}
        name="defaultCity"
        render={({ field: { onChange, onBlur } }) => {
          return (
            <ThemedView style={styles.dropdownContainer}>
              <Picker
                style={styles.dropdown}
                selectedValue={selectedCity}
                enabled={true}
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
                numberOfLines={1}
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
          );
        }}
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
        <ThemedButton title="Update" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
