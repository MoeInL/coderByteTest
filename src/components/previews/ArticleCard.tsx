import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";

import type { ArticleType } from "@/src/services";

type ArticleCardProps = {
  article: ArticleType;
  onPress?: () => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        contentFit="cover"
        style={styles.image}
        source={{ uri: article.image }}
      />
      <View style={{ padding: 16 }}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.textColor}>{article.source.name}</Text>

          <Text style={styles.textColor}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowRadius: 4,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    marginHorizontal: 16,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textColor: {
    fontSize: 12,
    color: "#888",
  },
});
