import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import {
  BarChart3,
  Bell,
  House,
  Settings,
  type LucideIcon,
} from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
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
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const tabRoute = getTabRoute(route.name);
          if (!tabRoute) return null;

          const focused = state.index === index;
          const config = tabConfig[tabRoute];
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
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={() =>
                navigation.emit({ type: "tabLongPress", target: route.key })
              }
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={config.accessibilityLabel}
              style={styles.tab}
            >
              <View
                style={[styles.iconWrap, focused && styles.iconWrapActive]}
              >
                <Icon
                  size={24}
                  color={focused ? palette.green : palette.tabInactive}
                  strokeWidth={focused ? 2.75 : 2}
                />
              </View>
              <Text
                variant="caption"
                style={[
                  styles.label,
                  {
                    fontFamily: focused ? fonts.displaySemi : fonts.body,
                    color: focused ? palette.green : palette.tabInactive,
                  },
                ]}
              >
                {config.label}
              </Text>
            </Pressable>
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
    alignItems: "center",
    justifyContent: "space-around",
    height: spacing.tabBarHeight,
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    gap: 2,
  },
  iconWrap: {
    width: 44,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  iconWrapActive: {
    backgroundColor: palette.greenLight,
  },
  label: {
    fontSize: 11,
    marginTop: 0,
  },
});