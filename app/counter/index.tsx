import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import { TimeSegment } from "../../components/TimeSegment";
import * as Notifications from "expo-notifications";
import { Duration, intervalToDuration, isBefore, set } from "date-fns";

type CountdownStatus = {
    isOverdue: boolean;
    distance: Duration // This is a type that represents the duration of the countdown
}

const timeStamp = Date.now() + 10 * 1000; // 10 seconds from now for testing purposes

export default function CounterScreen() {

    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: {}
    })
    console.log(status);
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const isOverdue = isBefore(timeStamp, Date.now()); // Check if the current time is before the timestamp
            const distance = intervalToDuration(isOverdue ? { start: timeStamp, end: Date.now() } : { start: Date.now(), end: timeStamp }); // Calculate the distance only if not overdue
            setStatus({
                isOverdue,
                distance
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const scheduleNotification = async () => {
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "I'm a notification from your taskly ! 📨",
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
        <View style={[styles.container, status.isOverdue ? styles.containerLate : { backgroundColor: theme.colorCerulean }]}>
            {status.isOverdue ? (
                <Text style={[styles.heading, styles.whiteText]}> Thing overdue by: </Text>
            ) :
                <Text style={styles.heading}>
                    Thing due in: </Text>}
            <View style={styles.row}>
                <TimeSegment
                    number={status.distance.days ?? 0}
                    unit="Days"
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Hours"
                    number={status.distance.hours ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Minutes"
                    number={status.distance.minutes ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Seconds"
                    number={status.distance.seconds ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={scheduleNotification}  >
                <Text style={styles.buttonText}>I've done the thing!</Text>
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
    containerLate: {
        backgroundColor: theme.colorRed,
    },
    buttonText: {
        letterSpacing: 1,
        fontSize: 18,
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 16,
        borderRadius: 8,
    },
    row: {
        flexDirection: "row",
        marginBottom: 24,
    },
    heading: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 24,
        color: theme.colorBlack,
    },
    whiteText: {
        color: theme.colorWhite,
        fontWeight: "bold",
    }
});
