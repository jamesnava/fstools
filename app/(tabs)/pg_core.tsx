import CButton from "@/components/widgets/button";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Separador = () => <View style={styles.Separador} />;

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.containerImage}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos permiso para la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containermain}>
        <View style={styles.containerImage}>
          <Text style={styles.title}>Capturar Imagen</Text>

          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera}>
              {/* MARCO DE ENFOQUE */}
              <View style={styles.overlay}>
                <View style={styles.focusFrame} />
              </View>
            </CameraView>
          </View>
        </View>
        <Separador />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <CButton texto="Capturar" color="#5D83D9" />
          <CButton texto="Procesar" color="#6FE88A" />
        </View>
        <Separador />
        <View style={styles.controles}>
          <Text style={styles.text}>Resultados</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  containerImage: {
    height: "50%",
    backgroundColor: "#474444",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  cameraContainer: {
    height: "75%",
    width: "75%", // Ancho del visor
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
  Separador: {
    marginVertical: 8,
    borderBottomColor: "#f7f1f1",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
