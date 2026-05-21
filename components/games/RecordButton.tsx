import { Audio } from "expo-av";
import { Mic } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

type RecordButtonProps = {
  selectedImageLabel: string | null;
  onRecordingComplete?: (duration: number) => void;
};

export function RecordButton({
  selectedImageLabel,
  onRecordingComplete,
}: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  // Animation values
  const scale = useSharedValue(1);
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Pulse & ripple animation effects
  useEffect(() => {
    if (isRecording) {
      // Pulse button scale
      scale.value = withRepeat(
        withSequence(
          withTiming(1.12, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      // Ripple ring scale & opacity
      ringScale.value = 1;
      ringOpacity.value = 0.6;
      ringScale.value = withRepeat(
        withTiming(1.5, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      ringOpacity.value = withRepeat(
        withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    } else {
      scale.value = withSpring(1);
      ringScale.value = 1;
      ringOpacity.value = 0;
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        console.log("Recording permission denied");
        return;
      }

      // Setup audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording saved to:", uri);

        setRecording(null);
        setIsRecording(false);
        onRecordingComplete?.(recordingDuration);
      }
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const isDisabled = !selectedImageLabel && !isRecording;

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: isRecording ? palette.red : palette.blue,
    };
  });

  const animatedRingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ringScale.value }],
      opacity: ringOpacity.value,
    };
  });

  return (
    <View className="items-center justify-center gap-3 py-2">
      <Text
        variant="body"
        className="text-center text-sm font-semibold"
        style={{ color: palette.textSecondary }}
      >
        {isRecording
          ? `Say "${selectedImageLabel}" now!`
          : selectedImageLabel
          ? `Press and say "${selectedImageLabel}"`
          : "Tap an image above to start"}
      </Text>

      <View className="relative items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Animated Ripple Ring behind the button */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 76,
              height: 76,
              borderRadius: 38,
              backgroundColor: palette.red,
            },
            animatedRingStyle,
          ]}
        />

        {/* The main circular Record Button */}
        <Pressable
          onPress={handlePress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityLabel={
            isRecording
              ? "Stop recording"
              : `Record pronunciation for ${selectedImageLabel || "selected item"}`
          }
          style={({ pressed }) => [
            {
              opacity: isDisabled ? 0.5 : pressed ? 0.9 : 1,
            },
          ]}
        >
          <Animated.View
            style={[
              {
                width: 76,
                height: 76,
                borderRadius: 38,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isRecording ? palette.red : palette.blue,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 4,
              },
              animatedButtonStyle,
            ]}
          >
            <Mic size={30} color="#FFFFFF" strokeWidth={2.5} />
          </Animated.View>
        </Pressable>
      </View>

      {/* Recording progress timer */}
      {isRecording && (
        <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: palette.red,
            }}
          />
          <Text
            variant="label"
            className="text-sm font-bold"
            style={{ color: palette.red }}
          >
            Recording ({recordingDuration}s)
          </Text>
        </View>
      )}
    </View>
  );
}
