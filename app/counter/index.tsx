import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
/*import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";*/

export default function CounterScreen() {
    /*const handleRequestPermission = async () => {
        const result = await registerForPushNotificationsAsync();
        console.log("Notification permission status:", result);
    }*/
    return (
        <View >
            <TouchableOpacity activeOpacity={0.8}  >
                <Text >Request Permission</Text>
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
