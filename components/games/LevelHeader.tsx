import { View } from "react-native";

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

  return (
    <View className="gap-4">
      {/* Level Counter and Progress */}
      <View className="flex-row items-center justify-between">
        <Text
          variant="label"
          className="text-sm"
          style={{ color: palette.textSecondary }}
        >
          Level {levelNumber} of {totalLevels}
        </Text>
        <Text
          variant="label"
          className="text-sm"
          style={{ color: palette.textSecondary }}
        >
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 6,
          backgroundColor: palette.border,
          borderRadius: 3,
          overflow: "hidden",
          flex: 1,
        }}
      >
        <View
          style={{
            height: "100%",
            width: progress ? `${progress}%` : 0,
            backgroundColor: palette.green,
          }}
        />
      </View>

      {/* Letter Display */}
      <View className="items-center justify-center gap-2">
        <Text
          style={{
            fontSize: 48,
            fontFamily: "Fredoka_700Bold",
            color: palette.green,
          }}
        >
          {letter.toUpperCase()}
        </Text>
        <Text
          variant="title"
          className="text-lg"
          style={{ color: palette.text }}
        >
          Pick an image and learn to say it!
        </Text>
      </View>
    </View>
  );
}
