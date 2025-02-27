import { FieldError, UseFormRegister } from "react-hook-form";
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
});

export type FormValuesType = z.infer<typeof schema>;

export type FormFieldProps = {
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormValuesType>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "email" | "password";
