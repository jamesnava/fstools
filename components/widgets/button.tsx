import { Pressable, Text } from "react-native";

interface props {
  texto: string;
  color: string;
}

const CButton = ({ texto, color }: props) => {
  return (
    <Pressable
      style={{
        backgroundColor: color,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        margin: 2,
      }}
    >
      <Text>{texto}</Text>
    </Pressable>
  );
};

export default CButton;
