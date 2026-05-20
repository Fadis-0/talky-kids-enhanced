import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import {
  BarChart3,
  Bell,
  House,
  Settings,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  fonts,
  palette,
  spacing,
  tabConfig,
  type TabRoute,
} from "@/lib/theme";

const TAB_ICONS: Record<TabRoute, LucideIcon> = {
  index: House,
  stats: BarChart3,
  notifications: Bell,
  settings: Settings,
};

// Color mapping for each tab based on page accent
const TAB_COLORS: Record<TabRoute, { primary: string; light: string }> = {
  index: { primary: palette.green, light: palette.greenLight },
  stats: { primary: palette.blue, light: palette.blueLight },
  notifications: { primary: palette.purple, light: palette.purpleLight },
  settings: { primary: palette.orange, light: palette.orangeLight },
};

function getTabRoute(name: string): TabRoute | null {
  if (
    name === "index" ||
    name === "stats" ||
    name === "notifications" ||
    name === "settings"
  ) {
    return name;
  }
  return null;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TalkyTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const tabRoute = getTabRoute(route.name);
          if (!tabRoute) return null;

          const focused = state.index === index;

          return (
            <TabBarItem
              key={route.key}
              route={route}
              tabRoute={tabRoute}
              focused={focused}
              onPress={() => {
                if (!focused) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              onLongPress={() =>
                navigation.emit({ type: "tabLongPress", target: route.key })
              }
            />
          );
        })}
      </View>
    </View>
  );
}

interface TabBarItemProps {
  route: any;
  tabRoute: TabRoute;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

function TabBarItem({
  route,
  tabRoute,
  focused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const config = tabConfig[tabRoute];
  const Icon = TAB_ICONS[tabRoute];
  const colors = TAB_COLORS[tabRoute];

  const scaleAnim = useSharedValue(0);
  const bgScaleAnim = useSharedValue(0);

  useEffect(() => {
    scaleAnim.value = withSpring(focused ? 1 : 0, {
      damping: 10,
      mass: 0.8,
      overshootClamping: true,
    });
    bgScaleAnim.value = withSpring(focused ? 1 : 0, {
      damping: 8,
      mass: 1,
      overshootClamping: false,
    });
  }, [focused]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleAnim.value, [0, 1], [1, 1.1], Extrapolate.CLAMP),
      },
    ],
  }));

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      bgScaleAnim.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          bgScaleAnim.value,
          [0, 1],
          [0.8, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const iconWrapStyle = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      scaleAnim.value,
      [0, 1],
      [palette.tabInactive, colors.primary]
    ),
  }));

  const iconColorAnim = useAnimatedStyle(() => ({
    color: interpolateColor(
      scaleAnim.value,
      [0, 1],
      [palette.tabInactive, colors.primary]
    ),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={config.accessibilityLabel}
      style={styles.tab}
    >
      <Animated.View style={[styles.iconWrap, iconWrapStyle]}>
        <Animated.View style={[styles.iconBg, bgAnimatedStyle, { backgroundColor: colors.light }]} />
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle, iconColorAnim]}>
          <Icon
            size={24}
            color={focused ? colors.primary : palette.tabInactive}
            strokeWidth={focused ? 2.75 : 2.25}
          />
        </Animated.View>
      </Animated.View>
      <Animated.Text
        style={[
          styles.label,
          {
            fontFamily: focused ? fonts.displaySemi : fonts.body,
            fontSize: 11,
          },
          labelAnimatedStyle,
        ]}
      >
        {config.label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.surface,
    borderTopWidth: 1.5,
    borderTopColor: palette.border,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: spacing.tabBarHeight,
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    gap: 4,
  },
  iconWrap: {
    position: "relative",
    width: 48,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  iconBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  iconContainer: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 0,
  },
});