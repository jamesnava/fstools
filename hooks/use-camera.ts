import { CameraView } from "expo-camera";
import { Dispatch, RefObject, SetStateAction } from "react";

interface props {
  cameraRef: RefObject<CameraView | null>;
  fotoUri: string | null;
  setFotoUri: Dispatch<SetStateAction<string | null>>;
}

export const tomarFoto = async ({ cameraRef, setFotoUri, fotoUri }: props) => {
  if (cameraRef.current) {
    const foto = await cameraRef.current.takePictureAsync();
    setFotoUri(foto.uri);
  }
};
