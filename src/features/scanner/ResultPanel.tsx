import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface ResultPanelProps {
  useSData: string;
  useMStatus: string;
  useMData: string;
  useTCode: string;
  textExtraido: string;
  loading: boolean;
  onSDataChange: (text: string) => void;
  onMStatusChange: (text: string) => void;
  onMDataChange: (text: string) => void;
  onTCodeChange: (text: string) => void;
}

const ResultPanel = ({
  useSData,
  useMStatus,
  useMData,
  useTCode,
  textExtraido,
  loading,
  onSDataChange,
  onMStatusChange,
  onMDataChange,
  onTCodeChange,
}: ResultPanelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      <View style={styles.controles}>
        <Text style={styles.label}>S-Data</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={onSDataChange}
          value={useSData}
        />
        <Text style={styles.label}>M-Status</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={onMStatusChange}
          value={useMStatus}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.controles}>
        <Text style={styles.label}>M-Data</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={onMDataChange}
          value={useMData}
        />
        <Text style={styles.label}>T-Code</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={onTCodeChange}
          value={useTCode}
        />
      </View>
      <View style={styles.controles}>
        <Text style={styles.label}>Resultado</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <ScrollView
            style={{ maxHeight: 200 }}
            contentContainerStyle={{ padding: 10 }}
          >
            <Text style={styles.resultText}>{textExtraido}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "90%",
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
  textinput: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    width: 70,
    backgroundColor: "#ccc2c2",
    borderRadius: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#f7f1f1",
    borderBottomWidth: 1,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    flexWrap: "wrap",
    flexShrink: 1,
    textAlign: "justify",
    borderColor: "#00FF00",
    borderWidth: 2,
  },
});

export default ResultPanel;
