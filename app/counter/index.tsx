import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, useWindowDimensions } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { useEffect, useState, useRef } from "react";
import { TimeSegment } from "../../components/TimeSegment";
import * as Notifications from "expo-notifications";
import { Duration, intervalToDuration, isBefore, set } from "date-fns";
import { getFromStorage, saveToStorage } from "../../utils/storage";

type CountdownStatus = {
    isOverdue: boolean;
    distance: Duration // This is a type that represents the duration of the countdown
}

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestampS: number[]
}

const frequency = 14 * 24 * 60 * 60 * 1000;

export default function CounterScreen() {

    const { width } = useWindowDimensions();
    const confettiRef = useRef<any>();

    const [isLoading, setIsLoading] = useState(true);

    const [countdownState, setCountdownState] = useState<PersistedCountdownState>()

    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: {}
    })
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    const lastCompletedAtTimestamp = countdownState?.completedAtTimestampS?.[0];

    useEffect(() => {
        const init = async () => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value)
            setIsLoading(false);
        }
        init();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeStamp = lastCompletedAtTimestamp ? lastCompletedAtTimestamp + frequency : Date.now(); // Use the last completed timestamp or current time 
            if (lastCompletedAtTimestamp) {
                setIsLoading(false); // Set loading to false only after the first timestamp is set
            }
            const isOverdue = isBefore(timeStamp, Date.now()); // Check if the current time is before the timestamp
            const distance = intervalToDuration(isOverdue ? { start: timeStamp, end: Date.now() } : { start: Date.now(), end: timeStamp }); // Calculate the distance only if not overdue
            setStatus({
                isOverdue,
                distance
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [lastCompletedAtTimestamp]);

    const scheduleNotification = async () => {
        confettiRef?.current?.start();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        let pushNotificationId;
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            pushNotificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time to wash the car! 🚗",
                },
                trigger: {
                    seconds: frequency / 1000,
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
        if (countdownState?.currentNotificationId) {
            await Notifications.cancelScheduledNotificationAsync(countdownState.currentNotificationId);
        }

        const newCountdownState: PersistedCountdownState = {
            currentNotificationId: pushNotificationId,
            completedAtTimestampS: countdownState ? [Date.now(), ...countdownState.completedAtTimestampS] : [Date.now()]
        }
        setCountdownState(newCountdownState);
        await saveToStorage(countdownStorageKey, newCountdownState);
    }

    if (isLoading) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color={theme.colorCerulean} />
            </View>
        );
    }

    return (
        <View style={[styles.container, status.isOverdue ? styles.containerLate : { backgroundColor: theme.colorWhite }]}>
            {status.isOverdue ? (
                <Text style={[styles.heading, styles.whiteText]}> Washing the car is overdue by: </Text>
            ) :
                <Text style={styles.heading}>
                    Wash the car is due in: </Text>}
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
                <Text style={styles.buttonText}>I've washed the car!</Text>
            </TouchableOpacity >
            <ConfettiCannon
                ref={confettiRef}
                count={200}
                origin={{ x: width / 2, y: -30 }}
                fadeOut={true}
                autoStart={false}
            />
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
    }, activityIndicatorContainer: {
        backgroundColor: theme.colorWhite,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
});