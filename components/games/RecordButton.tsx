import { Audio } from "expo-av";
import { Mic, Square } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { palette, radius } from "@/lib/theme";

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

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
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

  return (
    <View className="gap-3">
      <Text variant="body" className="text-center">
        Record your pronunciation for the selected image
      </Text>

      <Pressable
        onPress={handlePress}
        disabled={isDisabled && !isRecording}
        accessibilityRole="button"
        accessibilityLabel={
          isRecording
            ? "Stop recording"
            : "Start recording your pronunciation"
        }
        style={({ pressed }) => [
          {
            opacity:
              isDisabled && !isRecording ? 0.5 : pressed ? 0.8 : 1,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: isRecording ? palette.red : palette.blue,
            borderRadius: radius.md,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {isRecording ? (
            <>
              <Square size={20} color="#FFFFFF" fill="#FFFFFF" />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Stop ({recordingDuration}s)
              </Text>
            </>
          ) : (
            <>
              <Mic size={20} color="#FFFFFF" strokeWidth={2.5} />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {selectedImageLabel
                  ? `Record "${selectedImageLabel}"`
                  : "Select an image first"}
              </Text>
            </>
          )}
        </View>
      </Pressable>

      {isRecording && (
        <View className="flex-row items-center justify-center gap-2">
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: palette.red,
            }}
          />
          <Text
            variant="body"
            className="text-center text-sm"
            style={{ color: palette.red }}
          >
            Recording in progress...
          </Text>
        </View>
      )}
    </View>
  );
}
