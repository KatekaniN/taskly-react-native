import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Katekani Jacqueline Nyamandi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 24,
    color: "white",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
