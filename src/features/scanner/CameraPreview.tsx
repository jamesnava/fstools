import { CameraSize } from "@/src/types/scanner.types";
import { CameraView, CameraView as CameraViewType } from "expo-camera";
import { RefObject } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FocusOverlay from "./FocusOverlay";

interface CameraPreviewProps {
  cameraRef: RefObject<CameraViewType | null>;
  fotoUri: string | null;
  cameraSize: CameraSize;
  onLayout: (width: number, height: number) => void;
}

function ImagePreview({ fotoUri }: { fotoUri: string }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1, { duration: 200 });
        savedScale.value = 1;
        savedTranslateX.value = 0;
        translateX.value = withTiming(0, { duration: 200 });
        savedTranslateY.value = 0;
        translateY.value = withTiming(0, { duration: 200 });
      } else {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .minPointers(1)
    .maxPointers(2)
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.camera}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.imageFill, animatedStyle]}>
          <Image source={{ uri: fotoUri }} style={styles.imageFill} />
        </Animated.View>
      </GestureDetector>
      <FocusOverlay />
    </View>
  );
}

const CameraPreview = ({
  cameraRef,
  fotoUri,
  cameraSize,
  onLayout,
}: CameraPreviewProps) => {
  return (
    <View style={styles.cameraContainer}>
      {fotoUri ? (
        <ImagePreview fotoUri={fotoUri} />
      ) : (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing="back"
          autofocus="on"
          zoom={0}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            onLayout(width, height);
          }}
        >
          <FocusOverlay />
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: "75%",
    width: "75%",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#333",
  },
  camera: {
    flex: 1,
  },
  imageFill: {
    width: "100%",
    height: "100%",
  },
});

export default CameraPreview;
