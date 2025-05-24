import { StyleSheet, View, FlatList, TextInput, Text, LayoutAnimation, Platform, UIManager } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState, useRef, useEffect, use } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage"; // Importing utility functions for storage

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const storageKey = "shopping-list";

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
        { id: new Date().toTimeString(), name: input, lastUpdatedTimestamp: Date.now() },
        ...shoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList); // Save the new list, not the old one
      setInput("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter(
      (item) => item.id !== id)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList); // Save the new list
  }

  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(),
        };
      }
      return item;
    })
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList); // Save the new list
  }

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await getFromStorage(storageKey);
        if (data) {
          // Only animate if there's actual data to show
          if (data.length > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }
          setShoppingList(data);
        }
      } catch (error) {
        console.error("Failed to load shopping list:", error);
      }
    };
    fetchInitial();
  }, [])

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
        data={orderShoppingList(shoppingList)} // prop of Flatlist to get data to render
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text>Your shopping list is empty</Text>
          </View>
        )}
        stickyHeaderIndices={[0]} // prop of Flatlist to make the header sticky
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (  // renderItem is a function that takes an item from the data array and returns a component to render
          <ShoppingListItem key={item.id} name={item.name} onDelete={() => handleDelete(item.id)} isCompleted={Boolean(item.completedAtTimestamp)} onToggleComplete={() => { handleToggleComplete(item.id) }} /> // ShoppingListItem is a component that takes a name prop and a key prop as defined above
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
