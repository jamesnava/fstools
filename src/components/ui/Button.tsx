import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  texto: string;
  color: string;
  onpres?: () => void;
}

const Button = ({ texto, color, onpres }: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={onpres}
    >
      <Text style={styles.text}>{texto}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 2,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default Button;
