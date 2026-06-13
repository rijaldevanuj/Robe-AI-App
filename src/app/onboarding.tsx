import { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ImageBackground,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, BrandFonts } from "@/constants/Theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── Slide Data ────────────────────────────────────────────────
interface SlideData {
  id: string;
  type: "splash" | "content";
  image: string;
  tag?: string;
  title?: string;
  description?: string;
  button?: string;
}

const SLIDES: SlideData[] = [
  {
    id: "splash",
    type: "splash",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "wardrobe",
    type: "content",
    tag: "SMART WARDROBE",
    title: "Upload your entire closet",
    description:
      "Photograph every piece you own. StyleSense organises it all so you never lose track of a great outfit.",
    button: "NEXT",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
  },
  {
    id: "styling",
    type: "content",
    tag: "AI STYLING",
    title: "Describe the occasion",
    description:
      "Heading to a dinner date or a board meeting? Our AI assembles outfit options from your own wardrobe in seconds.",
    button: "NEXT",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  },
  {
    id: "explore",
    type: "content",
    tag: "EXPLORE & SHOP",
    title: "Discover what fits you",
    description:
      "Browse curated picks from Myntra, Amazon & Flipkart personalised to your body type, style, and budget.",
    button: "GET STARTED",
    image: "https://images.unsplash.com/photo-1480429370612-2cd0c2f04cfc?w=800&q=80",
  },
];

// ─── Pagination Dots ───────────────────────────────────────────
function PaginationDots({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) {
  return (
    <View style={paginationStyles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            paginationStyles.dot,
            i === activeIndex
              ? paginationStyles.activeDot
              : paginationStyles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 24,
    backgroundColor: BrandColors.ember,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: BrandColors.stone,
    opacity: 0.5,
  },
});

// ─── Splash Slide (Slide 0) ────────────────────────────────────
function SplashSlide() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[slideStyles.slideContainer, { width: SCREEN_WIDTH }]}>
      <ImageBackground
        source={{
          uri: SLIDES[0].image,
        }}
        style={slideStyles.fullImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(28,28,30,0.3)", "rgba(28,28,30,0.7)", "rgba(28,28,30,0.9)"]}
          style={StyleSheet.absoluteFillObject}
        />

        <View
          style={[
            slideStyles.splashContent,
            { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 },
          ]}
        >
          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Brand */}
          <View style={slideStyles.splashBrandContainer}>
            {/* Orange accent bar */}
            <View style={slideStyles.accentBar} />

            <Text style={slideStyles.splashSubtitle}>AI POWERED</Text>

            <View style={slideStyles.splashLogoRow}>
              <Text style={slideStyles.splashLogoStyle}>STYLE</Text>
            </View>
            <View style={slideStyles.splashLogoRow}>
              <Text style={slideStyles.splashLogoSense}>SENSE</Text>
            </View>

            <Text style={slideStyles.splashTagline}>YOUR PERSONAL STYLIST</Text>
          </View>

          {/* Spacer */}
          <View style={{ flex: 0.6 }} />

          {/* Pagination */}
          <PaginationDots total={SLIDES.length} activeIndex={0} />
        </View>
      </ImageBackground>
    </View>
  );
}

