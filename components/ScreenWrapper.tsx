import { StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper(props: PropsWithChildren<{}>) {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
