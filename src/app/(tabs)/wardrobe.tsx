import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, BrandFonts } from "@/constants/Theme";

export default function WardrobeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>Wardrobe</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>👔</Text>
        <Text style={styles.placeholderTitle}>Your closet, digitised</Text>
        <Text style={styles.placeholderText}>
          Upload photos of your clothes and we'll organise them for you.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: BrandFonts.serif,
    fontSize: 24,
    color: BrandColors.ink,
    marginBottom: 32,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    gap: 12,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderTitle: {
    fontFamily: BrandFonts.serifRegular,
    fontSize: 22,
    color: BrandColors.ink,
  },
  placeholderText: {
    fontFamily: BrandFonts.sans,
    fontSize: 14,
    color: BrandColors.stone,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 32,
  },
});
