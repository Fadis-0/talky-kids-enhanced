import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { palette } from "@/lib/theme";

type StepIndicatorProps = {
  total: number;
  current: number;
  accent?: string;
};

export function StepIndicator({
  total,
  current,
  accent = palette.green,
}: StepIndicatorProps) {
  return (
    <View className="flex-row gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <StepDot key={i} active={i === current} done={i < current} accent={accent} />
      ))}
    </View>
  );
}

function StepDot({
  active,
  done,
  accent,
}: {
  active: boolean;
  done: boolean;
  accent: string;
}) {
  const style = useAnimatedStyle(() => ({
    width: withSpring(active ? 28 : 8, { damping: 18, stiffness: 220 }),
    backgroundColor: done || active ? accent : palette.border,
    opacity: withSpring(active || done ? 1 : 0.5),
  }));

  return (
    <Animated.View
      style={[{ height: 8, borderRadius: 4 }, style]}
    />
  );
}