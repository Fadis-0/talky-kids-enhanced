import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const progress = (levelNumber / totalLevels) * 100;

  // Reanimated shared values
  const progressWidth = useSharedValue(progress);
  const letterScale = useSharedValue(0.6);
  const bodyBounce = useSharedValue(0);

  useEffect(() => {
    // Smooth progress bar update
    progressWidth.value = withSpring(progress, { damping: 15, stiffness: 90 });

    // Bouncy letter entrance when it changes
    letterScale.value = 0.6;
    letterScale.value = withSpring(1.0, { damping: 10, stiffness: 120 });

    // Subtle idle bounce animation
    bodyBounce.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 800 }),
        withTiming(4, { duration: 800 })
      ),
      -1, // infinite
      true
    );
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

  const animatedBodyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bodyBounce.value }],
    };
  });

  return (
    <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="gap-3">
      {/* Level Counter and Progress */}
      <View className="flex-row items-center justify-between">
        <Text
          variant="label"
          className="text-xs"
          style={{ color: palette.textSecondary }}
        >
          {t("games.letters.levelFormat", { level: levelNumber, total: totalLevels })}
        </Text>
        <Text
          variant="label"
          className="text-xs"
          style={{ color: palette.textSecondary }}
        >
          {t("games.progress", { progress: Math.round(progress) })}
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

      {/* Letter Character */}
      {!!letter && (
        <View className="items-center justify-center gap-1 py-4">
          <Animated.View style={[animatedLetterStyle, animatedBodyStyle]}>
            <Text
              style={{
                fontSize: 50,
                lineHeight: 75,
                fontFamily: "Cairo_700Bold",
                color: palette.green,
                textAlign: "center",
              }}
            >
              {letter}
            </Text>
          </Animated.View>
          <Text
            variant="title"
            className="text-sm text-center"
            style={{ color: palette.text, marginTop: 12 }}
          >
            {t("games.letters.instruction")}
          </Text>
        </View>
      )}
    </View>
  );
}
