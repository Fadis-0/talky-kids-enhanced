import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { Play } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import type { ImageItem } from "@/lib/letters-game-data";
import { palette } from "@/lib/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

  // Animation values
  const cardScale = useSharedValue(1);
  const overlayOpacity = useSharedValue(0);
  const playIconScale = useSharedValue(0.8);

  const playAudio = async () => {
    try {
      setIsPlaying(true);
      // Speak the label aloud using native Text-to-Speech
      Speech.speak(image.label, {
        language: "en-US",
        pitch: 1.1, // slightly higher pitch for a kid-friendly tone
        rate: 0.85,  // slightly slower speaking rate for clarity
        onDone: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });

      // Safety fallback timeout to reset state
      setTimeout(() => {
        setIsPlaying(false);
      }, 1200);
    } catch (error) {
      console.log("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    cardScale.value = withSpring(isSelected ? 1.05 : 1.0, {
      damping: 12,
      stiffness: 110,
    });
  }, [isSelected]);

  useEffect(() => {
    if (isPlaying) {
      overlayOpacity.value = withTiming(1, { duration: 150 });
      playIconScale.value = withSpring(1.0, { damping: 10, stiffness: 150 });
    } else {
      overlayOpacity.value = withTiming(0, { duration: 150 });
      playIconScale.value = withTiming(0.8, { duration: 150 });
    }
  }, [isPlaying]);

  const handlePress = () => {
    onSelect();
    playAudio();
  };

  // Fixed the endpoint format to .png, ensuring it loads correctly in React Native's Image component
  const placeholderSource = image.imageUrl
    ? { uri: image.imageUrl }
    : { uri: `https://placehold.co/150x150/DDF4FF/3C3C3C.png?text=${image.label}` };

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
      borderColor: isSelected ? palette.green : palette.border,
      borderWidth: isSelected ? 3 : 2,
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: playIconScale.value }],
    };
  });

  return (
    <AnimatedPressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${image.label}, tap to select and play pronunciation`}
      className="flex-1 overflow-hidden rounded-2xl"
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? palette.greenLight : palette.blueLight,
          opacity: pressed ? 0.95 : 1,
          aspectRatio: 0.82,
        },
        animatedCardStyle,
      ]}
    >
      <View className="flex-1 items-center justify-between p-2">
        {/* Fixed Width & Height Image Container */}
        <View
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          {/* Static default layout placeholder background while the network fetches */}
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: palette.blueLight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={18} color={palette.blue} opacity={0.3} />
          </View>

          <Image
            source={placeholderSource}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          {/* Playing overlay with animated play icon */}
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(88, 204, 2, 0.45)",
                alignItems: "center",
                justifyContent: "center",
              },
              animatedOverlayStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                },
                animatedIconStyle,
              ]}
            >
              <Play
                size={18}
                color={palette.green}
                fill={palette.green}
                style={{ marginLeft: 2 }}
              />
            </Animated.View>
          </Animated.View>
        </View>

        {/* Word Label */}
        <Text
          variant="label"
          className="text-center text-sm font-bold"
          numberOfLines={1}
          style={{ color: palette.text, marginTop: 4 }}
        >
          {image.label}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
