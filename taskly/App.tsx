import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { DeleteBtn } from './assets/DeleteBtn.svg';
import { theme } from "./theme";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.info("Delete button pressed")}
          activeOpacity={0.8}
        >
          <DeleteBtn width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomColor: "#1a759f",
    borderBottomWidth: 4,
    backgroundColor: "white",
    paddingVertical: 16,
    width: "100%",
  },
  itemText: {
    fontSize: 64,
    color: "#1a759f",
    fontWeight: 200,
  },
  button: {
    backgroundColor: theme.colorCerulean,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: 1,
  }
});
