import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function WelcomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/fondo.png")}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">FSTOOLS</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bienvenido</ThemedText>
        <ThemedText>
          <ThemedText type="default">
            Con esta herramienta puedes tomar una foto del código de error que
            aparece en el cajero automático. El sistema reconoce el código, lo
            revisa en la base de datos y te muestra al instante la información
            relacionada, ayudándote a entender y resolver el problema
            fácilmente.
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
