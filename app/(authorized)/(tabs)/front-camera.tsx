import { Button, StyleSheet } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { ThemedText, ThemedView } from "@/components";
import { useState } from "react";
import ScreenWrapper from "@/components/screenWrapper/ScreenWrapper";

export default function FrontCameraScreen() {
  const [facing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return null;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ScreenWrapper
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedView style={styles.permissionContainer}>
          <ThemedText style={styles.message}>
            We need your permission to show the camera.
          </ThemedText>
          <Button onPress={requestPermission} title="Grant permission" />
        </ThemedView>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ThemedView style={styles.cameraContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Front Camera</ThemedText>
        </ThemedView>
        <CameraView style={styles.camera} facing={facing} />
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  permissionContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
    height: "80%",
  },
  titleContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },
});
