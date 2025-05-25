import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from "react-native";
import { theme } from "../theme"
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    name: string;
    isCompleted?: boolean;
    onToggleComplete: () => void;
    onDelete: () => void;
}

export default function ShoppingListItem({ name, isCompleted, onDelete, onToggleComplete }: Props) {
    const handleDelete = () => {
        Alert.alert(
            `Are you sure you want to delete this ${name}?`,
            "This can't be undone",
            [
                { text: "Yes", onPress: () => onDelete(), style: "destructive" },
                { text: "Cancel", onPress: () => console.log("Ok, cancelled"), style: "cancel" }
            ]
        )
    }

    return (
        <Pressable
            onPress={onToggleComplete}
            style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}
        >
            <View style={styles.row}>
                <Entypo style={styles.checkContainer} name={isCompleted ? "check" : "circle"} size={24} color={isCompleted ? theme.colorGrey : theme.colorCerulean} />
                <Text style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>
                    {name}
                </Text>
            </View>
            <TouchableOpacity onPress={handleDelete}>
                <AntDesign
                    name="closecircle"
                    size={24}
                    color={isCompleted ? theme.colorGrey : theme.colorRed}
                />
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        borderBottomColor: theme.colorCerulean,
        borderBottomWidth: 4,
        backgroundColor: "white",
        paddingVertical: 16,
        width: "100%",
    },
    completedContainer: {
        backgroundColor: theme.colorLightGrey,
        borderBottomColor: theme.colorLightGrey,
    },
    completedButton: {
        backgroundColor: theme.colorGrey,
    },
    completedText: {
        textDecorationColor: theme.colorGrey,
        textDecorationLine: "line-through",
        color: theme.colorGrey,
    },
    itemText: {
        fontSize: 28,
        color: theme.colorBlack,
        flex: 1,
        fontWeight: 200,
    },
    row: {
        flexDirection: "row",
        gap: 12,
        flex: 1,
    },
    checkContainer: {
        justifyContent: "center",
        paddingTop: 10,
    }
});
