import { StyleSheet, View } from "react-native";

const FocusOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.focusFrame} />
      <View style={styles.cross}>
        <View style={styles.verticalLine} />
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  focusFrame: {
    width: "60%",
    height: "50%",
    borderWidth: 2,
    borderColor: "#00FF00",
    borderStyle: "dashed",
    backgroundColor: "transparent",
  },
  cross: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  horizontalLine: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});

export default FocusOverlay;
