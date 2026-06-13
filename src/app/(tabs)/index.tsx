import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, BrandFonts } from "@/constants/Theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.accentBar} />
          <Text style={styles.logoStyle}>Style</Text>
          <Text style={styles.logoSense}>Sense</Text>
        </View>
        <Text style={styles.subtitle}>AI Stylist Chat</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>💬</Text>
        <Text style={styles.placeholderTitle}>Chat coming soon</Text>
        <Text style={styles.placeholderText}>
          Describe your occasion and get AI-powered outfit suggestions from your wardrobe.
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
  header: {
    marginBottom: 32,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  accentBar: {
    width: 3,
    height: 20,
    backgroundColor: BrandColors.ember,
    borderRadius: 1,
  },
  logoStyle: {
    fontFamily: BrandFonts.serif,
    fontSize: 24,
    color: BrandColors.ink,
  },
  logoSense: {
    fontFamily: BrandFonts.serifItalic,
    fontSize: 24,
    color: BrandColors.ember,
  },
  subtitle: {
    fontFamily: BrandFonts.sans,
    fontSize: 13,
    color: BrandColors.stone,
    marginLeft: 15,
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
