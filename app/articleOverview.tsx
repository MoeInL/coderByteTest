import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  View,
  Text,
  Share,
} from "react-native";

import { useAppSafeAreaInsets } from "@/src/hooks";
import { Header } from "@/src/components";

export default function ArticleOverview() {
  /**** Constants ****/
  const router = useRouter();
  const { bottom } = useAppSafeAreaInsets();
  const { article } = useLocalSearchParams<{ article: string }>();
  const { image, title, description, content, source, publishedAt, url } =
    JSON.parse(article);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}\n\nRead more: ${url}`,
      });
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };
  const handleOpenInBrowser = () => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
    >
      <Image contentFit="cover" style={styles.image} source={{ uri: image }} />

      <View style={styles.headerContainer}>
        <Header
          leadingIcon={{
            name: "chevron-left",
            onPress: () => router.back(),
          }}
          trailingIcon={{
            name: "share",
            onPress: handleShare,
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.metaContainer}>
          <TouchableOpacity
            onPress={handleOpenInBrowser}
            style={styles.sourceContainer}
          >
            <MaterialIcons name="link" size={16} color="#666" />
            <Text style={styles.sourceText}>{source.name}</Text>
          </TouchableOpacity>

          <Text style={styles.dateText}>
            {new Date(publishedAt).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        {content && <Text style={styles.content}>{content.split("[")[0]}</Text>}

        <TouchableOpacity
          onPress={handleOpenInBrowser}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMoreText}>Read Full Article</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: "100%",
  },
  headerContainer: {
    left: 0,
    right: 0,
    zIndex: 1,
    position: "absolute",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sourceText: {
    fontSize: 14,
    color: "#666",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 24,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  readMoreText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});
