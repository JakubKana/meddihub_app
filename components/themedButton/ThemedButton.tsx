import { useThemeColor } from "@/hooks/useThemeColor";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
}

const ThemedButton = ({
  title,
  onPress,
  lightColor,
  darkColor,
  style,
  ...props
}: ButtonProps) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Platform.OS === "ios" ? "rgba(0,0,0,0.2)" : "transparent",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});

export { ThemedButton };
