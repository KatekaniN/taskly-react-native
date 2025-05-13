import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack >
            <Stack.Screen name="App" options={{ title: "Shopping List" }} />
        </Stack>
    )
}