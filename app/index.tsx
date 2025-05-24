import { StyleSheet, View, FlatList, TextInput, Text } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState, useEffect, useRef } from "react";

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
  const flatListRef = useRef<FlatList | null>(null);

  // Force FlatList to update when shoppingList changes
  useEffect(() => {
    if (flatListRef.current) {
      // This will force the FlatList to re-render
      flatListRef.current.forceUpdate?.();
    }
    console.log("Shopping list updated:", shoppingList);
  }, [shoppingList]);

  const handleSubmit = () => {
    console.log("Submit pressed with input:", input);

    if (input.trim()) {
      // Create a new item with a more reliable ID
      const newItem = {
        id: Date.now().toString(),
        name: input.trim()
      };

      // Update using functional form to ensure we have the latest state
      setShoppingList(prevList => [newItem, ...prevList]);
      setInput("");

      console.log("Added new item:", newItem);
    }
  };

  // Key for the entire FlatList to force re-render
  const flatListKey = `flatlist-${shoppingList.length}`;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="E.g Coffee"
        style={styles.textInput}
        value={input}
        onChangeText={text => setInput(text)}
        returnKeyType="done"
        autoCorrect={true}
        onSubmitEditing={handleSubmit}
        autoCapitalize="words"
        autoFocus
      />
      <FlatList
        ref={flatListRef}
        key={flatListKey}
        data={shoppingList}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        extraData={shoppingList.length}
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