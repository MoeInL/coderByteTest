import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

import { useAppSafeAreaInsets } from "@/src/hooks";

interface HeaderProps {
  title?: string;
  leadingIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
  };
  trailingIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leadingIcon,
  trailingIcon,
}) => {
  const { top } = useAppSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }}>
      <View style={styles.content}>
        <TouchableOpacity
          disabled={!leadingIcon}
          style={styles.iconContainer}
          onPress={leadingIcon?.onPress}
        >
          {leadingIcon && (
            <MaterialIcons name={leadingIcon.name} size={24} color="black" />
          )}
        </TouchableOpacity>

        {title && <Text style={styles.title}>{title}</Text>}

        <TouchableOpacity
          disabled={!trailingIcon}
          style={styles.iconContainer}
          onPress={trailingIcon?.onPress}
        >
          {trailingIcon && (
            <MaterialIcons name={trailingIcon.name} size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  title: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
