export interface ScannerResult {
  texto: string;
  valido: {
    s_data: string;
    m_status: string;
    m_data: string;
    t_code: string;
  };
}

export interface RoiConfig {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CameraSize {
  width: number;
  height: number;
}
