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
    borderBottomWidth: 1,
    backgroundColor: "white",
    paddingVertical: 16,
    color: "1a759f",
  },
  itemText: {
    fontSize: 64,
    fontWeight: 200,
  }
});
