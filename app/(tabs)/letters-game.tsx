import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { GameImageCard } from "@/components/games/GameImageCard";
import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { RecordButton } from "@/components/games/RecordButton";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import {
  LETTER_LEVELS,
  getLetterLevel,
  getTotalLevels,
} from "@/lib/letters-game-data";
import { palette } from "@/lib/theme";

export default function LettersGameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);

  const totalLevels = getTotalLevels();
  const currentLevel = getLetterLevel(currentLevelIndex) || LETTER_LEVELS[0];
  const selectedImage = currentLevel.images.find(
    (img) => img.id === selectedImageId
  );

  useEffect(() => {
    // Reset selected image and recording state when level changes
    setSelectedImageId(null);
    setIsRecording(false);
    setIsRecordingCompleted(false);
  }, [currentLevelIndex]);

  const handleSelectImage = (id: string) => {
    setSelectedImageId(id);
    setIsRecordingCompleted(false);
  };

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLevelIndex < totalLevels - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  const handleFinish = () => {
    // Show completion screen or navigate back
    router.back();
  };

  const handleRecordingComplete = (duration: number) => {
    console.log(`Recording completed: ${duration} seconds`);
    setIsRecordingCompleted(true);
  };

  // Determine the mascot's state
  let mascotState: "idle" | "selected" | "recording" | "completed" = "idle";
  if (isRecording) {
    mascotState = "recording";
  } else if (isRecordingCompleted) {
    mascotState = "completed";
  } else if (selectedImage) {
    mascotState = "selected";
  }

  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [
        {
          width: 44,
          height: 44,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: palette.border,
          backgroundColor: palette.surface,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.8 : 1,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          zIndex: 10,
        },
      ]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title="Letters Game"
      subtitle="Learn to pronounce with fun!"
      accent="green"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 16,
          }}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          <View className="gap-6">
            {/* Level Header */}
            <LevelHeader
              levelNumber={currentLevelIndex + 1}
              totalLevels={totalLevels}
              letter={currentLevel.letter}
            />

            {/* Image Cards Row */}
            <View className="flex-row gap-3">
              {currentLevel.images.map((image) => (
                <GameImageCard
                  key={image.id}
                  image={image}
                  isSelected={selectedImage?.id === image.id}
                  onSelect={() => handleSelectImage(image.id)}
                />
              ))}
            </View>

            {/* Duolingo Mascot Mentor */}
            <TalkyMascot state={mascotState} label={selectedImage?.label} />

            {/* Record Button */}
            <RecordButton
              selectedImageLabel={selectedImage?.label || null}
              onRecordingComplete={handleRecordingComplete}
              onRecordingStatusChange={(recording) => setIsRecording(recording)}
            />
          </View>
        </ScrollView>

        {/* Navigation Footer - Sticky at the bottom */}
        <View style={{ paddingVertical: 10 }}>
          <GameNavigation
            currentLevel={currentLevelIndex + 1}
            totalLevels={totalLevels}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        </View>
      </View>
    </ScreenShell>
  );
}
