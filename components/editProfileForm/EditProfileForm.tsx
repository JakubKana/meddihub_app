import { StyleSheet, Dimensions, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedTextInput } from "../themedTextInput/ThemedTextInput";
import { ThemedView } from "../themedView/ThemedView";
import { ThemedText } from "../themedText/ThemedText";
import { FC, useCallback, useEffect } from "react";
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

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const registration = useRegistrationStore((state) => state.registration);
  const setRegistration = useRegistrationStore(
    (state) => state.setRegistration
  );
  const onSubmit: SubmitHandler<FormValuesType> = useCallback(
    (formData) => {
      const defaultCity = cities.find(
        (city) => city.label === formData.defaultCity.name
      );

      setRegistration({
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        defaultCity: { ...defaultCity?.value!, isDefault: true },
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
      setValue("defaultCity", registration.defaultCity);
    }, [
      registration.defaultCity,
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
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={styles.dropdownContainer}>
            <Picker
              style={styles.dropdown}
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue);
              }}
              onBlur={onBlur}
            >
              {cities.map((item) => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
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
