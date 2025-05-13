import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "./components/ShoppingListItem";
import { Link } from "expo-router";

export default function App() {
    return (
        <View style={styles.container}>
            <Link href="/counter" style={{ textAlign: "center", marginBottom: 18, fontSize: 24, color: theme.colorCerulean }}>Go to counter</Link>
            <ShoppingListItem name="coffee" isCompleted />
            <ShoppingListItem name="tea" />
            <ShoppingListItem name="sugar" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
