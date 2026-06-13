import { useEffect } from "react";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { BrandColors } from "@/constants/Theme";

/**
 * Entry point — redirects to the onboarding flow.
 * In a production app, this would check if the user has already
 * completed onboarding and is authenticated, then redirect accordingly.
 */
export default function IndexScreen() {
  useEffect(() => {
    // Small delay to avoid navigation flash
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.ink,
  },
});
