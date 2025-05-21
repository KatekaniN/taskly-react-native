import { Stack, Link } from "expo-router";
import { theme } from "../../theme";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable } from "react-native";
import { useRouter } from 'expo-router';

export default function Layout() {

    const router = useRouter();
    return (
        <Stack>
            < Stack.Screen name="index" options={{
                title: "Counter", headerRight: () => {
                    return <Pressable onPress={() => router.push('/counter/history')} style={{ paddingRight: 10 }} hitSlop={20}>
                        <FontAwesome5 name="history" size={24} color={theme.colorGrey} />
                    </Pressable>
                }
            }} />
        </Stack >
    )
}