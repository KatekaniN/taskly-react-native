import { StyleSheet, View, FlatList, TextInput } from "react-native";
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
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);

  const [input, setInput] = useState("");

  const handleTextChange = (text: string) => {
    setInput(text);
  };

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
  contentContainer: {
    paddingBottom: 24,
  },
});
