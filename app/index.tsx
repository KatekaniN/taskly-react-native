import { StyleSheet, View, FlatList, TextInput, Text } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      // Use the functional form of setState to ensure we're working with the latest state
      setShoppingList(currentList => [
        { id: new Date().toISOString(), name: input.trim() },
        ...currentList
      ]);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="E.g Coffee"
        style={styles.textInput}
        value={input}
        onChangeText={setInput}
        returnKeyType="done"
        autoCorrect={true}
        onSubmitEditing={handleSubmit}
        autoCapitalize="words"
        autoFocus
      />
      <FlatList
        data={shoppingList}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text>Your shopping list is empty</Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ShoppingListItem name={item.name} key={item.id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: theme.colorWhite,
    fontSize: 18,
    borderRadius: 50,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18
  },
  contentContainer: {
    paddingBottom: 24,
  },
});