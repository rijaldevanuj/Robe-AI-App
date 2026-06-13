import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, BrandFonts } from "@/constants/Theme";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // TODO: integrate with Supabase auth
    router.replace("/(tabs)");
  };

  const handleGoogleAuth = () => {
    // TODO: integrate Google OAuth
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Hero Image Section ─────────────────────────── */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[
                "rgba(0,80,100,0.4)",
                "rgba(0,60,80,0.6)",
                "rgba(28,28,30,0.85)",
              ]}
              style={StyleSheet.absoluteFillObject}
            />

            <View
              style={[
                styles.heroContent,
                { paddingTop: insets.top + 20 },
              ]}
            >
              <View style={{ flex: 1 }} />

              {/* Brand */}
              <Text style={styles.heroLabelSmall}>STYLESENSE</Text>
              <View style={styles.heroTaglineRow}>
                <Text style={styles.heroTagline}>Find your perfect</Text>
              </View>
              <View style={styles.heroTaglineRow}>
                <Text style={styles.heroTaglineItalic}>
                  outfit, every time.
                </Text>
              </View>

              <View style={{ height: 24 }} />
            </View>
          </ImageBackground>
        </View>

        {/* ── Form Section ───────────────────────────────── */}
        <View style={styles.formSection}>
          {/* Tab Toggle */}
          <View style={styles.tabToggle}>
            <Pressable
              style={[
                styles.tabButton,
                mode === "signup" && styles.tabButtonActive,
              ]}
              onPress={() => setMode("signup")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  mode === "signup" && styles.tabButtonTextActive,
                ]}
              >
                SIGN UP
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                mode === "login" && styles.tabButtonActive,
              ]}
              onPress={() => setMode("login")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  mode === "login" && styles.tabButtonTextActive,
                ]}
              >
                LOG IN
              </Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View style={styles.formFields}>
            {mode === "signup" && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={BrandColors.stone}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={BrandColors.stone}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor={BrandColors.stone}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={12}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? "◉" : "◎"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* CTA Button */}
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && { opacity: 0.9 },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.ctaButtonText}>
              {mode === "signup" ? "CREATE ACCOUNT" : "LOG IN"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Auth */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleGoogleAuth}
          >
            <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
          </Pressable>

          {/* Bottom spacing */}
          <View style={{ height: insets.bottom + 16 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Hero
  heroSection: {
    height: 320,
  },
  heroImage: {
    flex: 1,
    width: "100%",
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  heroLabelSmall: {
    fontFamily: BrandFonts.sans,
    fontSize: 11,
    letterSpacing: 4,
    color: BrandColors.white,
    opacity: 0.7,
    marginBottom: 8,
  },
  heroTaglineRow: {
    flexDirection: "row",
  },
  heroTagline: {
    fontFamily: BrandFonts.serifRegular,
    fontSize: 28,
    color: BrandColors.white,
    lineHeight: 36,
  },
  heroTaglineItalic: {
    fontFamily: BrandFonts.serifRegularItalic,
    fontSize: 28,
    color: BrandColors.white,
    lineHeight: 36,
  },

  // ── Form
  formSection: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
  },

  // Tab toggle
  tabToggle: {
    flexDirection: "row",
    borderRadius: 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: BrandColors.ink,
    marginBottom: 28,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: BrandColors.ink,
  },
  tabButtonText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: BrandColors.ink,
  },
  tabButtonTextActive: {
    color: BrandColors.white,
  },

  // Form fields
  formFields: {
    gap: 14,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BrandColors.linen,
    borderRadius: 4,
    paddingHorizontal: 18,
    height: 54,
  },
  input: {
    fontFamily: BrandFonts.sans,
    fontSize: 15,
    color: BrandColors.ink,
    flex: 1,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
    color: BrandColors.stone,
  },

  // CTA
  ctaButton: {
    backgroundColor: BrandColors.ember,
    paddingVertical: 18,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  ctaButtonText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 13,
    color: BrandColors.white,
    letterSpacing: 3,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BrandColors.linen,
  },
  dividerText: {
    fontFamily: BrandFonts.sans,
    fontSize: 14,
    color: BrandColors.stone,
  },

  // Google
  googleButton: {
    borderWidth: 1.5,
    borderColor: BrandColors.ink,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  googleButtonText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 12,
    color: BrandColors.ink,
    letterSpacing: 2,
  },
});
