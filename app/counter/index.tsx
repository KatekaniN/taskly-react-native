import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
    const scheduleNotification = async () => {
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "I'm a notification from your app! 📨",
                },
                trigger: {
                    seconds: 5,
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                },
            });
        }
        else {
            if (Device.isDevice) {
                Alert.alert("Unable to schedule notification",
                    "Enable the notifications permission for this app in settings",);
            }

        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={scheduleNotification}  >
                <Text style={styles.buttonText}>Schedule notification</Text>
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
        backgroundColor: theme.colorCerulean,
        padding: 16,
        borderRadius: 8,
    }
});
