import { Stack, Link } from "expo-router";
import { theme } from "../../theme";
import { Pressable, View, StyleSheet } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Counter",
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <Link href="/counter/history" asChild>
                                <Pressable
                                    hitSlop={32}
                                    style={styles.historyButton}
                                >
                                    <FontAwesome5
                                        name="history"
                                        size={22}
                                        color={theme.colorGrey}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    )
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    headerRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
    },
    historyButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    }
});