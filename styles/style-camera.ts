import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    width: "35%",
    height: "20%",
    borderWidth: 2,
    borderColor: "#00FF00", // Color verde para simular enfoque
    //backgroundColor: "rgba(0, 255, 0, .05)", // Un toque de color dentro
    borderStyle: "dashed",
    backgroundColor: "transparent",
    //borderRadius: 10,
  },

  cross: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: 10, // un poco más grande que el marco
    backgroundColor: "rgba(255,255,255,0.5)", // blanco semitransparente
  },
  horizontalLine: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.5)", // blanco semitransparente
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
  textinput: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    width: 70,
    backgroundColor: "#ccc2c2",
    borderRadius: 10,
  },
});
