import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", { // Create a notification channel for Android
            name: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
            vibrationPattern: [0, 250, 250, 250],
            showBadge: false,
        });
    }
    // Only register for push notifications on physical devices
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        if (existingStatus !== "granted") { // If not granted, request permissions
            const { status } = await Notifications.requestPermissionsAsync(); // Request permissions
            return status; // Return the new status
        } else {
            return existingStatus; // If already granted, return the existing status
        }
    } else {
        return null; // If not a physical device, return null
    }
}