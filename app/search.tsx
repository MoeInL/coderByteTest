import React, { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
} from "react-native";

import { type ArticleType, ArticleService } from "@/src/services";

import { useAppSafeAreaInsets, useDebouncing } from "@/src/hooks";

import { ArticlePreview, Header, SearchInput } from "@/src/components";

export default function Search() {
  /**** State ****/
  const [searchQuery, setSearchQuery] = useState("");

  /**** Constants ****/
  const router = useRouter();
  const { bottom } = useAppSafeAreaInsets();
  const debouncedSearchQuery = useDebouncing(searchQuery, 500);
  const { data: searchResults, isLoading } =
    ArticleService.useSearchArticles(debouncedSearchQuery);

  const renderItem = useCallback(
    ({ item }: { item: ArticleType }) => (
      <ArticlePreview
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
    [router]
  );
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (searchQuery !== "" && !searchResults?.articles.length) {
      return (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="search-off" size={48} color="#666" />
          <Text style={styles.emptyText}>No articles found</Text>
          <Text style={styles.emptySubText}>
            Try different keywords or check your spelling
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="search" size={48} color="#666" />
        <Text style={styles.emptyText}>Search for articles</Text>
        <Text style={styles.emptySubText}>Enter keywords to find articles</Text>
      </View>
    );
  }, [isLoading, searchQuery, searchResults]);

  return (
    <View style={styles.container}>
      <Header
        title="Search"
        leadingIcon={{
          name: "chevron-left",
          onPress: () => router.back(),
        }}
      />

      <View style={{ paddingHorizontal: 16 }}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </View>

      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.url}
        data={searchResults?.articles ?? []}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyContainer: {
    flex: 1,
    marginTop: 48,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
