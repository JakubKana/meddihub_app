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

import { Dropdown } from "../dropdown/Dropdown";
import { Picker } from "@react-native-picker/picker";

export const EditProfileForm: FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { setRegistration, registration } = useRegistrationStore();

  const onSubmit: SubmitHandler<FormValuesType> = useCallback((formData) => {
    setRegistration({
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      defaultCity: formData.defaultCity,
    });
    Alert.alert("Update successful");
  }, []);
  console.log({ registration });
  useEffect(() => {
    setValue("email", registration.email);
    setValue("password", registration.password);
    setValue("phoneNumber", registration.phoneNumber);
    setValue("defaultCity", cities[0].value);
  }, []);

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
        style={[
          styles.error,
          errors.email ? { visibility: "visible" } : { visibility: "hidden" },
        ]}
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
        style={[
          styles.error,
          errors.password
            ? { visibility: "visible" }
            : { visibility: "hidden" },
        ]}
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
          errors.phoneNumber
            ? { visibility: "visible" }
            : { visibility: "hidden" },
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
          <ThemedView style={styles.container}>
            <Picker
              style={styles.dropdown}
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              mode="dialog"
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
          errors.defaultCity
            ? { visibility: "visible" }
            : { visibility: "hidden" },
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    height: 80,
    justifyContent: "center",
    width: Dimensions.get("window").width / 2,
  },
  dropdown: {
    width: Dimensions.get("window").width / 2,
    height: 80,
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
});
