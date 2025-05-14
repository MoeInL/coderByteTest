import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  Text,
} from "react-native";

import type { ArticleType } from "@/src/services/articles/types";
import { ArticleService } from "@/src/services";

import { useAppSafeAreaInsets } from "@/src/hooks";

import { ArticleCard, Header } from "@/src/components";

const categories = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
] as const;

type Category = (typeof categories)[number];

export default function Index() {
  /**** Constants ****/
  const router = useRouter();
  const { bottom } = useAppSafeAreaInsets();

  /**** State ****/
  const [selectedCategory, setSelectedCategory] = useState<Category>("general");

  const { isLoading, data: articles } = ArticleService.useGetArticles({
    category: selectedCategory,
  });

  const renderItem = useCallback(
    ({ item }: { item: ArticleType }) => (
      <ArticleCard
        article={item}
        onPress={() => {
          router.push({
            pathname: "./articleOverview",
            params: {
              article: JSON.stringify(item),
            },
          });
        }}
      />
    ),
    []
  );
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Header
        title="GNews"
        trailingIcon={{
          name: "search",
          onPress: () => router.push("/search"),
        }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.pill,
              selectedCategory === category && { backgroundColor: "#007AFF" },
            ]}
          >
            <Text
              style={[
                styles.pillText,
                selectedCategory === category && { color: "white" },
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={articles}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: "white",
  },
  categoriesContainer: {
    gap: 8,
    height: 42,
    paddingHorizontal: 16,
  },
  pill: {
    height: 34,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  pillText: {
    color: "#333",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  loader: {
    paddingVertical: 20,
  },
});
