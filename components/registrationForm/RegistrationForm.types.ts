import { FieldError, UseFormRegister } from "react-hook-form";
import { Platform } from "react-native";
import z from "zod";
// Define Zod schema for form validation
export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is mandatory" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phoneNumber: z.string().refine(
    (string) => {
      return /^(((\+|00)\d{3,3}\d{9,9})|(\d{9,9}))$/.test(string);
    },
    {
      message:
        "Invalid phone number, please use (+420 or 00420)(123456789) format",
    }
  ),
  defaultCity: z.number(),
});

export type FormValuesType = z.infer<typeof schema>;

export type FormFieldProps = {
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormValuesType>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "password"
  | "phoneNumber"
  | "defaultCity";
