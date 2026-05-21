import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

type LevelHeaderProps = {
  levelNumber: number;
  totalLevels: number;
  letter: string;
};

export function LevelHeader({
  levelNumber,
  totalLevels,
  letter,
}: LevelHeaderProps) {
  const progress = (levelNumber / totalLevels) * 100;

  // Reanimated shared values
  const progressWidth = useSharedValue(progress);
  const letterScale = useSharedValue(0.6);

  useEffect(() => {
    // Smooth progress bar update
    progressWidth.value = withSpring(progress, { damping: 15, stiffness: 90 });
    
    // Bouncy letter entrance when it changes
    letterScale.value = 0.6;
    letterScale.value = withSpring(1.0, { damping: 10, stiffness: 120 });
  }, [levelNumber, letter, progress]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const animatedLetterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: letterScale.value }],
    };
  });

  return (
    <View className="gap-3">
      {/* Level Counter and Progress */}
      <View className="flex-row items-center justify-between">
        <Text
          variant="label"
          className="text-xs"
          style={{ color: palette.textSecondary }}
        >
          Level {levelNumber} of {totalLevels}
        </Text>
        <Text
          variant="label"
          className="text-xs"
          style={{ color: palette.textSecondary }}
        >
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 8,
          backgroundColor: palette.border,
          borderRadius: 4,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: palette.green,
              borderRadius: 4,
            },
            animatedProgressStyle,
          ]}
        />
      </View>

      {/* Letter Display */}
      <View className="items-center justify-center gap-1 py-1">
        <Animated.View style={animatedLetterStyle}>
          <Text
            style={{
              fontSize: 58,
              lineHeight: 68,
              fontFamily: "Fredoka_700Bold",
              color: palette.green,
              paddingVertical: 4,
              textAlign: "center",
            }}
          >
            {letter.toUpperCase()}
          </Text>
        </Animated.View>
        <Text
          variant="title"
          className="text-sm text-center"
          style={{ color: palette.text }}
        >
          Pick an image and learn to say it!
        </Text>
      </View>
    </View>
  );
}
