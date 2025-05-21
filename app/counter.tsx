// app/counter.tsx
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { useRouter } from "expo-router";

export default function CounterScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.navigate("/idea")} activeOpacity={0.9}>
                <Text style={{ textAlign: "center", marginBottom: 18, fontSize: 48, color: theme.colorCerulean }}>
                    Go to idea page
                </Text>
            </TouchableOpacity>
            <Text style={styles.text}>Counter</Text>
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
    text: {
        fontSize: 24,
    },
});
