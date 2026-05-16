import type { LucideIcon } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import { fonts, palette, type TabAccent } from "@/lib/theme";

const springConfig = { damping: 16, stiffness: 220, mass: 0.8 };

type TabBarItemProps = {
  label: string;
  accessibilityLabel: string;
  icon: LucideIcon;
  accent: TabAccent;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function TabBarItem({
  label,
  accessibilityLabel,
  icon: Icon,
  accent,
  focused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, springConfig);
  }, [focused, progress]);

  const topBarStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scaleX: interpolate(progress.value, [0, 1], [0.4, 1]) },
      { translateY: interpolate(progress.value, [0, 1], [4, 0]) },
    ],
  }));

  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", accent.light],
    ),
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.72, 1]) },
    ],
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const iconWrapStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 1.14]) },
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
    ],
  }));

  const activeIconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const inactiveIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value * 0.85,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.65, 1]),
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [1, 0]) },
    ],
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={accessibilityLabel}
      style={styles.tab}
    >
      <Animated.View
        style={[styles.topAccent, { backgroundColor: accent.color }, topBarStyle]}
      />

      <View style={styles.iconSlot}>
        <Animated.View style={[styles.pill, pillStyle]} />
        <Animated.View style={[styles.iconLayer, iconWrapStyle]}>
          <Animated.View style={[styles.iconAbsolute, inactiveIconStyle]}>
            <Icon size={24} color={palette.tabInactive} strokeWidth={2} />
          </Animated.View>
          <Animated.View style={[styles.iconAbsolute, activeIconStyle]}>
            <Icon size={24} color={accent.color} strokeWidth={2.75} />
          </Animated.View>
        </Animated.View>
      </View>

      <Animated.View style={labelStyle}>
        <Text
          variant="caption"
          style={{
            fontFamily: focused ? fonts.displaySemi : fonts.body,
            fontSize: 11,
            color: focused ? accent.color : palette.tabInactive,
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 6,
    minHeight: 56,
    gap: 4,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    width: 28,
    height: 4,
    borderRadius: 4,
  },
  iconSlot: {
    width: 56,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  iconLayer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAbsolute: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
