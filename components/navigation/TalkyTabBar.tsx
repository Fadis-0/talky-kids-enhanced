import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import {
  BarChart3,
  Bell,
  House,
  Settings,
  type LucideIcon,
} from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarItem } from "@/components/navigation/TabBarItem";
import { palette, spacing, tabAccents, tabConfig, type TabRoute } from "@/lib/theme";

const TAB_ICONS: Record<TabRoute, LucideIcon> = {
  index: House,
  stats: BarChart3,
  notifications: Bell,
  settings: Settings,
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

export function TalkyTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const tabRoute = getTabRoute(route.name);
          if (!tabRoute) return null;

          const focused = state.index === index;
          const config = tabConfig[tabRoute];
          const accent = tabAccents[tabRoute];
          const Icon = TAB_ICONS[tabRoute];

          const onPress = () => {
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
          };

          return (
            <TabBarItem
              key={route.key}
              label={config.label}
              accessibilityLabel={config.accessibilityLabel}
              icon={Icon}
              accent={accent}
              focused={focused}
              onPress={onPress}
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

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.surface,
    borderTopWidth: 2,
    borderTopColor: palette.border,
  },
  bar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: spacing.tabBarHeight,
    paddingHorizontal: 4,
  },
});
