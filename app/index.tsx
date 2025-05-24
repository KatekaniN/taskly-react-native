import { StyleSheet, View, FlatList, TextInput, Text } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState, useRef, useEffect } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
};

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>([]);

  const flatListRef = useRef<FlatList>(null);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.forceUpdate?.();
    }
  }, [shoppingList]);

  const handleSubmit = () => {
    if (input) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: input },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setInput("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(
      (item) => item.id !== id)
    setShoppingList(newShoppingList);
  }

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp ? undefined : Date.now(),
        };
      }
      return item;
    })
    setShoppingList(newShoppingList);
  }
  const flatListKey = `flatlist-${shoppingList.length}`;

  return (
    <View style={styles.container}>
      <TextInput // keep outside of FlatList so it doesn't get re-rendered every time the list changes
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
      <FlatList  // best for items we are mapping over vs scrollview
        ref={flatListRef} // ref to the FlatList to access its methods
        key={flatListKey} // key to force re-render of FlatList when shoppingList changes
        data={shoppingList} // prop of Flatlist to get data to render
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text>Your shopping list is empty</Text>
          </View>
        )}
        stickyHeaderIndices={[0]} // prop of Flatlist to make the header sticky
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (  // renderItem is a function that takes an item from the data array and returns a component to render
          <ShoppingListItem key={item.id} name={item.name} onDelete={() => handleDelete(item.id)} isCompleted={Boolean(item.completedAtTimeStamp)} onToggleComplete={() => { handleToggleComplete(item.id) }} /> // ShoppingListItem is a component that takes a name prop and a key prop as defined above
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
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
