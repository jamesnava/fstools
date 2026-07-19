import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button as RNButton, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Separator from "@/src/components/layout/Separator";
import CButton from "@/src/components/ui/Button";
import { useCamera } from "@/src/hooks/useCamera";
import { processImage } from "@/src/services/ocr.service";
import CameraPreview from "./CameraPreview";
import ResultPanel from "./ResultPanel";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [useSData, setSData] = useState("");
  const [useMStatus, setMStatus] = useState("");
  const [useMData, setMData] = useState("");
  const [useTCode, setTCode] = useState("");
  const [textExtraido, setTextoExtraido] = useState("");
  const [loading, SetLoading] = useState(false);
  const [fotoAdjuntaUri, setFotoAdjuntaUri] = useState<string | null>(null);

  const {
    cameraRef,
    fotoUri,
    cameraSize,
    setCameraSize,
    tomarFoto,
    limpiarFoto,
  } = useCamera();

  function obtenerUriActual() {
    return fotoAdjuntaUri || fotoUri;
  }

  function limpiarSeleccion() {
    setFotoAdjuntaUri(null);
    limpiarFoto();
  }

  async function seleccionarImagen() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setFotoAdjuntaUri(result.assets[0].uri);
    }
  }

  async function enviarFoto(uri: string) {
    try {
      SetLoading(true);
      const frameW = cameraSize.width * 0.6;
      const frameH = cameraSize.height * 0.5;
      const frameX = (cameraSize.width - frameW) / 2;
      const frameY = (cameraSize.height - frameH) / 2;

      const roi = {
        x: frameX / cameraSize.width,
        y: frameY / cameraSize.height,
        w: frameW / cameraSize.width,
        h: frameH / cameraSize.height,
      };

      const data = await processImage(uri, roi);
      setTextoExtraido(data.texto);
      setSData(data.valido.s_data);
      setMStatus(data.valido.m_status);
      setMData(data.valido.m_data);
      setTCode(data.valido.t_code);
      limpiarSeleccion();
    } catch (error) {
      console.error("Error", error);
      limpiarSeleccion();
    } finally {
      SetLoading(false);
    }
  }

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.containerImage}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos permiso para la cámara
        </Text>
        <RNButton onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  const uriActual = obtenerUriActual();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containermain}>
        <View style={styles.containerImage}>
          <Text style={styles.title}>FsTools</Text>
          <CameraPreview
            cameraRef={cameraRef}
            fotoUri={uriActual}
            cameraSize={cameraSize}
            onLayout={(width, height) => setCameraSize({ width, height })}
          />
        </View>
        <Separator />
        <View style={styles.buttonRow}>
          {uriActual ? (
            <>
              <CButton
                texto="Cambiar"
                color="#5D83D9"
                onpres={limpiarSeleccion}
              />
              <CButton
                texto="Mover"
                color="#E8A854"
                onpres={seleccionarImagen}
              />
              <CButton
                texto="Procesar"
                color="#6FE88A"
                onpres={() => {
                  if (uriActual) enviarFoto(uriActual);
                }}
              />
            </>
          ) : (
            <>
              <CButton texto="Capturar" color="#5D83D9" onpres={tomarFoto} />
              <CButton
                texto="Adjuntar"
                color="#E8A854"
                onpres={seleccionarImagen}
              />
            </>
          )}
        </View>
        <Separator />
        <ResultPanel
          useSData={useSData}
          useMStatus={useMStatus}
          useMData={useMData}
          useTCode={useTCode}
          textExtraido={textExtraido}
          loading={loading}
          onSDataChange={setSData}
          onMStatusChange={setMStatus}
          onMDataChange={setMData}
          onTCodeChange={setTCode}
        />
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
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
});
