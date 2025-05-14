import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";

import type { ArticleType } from "@/src/services";

type ArticlePreviewProps = {
  article: ArticleType;
  onPress?: () => void;
};

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  article,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {article.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.sourceContainer}>
            <MaterialIcons name="link" size={14} color="#666" />
            <Text style={styles.textStyle}>{article.source.name}</Text>
          </View>

          <Text style={styles.textStyle}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {article.image && (
        <Image
          contentFit="cover"
          style={styles.image}
          source={{ uri: article.image }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ArticlePreview;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderBottomColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourceContainer: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 12,
    color: "#666",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
