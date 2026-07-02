import CButton from "@/components/widgets/button";
import { tomarFoto } from "@/hooks/use-camera";
import { styles } from "@/styles/style-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Separador = () => <View style={styles.Separador} />;

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
  const [textExtraido, setTextoExtraido] = useState("");
  const [loading, SetLoading] = useState(false);

  async function enviarFoto(fotoUri: string) {
    try {
      SetLoading(true);
      // Marco centrado de 200x200
      const frameW = cameraSize.width * 0.35;
      const frameH = cameraSize.height * 0.2;
      const frameX = (cameraSize.width - frameW) / 2;
      const frameY = (cameraSize.height - frameH) / 2;

      // Proporciones respecto al CameraView
      const roi = {
        x: frameX / cameraSize.width,
        y: frameY / cameraSize.height,
        w: frameW / cameraSize.width,
        h: frameH / cameraSize.height,
      };
      const formData = new FormData();
      formData.append("file", {
        uri: fotoUri,
        type: "image/jpeg",
        name: "captura.jpg",
      } as any); //aqui construir?

      formData.append("roi", JSON.stringify(roi));
      const response = await fetch(
        "https://6652-38-250-155-2.ngrok-free.app/upload/",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      //console.log("Respuesta del backend:", data);
      setTextoExtraido(data.texto.texto);

      setFotoUri(null);
    } catch (error) {
      console.error("Error", error);
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
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containermain}>
        <View style={styles.containerImage}>
          <Text style={styles.title}>FsTools</Text>

          <View style={styles.cameraContainer}>
            {fotoUri ? (
              <Image source={{ uri: fotoUri }} style={styles.camera} />
            ) : (
              <CameraView
                style={styles.camera}
                ref={cameraRef}
                facing="back"
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setCameraSize({ width, height });
                }}
              >
                {/* MARCO DE ENFOQUE */}
                <View style={styles.overlay}>
                  <View style={styles.focusFrame} />
                  <View style={styles.cross}>
                    <View style={styles.verticalLine} />
                    <View style={styles.horizontalLine} />
                  </View>
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
            <Text style={styles.text}>M-Status</Text>
            <TextInput style={styles.textinput} placeholder="codigo" />
            <Text style={styles.text}>M-Data</Text>
            <TextInput style={styles.textinput} placeholder="codigo" />
          </View>
          <Separador />
          <View style={styles.controles}>
            <Text style={styles.text}>Resultado</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <ScrollView
                style={{ maxHeight: 200 }}
                contentContainerStyle={{ padding: 10 }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    color: "white",
                    flexWrap: "wrap",
                    flexShrink: 1,
                    textAlign: "justify",
                    borderColor: "#00FF00",
                    borderWidth: 2,
                  }}
                >
                  {textExtraido}
                </Text>
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
