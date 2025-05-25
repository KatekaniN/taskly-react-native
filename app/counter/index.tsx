import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

export default function CounterScreen() {
    const handleRequestPermission = () => {
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Request Permission</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    buttonText: {
        letterSpacing: 1,
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 16,
        borderRadius: 8,
    }
});
