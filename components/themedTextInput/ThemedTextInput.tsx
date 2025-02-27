import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, TextInput } from "react-native";
import { TextInputProps, StyleSheet } from "react-native";
import { ThemedView } from "../themedView/ThemedView";

interface ThemedTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  lightColor?: string;
  darkColor?: string;
  onChangeText: (text: string) => void;
}

const ThemedTextInput = ({
  placeholder,
  value,
  onChangeText,
  lightColor,
  darkColor,
  style,
  ...props
}: ThemedTextInputProps) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <ThemedView style={styles.container}>
      <TextInput
        {...props}
        style={
          (styles.input, { backgroundColor: color, color: textColor }, style)
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={textColor}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#bebebe",
    borderStyle: "solid",
    width: "50%",
    borderRadius: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    lineHeight: 32,
    marginVertical: 8,
    flex: 1,
  },
});

export { ThemedTextInput };
