import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.info("Delete button pressed")}>
        <Text >
          Delete
        </Text>
      </Pressable>
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
