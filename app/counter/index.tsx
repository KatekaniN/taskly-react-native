import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
/*import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";*/

export default function CounterScreen() {
    /*const handleRequestPermission = async () => {
        const result = await registerForPushNotificationsAsync();
        console.log("Notification permission status:", result);
    }*/
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}   >
                <Text style={styles.buttonText}>Request Permission</Text>
            </TouchableOpacity >
        </View >
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
        color: theme.colorGrey,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    button: {
        backgroundColor: theme.colorCerulean,
        padding: 16,
        borderRadius: 8,
    }
});
