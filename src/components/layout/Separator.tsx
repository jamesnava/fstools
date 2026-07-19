import { StyleSheet, View } from "react-native";

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "#f7f1f1",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Separator;
