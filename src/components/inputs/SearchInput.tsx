import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  type TextInputProps,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
} from "react-native";

type SearchInputProps = TextInputProps & {
  onClear?: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onClear,
  onChangeText,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons name="search" size={24} color="#666" />

      <TextInput
        value={value}
        autoCorrect={false}
        style={styles.input}
        autoCapitalize="none"
        returnKeyType="search"
        onChangeText={onChangeText}
        placeholder="Search articles..."
        {...props}
      />

      {value ? (
        <TouchableOpacity onPress={onClear} style={{ padding: 4 }}>
          <MaterialIcons name="close" size={20} color="#666" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
});
