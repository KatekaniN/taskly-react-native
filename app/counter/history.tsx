
import { Text, View, StyleSheet, FlatList } from "react-native";
import { countdownStorageKey, PersistedCountdownState } from "./";
import { theme } from "../../theme";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getFromStorage } from "../../utils/storage";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
    const [countdownState, setCountdownState] = useState<PersistedCountdownState>();

    useEffect(() => {
        const init = async () => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value);
        };
        init();
    }, []);

    return (
        <FlatList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={<View style={styles.listEmptyContainer}>
                <Text>Your history list is empty</Text>
            </View>}
            data={countdownState?.completedAtTimestampS}
            renderItem={({ item }) =>
            (<View style={styles.listItem}>
                <Text>
                    {format(item, fullDateFormat)}
                </Text>
            </View>)
            } />
    );
}



const styles = StyleSheet.create({

    contentContainer: {
        marginTop: 12,
    },
    listItem: {
        backgroundColor: theme.colorLightGrey,
        marginHorizontal: 8,
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    listItemText: {
        fontSize: 18,
    },
    list: {
        flex: 1,
        backgroundColor: theme.colorWhite,
        padding: 16,
    },
    listEmptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 18
    },
});

