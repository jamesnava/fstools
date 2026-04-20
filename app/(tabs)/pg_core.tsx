import CButton from "@/components/widgets/button";
import { tomarFoto } from "@/hooks/use-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Separador = () => <View style={styles.Separador} />;

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  async function enviarFoto(fotoUri: string) {
    const formData = new FormData();
    formData.append("file", {
      uri: fotoUri,
      type: "image/jpeg",
      name: "captura.jpg",
    } as any); //aqui construir?

    await fetch("http://192.168.18.20:8000/upload/", {
      method: "POST",
      body: formData,
    });

    setFotoUri(null);
  }

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
            {fotoUri ? (
              <Image source={{ uri: fotoUri }} style={styles.camera} />
            ) : (
              <CameraView style={styles.camera} ref={cameraRef} facing="back">
                {/* MARCO DE ENFOQUE */}
                <View style={styles.overlay}>
                  <View style={styles.focusFrame} />
                </View>
              </CameraView>
            )}
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
          <CButton
            texto="Capturar"
            color="#5D83D9"
            onpres={() => tomarFoto({ cameraRef, setFotoUri, fotoUri })}
          />
          <CButton
            texto="Procesar"
            color="#6FE88A"
            onpres={() => {
              if (fotoUri) enviarFoto(fotoUri!);
            }}
          />
        </View>
        <Separador />
        <View style={styles.contenedorColumna}>
          <Text style={styles.text}>Resultados</Text>
          <View style={styles.controles}>
            <Text style={styles.text}>Error</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "#fff",
                borderWidth: 2,
                width: 150,
                backgroundColor: "#ccc2c2",
                borderRadius: 10,
              }}
              placeholder="codigo"
            />
          </View>
          <Separador />
          <View style={styles.controles}>
            <Text style={styles.text}>Resultado</Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: "white",
                flexWrap: "wrap",
                flexShrink: 1,
                textAlign: "justify",
              }}
            >
              Este es un párrafo de ejemplo. Puedes escribir varias oraciones
              dentro de un mismo componente Text y se mostrarán como un bloque
              continuo.
            </Text>
          </View>
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
  contenedorColumna: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "90%",
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
    backgroundColor: "rgba(0, 255, 0, .05)", // Un toque de color dentro
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
