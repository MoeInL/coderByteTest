import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useAppSafeAreaInsets = () => {
  const insets = useSafeAreaInsets();
  return {
    left: insets.left,
    right: insets.right,
    bottom: insets.bottom || 20,
    top: Platform.OS === "ios" ? insets.top : insets.top + 20,
  };
};
