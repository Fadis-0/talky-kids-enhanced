import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
import { palette, spacing } from "@/lib/theme";

type Accent = "green" | "blue" | "orange" | "purple";

const accentGradients: Record<Accent, readonly [string, string]> = {
  green: [palette.greenLight, "#FFFFFF"],
  blue: [palette.blueLight, "#FFFFFF"],
  orange: [palette.orangeLight, "#FFFFFF"],
  purple: [palette.purpleLight, "#FFFFFF"],
};

type ScreenShellProps = {
  title: string;
  subtitle?: string;
  accent?: Accent;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  topNavBar?: ReactNode;
  children?: ReactNode;
  hideTabBarClearance?: boolean;
};

export function ScreenShell({
  title,
  subtitle,
  accent = "green",
  headerLeft,
  headerRight,
  topNavBar,
  children,
  hideTabBarClearance = false,
}: ScreenShellProps) {
  const insets = useSafeAreaInsets();
  const tabClearance = hideTabBarClearance
    ? Math.max(insets.bottom, 16)
    : spacing.tabBarHeight + Math.max(insets.bottom, 8) + 16;

  return (
    <View className="flex-1 bg-tk-bg">
      <LinearGradient
        colors={[...accentGradients[accent]]}
        style={{ paddingTop: insets.top }}
        className="px-5 pb-6 pt-2"
      >
        {topNavBar ? <View className="mb-2">{topNavBar}</View> : null}
        <SafeAreaView edges={[]} className="flex-row items-start justify-between">
          <View className="mr-4 flex-1 flex-row items-start gap-3">
            {headerLeft ? <View className="pt-1">{headerLeft}</View> : null}
            <View className="flex-1">
              <Text variant="hero">{title}</Text>
              {subtitle ? (
                <Text variant="subtitle" className="mt-2">
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
          {headerRight ? <View className="pt-1">{headerRight}</View> : null}
        </SafeAreaView>
      </LinearGradient>

      <View className="flex-1 px-5" style={{ paddingBottom: tabClearance }}>
        {children}
      </View>
    </View>
  );
}