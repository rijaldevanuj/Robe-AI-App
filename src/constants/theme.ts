/**
 * Design system tokens for the StyleSense editorial / high-fashion brand.
 *
 * Color palette: Ink · Ember · Linen · White · Stone
 * Typography: Playfair Display (serif) · Inter (sans-serif)
 */

export const BrandColors = {
  /** Near-black — primary text, dark overlays */
  ink: "#1C1C1E",
  /** Burnt orange — CTAs, accent bar, active indicators */
  ember: "#E8631A",
  /** Warm beige — neutral backgrounds, card tints */
  linen: "#E5DDD1",
  /** Pure white — card backgrounds, light text on dark */
  white: "#FFFFFF",
  /** Warm gray — secondary text, inactive indicators */
  stone: "#7D7D75",
} as const;

export const BrandFonts = {
  /** Editorial serif for headings, logo, and display text */
  serif: "PlayfairDisplay_700Bold",
  /** Italic serif for logo accent ("Sense") */
  serifItalic: "PlayfairDisplay_700Bold_Italic",
  /** Regular serif for body headings */
  serifRegular: "PlayfairDisplay_400Regular",
  /** Italic regular for taglines */
  serifRegularItalic: "PlayfairDisplay_400Regular_Italic",
  /** Clean sans-serif for body text, buttons, labels */
  sans: "Inter_400Regular",
  /** Medium weight sans for form labels */
  sansMedium: "Inter_500Medium",
  /** Semi-bold sans for buttons and emphasis */
  sansSemiBold: "Inter_600SemiBold",
  /** Bold sans for strong emphasis */
  sansBold: "Inter_700Bold",
} as const;

export type BrandColorKey = keyof typeof BrandColors;
export type BrandFontKey = keyof typeof BrandFonts;
