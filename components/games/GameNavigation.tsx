import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

type GameNavigationProps = {
  currentLevel: number;
  totalLevels: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export function GameNavigation({
  currentLevel,
  totalLevels,
  onPrevious,
  onNext,
  onFinish,
}: GameNavigationProps) {
  const isFirstLevel = currentLevel === 1;
  const isLastLevel = currentLevel === totalLevels;

  return (
    <View className="flex-row gap-3">
      {/* Previous Button */}
      <Pressable
        onPress={onPrevious}
        disabled={isFirstLevel}
        accessibilityRole="button"
        accessibilityLabel="Previous level"
        style={({ pressed }) => [
          {
            flex: 1,
            opacity: isFirstLevel ? 0.4 : pressed ? 0.8 : 1,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: isFirstLevel ? palette.border : palette.blue,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ChevronLeft
            size={20}
            color={isFirstLevel ? palette.textMuted : "#FFFFFF"}
            strokeWidth={2.5}
          />
          <Text
            style={{
              color: isFirstLevel ? palette.textMuted : "#FFFFFF",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Previous
          </Text>
        </View>
      </Pressable>

      {/* Next/Finish Button */}
      <Pressable
        onPress={isLastLevel ? onFinish : onNext}
        accessibilityRole="button"
        accessibilityLabel={isLastLevel ? "Finish game" : "Next level"}
        style={({ pressed }) => [
          {
            flex: 1,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: palette.green,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {isLastLevel ? (
            <>
              <CheckCircle size={20} color="#FFFFFF" strokeWidth={2.5} />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Finish
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Next
              </Text>
              <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.5} />
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
}
