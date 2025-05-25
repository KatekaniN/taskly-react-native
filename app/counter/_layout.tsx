import { Stack, Link } from "expo-router";
import { theme } from "../../theme";
import { Pressable } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Counter",
                    headerRight: () => (
                        <Link href="/counter/history" asChild>
                            <Pressable
                                hitSlop={32}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 16, // Use padding instead of margins
                                    minWidth: 44, // Ensure adequate touch target
                                    justifyContent: 'center'
                                }}
                            >
                                <FontAwesome5
                                    name="history"
                                    size={22}
                                    color={theme.colorGrey}
                                />
                            </Pressable>
                        </Link>
                    )
                }}
            />
        </Stack>
    );
}