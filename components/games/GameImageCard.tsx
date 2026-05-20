import { Audio } from "expo-av";
import { Pause, Play } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import type { ImageItem } from "@/lib/letters-game-data";
import { palette, radius } from "@/lib/theme";

type GameImageCardProps = {
  image: ImageItem;
  isSelected: boolean;
  onSelect: () => void;
};

export function GameImageCard({
  image,
  isSelected,
  onSelect,
}: GameImageCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playAudio = async () => {
    try {
      // Mock audio playback - in a real app, you'd load actual audio files
      setIsPlaying(true);
      // Simulate audio duration
      setTimeout(() => {
        setIsPlaying(false);
      }, 1000);
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="button"
      accessibilityLabel={`${image.label}, tap to select`}
      className={`flex-1 overflow-hidden rounded-2xl`}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? palette.greenLight : palette.blueLight,
          borderWidth: isSelected ? 3 : 2,
          borderColor: isSelected ? palette.green : palette.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="flex-1 items-center justify-between p-4">
        {/* Emoji/Image */}
        <View className="flex-1 items-center justify-center">
          <Text
            style={{
              fontSize: 60,
              lineHeight: 70,
            }}
          >
            {image.emoji}
          </Text>
        </View>

        {/* Label and Audio Button */}
        <View className="w-full gap-2">
          <Text
            variant="body"
            className="text-center text-sm"
            style={{ color: palette.text }}
          >
            {image.label}
          </Text>

          <Pressable
            onPress={playAudio}
            accessibilityRole="button"
            accessibilityLabel={`Play audio for ${image.label}`}
            style={({ pressed }) => [
              {
                backgroundColor: isPlaying
                  ? palette.green
                  : palette.greenMuted,
                opacity: pressed ? 0.8 : 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: radius.sm,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              },
            ]}
          >
            {isPlaying ? (
              <Pause size={16} color="#FFFFFF" strokeWidth={2.5} />
            ) : (
              <Play size={16} color="#FFFFFF" strokeWidth={2.5} />
            )}
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {isPlaying ? "Playing" : "Listen"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
