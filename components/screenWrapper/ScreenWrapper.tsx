import { StyleSheet, ViewProps } from "react-native";
import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({
  children,
  style,
}: PropsWithChildren<ViewProps>) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
