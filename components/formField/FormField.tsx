import { FC } from "react";
import { FormFieldProps } from "../registrationForm/RegistrationForm.types";
import { TextInput, TextInputProps } from "react-native";

export const FormField: FC<FormFieldProps & TextInputProps> = ({
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <TextInput
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
