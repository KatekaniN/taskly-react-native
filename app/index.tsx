import { StyleSheet, View, FlatList, TextInput, Text, Button } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState, useEffect } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [input, setInput] = useState("");
  const [debugInfo, setDebugInfo] = useState("No items added yet");

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("Shopping list updated:", shoppingList);
    setDebugInfo(`List has ${shoppingList.length} items`);
  }, [shoppingList]);

  const handleSubmit = () => {
    console.log("Submit pressed with input:", input);

    if (input.trim()) {
      // Create a new item with a more reliable ID
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        name: input.trim()
      };

      // Update using functional form to ensure we have the latest state
      setShoppingList(prevList => [newItem, ...prevList]);
      setInput("");

      console.log("Added new item:", newItem);
    }
  };

  // Add a manual button for testing
  const addItemManually = () => {
    if (input.trim()) {
      handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>{debugInfo}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E.g Coffee"
          style={styles.textInput}
          value={input}
          onChangeText={text => setInput(text)}
          returnKeyType="done"
          autoCorrect={true}
          onSubmitEditing={handleSubmit}
          autoCapitalize="words"
        />
        <Button title="Add" onPress={addItemManually} />
      </View>

      <FlatList
        data={shoppingList}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text>Your shopping list is empty</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
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
  debugText: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: "#fff",
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
  itemContainer: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  itemText: {
    fontSize: 16,
  }
});