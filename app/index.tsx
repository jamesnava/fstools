import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos permiso para la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escáner de Documentos</Text>

      {/* CONTENEDOR DEL VISOR (No es pantalla completa) */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing}>
          {/* MARCO DE ENFOQUE */}
          <View style={styles.overlay}>
            <View style={styles.focusFrame} />
          </View>
        </CameraView>
      </View>

      <TouchableOpacity
        style={styles.flipButton}
        onPress={() => setFacing(facing === "back" ? "front" : "back")}
      >
        <Text style={styles.text}>Voltear Cámara</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fondo oscuro para resaltar la cámara
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  cameraContainer: {
    width: "85%", // Ancho del visor
    height: "60%", // Largo del visor
    borderRadius: 20,
    overflow: "hidden", // Para que la cámara respete los bordes redondeados
    borderWidth: 2,
    borderColor: "#333",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  focusFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#00FF00", // Color verde para simular enfoque
    backgroundColor: "rgba(0, 255, 0, 0.05)", // Un toque de color dentro
    borderRadius: 10,
  },
  flipButton: {
    marginTop: 30,
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
