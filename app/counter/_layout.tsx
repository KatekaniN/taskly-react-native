import { Stack, Link } from "expo-router";
import { theme } from "../../theme";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable } from "react-native";

export default function Layout() {
    return (
        <Stack>
            < Stack.Screen name="index" options={{
                title: "Counter", headerRight: () => {
                    return <Link href="/counter/history" asChild>
                        <Pressable hitSlop={20} style={{ padding: 10 }}>
                            <FontAwesome5 name="history" size={32} color={theme.colorGrey} />
                        </Pressable>
                    </Link>
                }
            }} />
        </Stack>
    )
}