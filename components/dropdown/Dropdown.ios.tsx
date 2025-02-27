import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedView } from "../themedView/ThemedView";

interface DropDownProps<T extends { label: string; value: string }> {
  value: T;
  onBlur: () => void;
  onChange: (itemValue: string) => void;
  items: T[];
}

export const Dropdown = <T extends { label: string; value: string }>({
  value,
  onBlur,
  onChange,
  items,
}: DropDownProps<T>) => {
  return (
    <ThemedView style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={value.value}
        onValueChange={onChange}
        onBlur={onBlur}
      >
        {items.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    height: 80,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 80,
  },
});
