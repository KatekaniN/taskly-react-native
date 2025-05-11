import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Cofee</Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    paddingHorizontal: 8,
    borderBottomColor: "#1a759f",
    borderBottomWidth: 4,
    backgroundColor: "white",
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 64,
    color: "#1a759f",
    fontWeight: 200,
  }
});
