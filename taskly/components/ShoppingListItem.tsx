import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { theme } from "../theme";

type Props = {
    name: string;
    isCompleted?: boolean
}

export function ShoppingListItem({ name, isCompleted }: Props) {
    const handleDelete = () => {
        Alert.alert(`Are you sure you want to delete this ${name}?`, "This can't be undone", [{
            text: "Yes",
            onPress: () => console.log("Ok, deleting"),
            style: "destructive"
        },
        {
            text: "Cancel",
            onPress: () => console.log("Ok, cancelled"),
            style: "cancel"
        }])
    }
    return (
        <View style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}>
            <Text style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>{name}</Text>
            <TouchableOpacity style={[styles.button, isCompleted ? styles.completedButton : undefined]} onPress={handleDelete} activeOpacity={0.8}>
                <Text style={styles.buttonText} >
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
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
        textDecorationLine: "line-through"
    },
    itemText: {
        fontSize: 64,
        color: "#1a759f",
        fontWeight: 200,
    },
    button: {
        backgroundColor: theme.colorCerulean,
        padding: 8,
        borderRadius: 6,
    },
    buttonText: {
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "capitalize",
        letterSpacing: 1,
    }
});
