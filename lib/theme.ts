/** Talky Kids design tokens — Duolingo-inspired, production-ready */
export const palette = {
  green: "#58CC02",
  greenDark: "#46A302",
  greenLight: "#D7FFB8",
  greenMuted: "#89E219",
  blue: "#1CB0F6",
  blueDark: "#1899D6",
  blueLight: "#DDF4FF",
  orange: "#FF9600",
  orangeLight: "#FFF4E5",
  purple: "#CE82FF",
  purpleLight: "#F3E8FF",
  red: "#FF4B4B",
  background: "#F7F7F7",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  border: "#E5E5E5",
  borderStrong: "#D1D1D1",
  text: "#3C3C3C",
  textSecondary: "#777777",
  textMuted: "#AFAFAF",
  textOnPrimary: "#FFFFFF",
  shadow: "#46A302",
  tabInactive: "#AFAFAF",
  tabActive: "#58CC02",
} as const;

export const fonts = {
  displayBold: "Fredoka_700Bold",
  displaySemi: "Fredoka_600SemiBold",
  displayMedium: "Fredoka_500Medium",
  body: "Nunito_600SemiBold",
  bodyRegular: "Nunito_400Regular",
  bodyBold: "Nunito_800ExtraBold",
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 999,
} as const;

export const spacing = {
  tabBarHeight: 68,
  screenPadding: 20,
} as const;

export type TabRoute = "index" | "stats" | "notifications" | "settings";

export type TabAccent = {
  color: string;
  light: string;
  dark: string;
};

export const tabAccents: Record<TabRoute, TabAccent> = {
  index: {
    color: palette.green,
    light: palette.greenLight,
    dark: palette.greenDark,
  },
  stats: {
    color: palette.blue,
    light: palette.blueLight,
    dark: palette.blueDark,
  },
  notifications: {
    color: palette.purple,
    light: palette.purpleLight,
    dark: "#B565F0",
  },
  settings: {
    color: palette.orange,
    light: palette.orangeLight,
    dark: "#E68600",
  },
};

export const tabConfig: Record<
  TabRoute,
  { label: string; accessibilityLabel: string }
> = {
  index: { label: "Home", accessibilityLabel: "Home" },
  stats: { label: "Stats", accessibilityLabel: "Progress and stats" },
  notifications: {
    label: "Inbox",
    accessibilityLabel: "Notifications",
  },
  settings: { label: "Profile", accessibilityLabel: "Settings" },
};