// ─── Content Slide (Slides 1-3) ────────────────────────────────
function ContentSlide({
  slide,
  index,
  onNext,
  onSkip,
}: {
  slide: SlideData;
  index: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const insets = useSafeAreaInsets();
  const isLast = index === SLIDES.length - 1;

  return (
    <View style={[slideStyles.slideContainer, { width: SCREEN_WIDTH }]}>
      {/* Image section (top ~55%) */}
      <View style={slideStyles.imageSection}>
        <ImageBackground
          source={{ uri: slide.image }}
          style={slideStyles.contentImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(28,28,30,0.1)", "rgba(28,28,30,0.3)"]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Skip button */}
          <Pressable
            style={[slideStyles.skipButton, { top: insets.top + 16 }]}
            onPress={onSkip}
            hitSlop={20}
          >
            <Text style={slideStyles.skipText}>SKIP</Text>
          </Pressable>

          {/* Tag */}
          <View style={slideStyles.tagContainer}>
            <Text style={slideStyles.tagText}>{slide.tag}</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Content card (bottom ~45%) */}
      <View style={slideStyles.contentCard}>
        <View style={slideStyles.contentCardInner}>
          <Text style={slideStyles.slideTitle}>{slide.title}</Text>
          <Text style={slideStyles.slideDescription}>{slide.description}</Text>
        </View>

        <View
          style={[
            slideStyles.bottomRow,
            { paddingBottom: insets.bottom + 20 },
          ]}
        >
          <PaginationDots total={SLIDES.length} activeIndex={index} />

          <Pressable
            style={({ pressed }) => [
              slideStyles.nextButton,
              pressed && { opacity: 0.85 },
            ]}
            onPress={onNext}
          >
            <Text style={slideStyles.nextButtonText}>
              {slide.button}{"  →"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ─── Main Onboarding Screen ────────────────────────────────────
export default function OnboardingScreen() {
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const goToNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      // Last slide → go to auth
      router.replace("/auth");
    }
  }, [activeIndex]);

  const goToAuth = useCallback(() => {
    router.replace("/auth");
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SlideData; index: number }) => {
      if (item.type === "splash") {
        return <SplashSlide />;
      }
      return (
        <ContentSlide
          slide={item}
          index={index}
          onNext={goToNext}
          onSkip={goToAuth}
        />
      );
    },
    [goToNext, goToAuth]
  );

  return (
    <View style={slideStyles.screen}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const slideStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.ink,
  },

  slideContainer: {
    flex: 1,
    height: SCREEN_HEIGHT,
  },

  // ── Splash slide
  fullImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  splashContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  splashBrandContainer: {
    alignItems: "center",
    gap: 8,
  },
  accentBar: {
    width: 4,
    height: 32,
    backgroundColor: BrandColors.ember,
    borderRadius: 2,
    marginBottom: 8,
  },
  splashSubtitle: {
    fontFamily: BrandFonts.sans,
    fontSize: 12,
    letterSpacing: 6,
    color: BrandColors.white,
    opacity: 0.8,
  },
  splashLogoRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  splashLogoStyle: {
    fontFamily: BrandFonts.serif,
    fontSize: 48,
    color: BrandColors.white,
    letterSpacing: 8,
  },
  splashLogoSense: {
    fontFamily: BrandFonts.serifItalic,
    fontSize: 48,
    color: BrandColors.ember,
    letterSpacing: 8,
  },
  splashTagline: {
    fontFamily: BrandFonts.sans,
    fontSize: 10,
    letterSpacing: 6,
    color: BrandColors.white,
    opacity: 0.6,
    marginTop: 12,
  },

  // ── Content slides
  imageSection: {
    flex: 1.1,
  },
  contentImage: {
    flex: 1,
    width: "100%",
  },
  skipButton: {
    position: "absolute",
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 13,
    color: BrandColors.white,
    letterSpacing: 1,
    opacity: 0.9,
  },
  tagContainer: {
    position: "absolute",
    bottom: 24,
    left: 20,
    backgroundColor: BrandColors.ember,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 2,
  },
  tagText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 10,
    color: BrandColors.white,
    letterSpacing: 2,
  },

  contentCard: {
    flex: 0.9,
    backgroundColor: BrandColors.white,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: "space-between",
  },
  contentCardInner: {
    flex: 1,
    gap: 16,
  },
  slideTitle: {
    fontFamily: BrandFonts.serifRegular,
    fontSize: 30,
    color: BrandColors.ink,
    lineHeight: 38,
  },
  slideDescription: {
    fontFamily: BrandFonts.sans,
    fontSize: 15,
    color: BrandColors.stone,
    lineHeight: 24,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: BrandColors.ink,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 2,
  },
  nextButtonText: {
    fontFamily: BrandFonts.sansSemiBold,
    fontSize: 12,
    color: BrandColors.white,
    letterSpacing: 2,
  },
});
