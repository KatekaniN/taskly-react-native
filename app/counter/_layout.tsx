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
                                    paddingHorizontal: 10,
                                    minWidth: 48,
                                    justifyContent: 'center',
                                    height: 44,
                                    transform: [{ translateY: 0 }],
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