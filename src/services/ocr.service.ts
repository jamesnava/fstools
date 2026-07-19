import { RoiConfig, ScannerResult } from "@/src/types/scanner.types";

const API_URL = "https://601c-181-67-181-177.ngrok-free.app/upload/";

export async function processImage(
  fotoUri: string,
  roi: RoiConfig,
): Promise<ScannerResult> {
  const formData = new FormData();
  formData.append("file", {
    uri: fotoUri,
    type: "image/jpeg",
    name: "captura.jpg",
  } as any);

  formData.append("roi", JSON.stringify(roi));

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del backend:", errorText);
    throw new Error(`Backend devolvió error: ${response.status}`);
  }

  const data = await response.json();
  return data as ScannerResult;
}
