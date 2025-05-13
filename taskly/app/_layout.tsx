import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ title: "Taskly" }} />
            <Stack.Screen name="task" options={{ title: "Task" }} />
            <Stack.Screen name="shopping-list" options={{ title: "Shopping List" }} />
            <Stack.Screen name="shopping-list-item" options={{ title: "Shopping List Item" }} />
        </Stack>
    )
}