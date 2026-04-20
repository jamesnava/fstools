import { Pressable, Text } from "react-native";

interface props {
  texto: string;
  color: string;
  onpres?: () => void;
}

const CButton = ({ texto, color, onpres }: props) => {
  return (
    <Pressable
      style={{
        backgroundColor: color,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        margin: 2,
      }}
      onPress={onpres}
    >
      <Text>{texto}</Text>
    </Pressable>
  );
};

export default CButton;
