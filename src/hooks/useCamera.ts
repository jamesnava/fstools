import { CameraSize } from "@/src/types/scanner.types";
import { CameraView } from "expo-camera";
import { useRef, useState } from "react";

export function useCamera() {
  const cameraRef = useRef<CameraView>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [cameraSize, setCameraSize] = useState<CameraSize>({
    width: 0,
    height: 0,
  });

  const tomarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      if (foto?.uri) {
        setFotoUri(foto.uri);
      }
    }
  };

  const limpiarFoto = () => {
    setFotoUri(null);
  };

  return {
    cameraRef,
    fotoUri,
    cameraSize,
    setCameraSize,
    tomarFoto,
    limpiarFoto,
  };
}
