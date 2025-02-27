import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropDownProps<T extends { label: string; value: string }> {
  value: T;
  onBlur: () => void;
  onChange: (itemValue: string) => void;
  items: T[];
}

export function Dropdown<T extends { label: string; value: string }>({
  value,
  onBlur,
  onChange,
  items,
}: DropDownProps<T>) {
  return (
    <Picker
      style={styles.dropdown}
      selectedValue={value.value}
      onValueChange={onChange}
      onBlur={onBlur}
    >
      {items.map((item) => (
        <Picker.Item key={item.label} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
