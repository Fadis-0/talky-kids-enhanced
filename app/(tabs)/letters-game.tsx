import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { GameImageCard } from "@/components/games/GameImageCard";
import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { RecordButton } from "@/components/games/RecordButton";
import { ScreenShell } from "@/components/ScreenShell";
import {
    LETTER_LEVELS,
    getLetterLevel,
    getTotalLevels,
} from "@/lib/letters-game-data";

export default function LettersGameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const totalLevels = getTotalLevels();
  const currentLevel = getLetterLevel(currentLevelIndex) || LETTER_LEVELS[0];
  const selectedImage = currentLevel.images.find(
    (img) => img.id === selectedImageId
  );

  useEffect(() => {
    // Reset selected image when level changes
    setSelectedImageId(null);
  }, [currentLevelIndex]);

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
    // Here you could save the recording or show feedback
  };

  return (
    <ScreenShell
      title="Letters Game"
      subtitle="Learn to pronounce with fun!"
      accent="green"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
        scrollEventThrottle={16}
      >
        <View className="gap-6">
          {/* Level Header */}
          <LevelHeader
            levelNumber={currentLevelIndex + 1}
            totalLevels={totalLevels}
            letter={currentLevel.letter}
          />

          {/* Image Cards Grid */}
          <View className="gap-4">
            <View className="flex-row gap-3">
              {currentLevel.images.slice(0, 2).map((image) => (
                <GameImageCard
                  key={image.id}
                  image={image}
                  isSelected={selectedImage?.id === image.id}
                  onSelect={() => setSelectedImageId(image.id)}
                />
              ))}
            </View>
            <View>
              <GameImageCard
                image={currentLevel.images[2]}
                isSelected={selectedImage?.id === currentLevel.images[2].id}
                onSelect={() =>
                  setSelectedImageId(currentLevel.images[2].id)
                }
              />
            </View>
          </View>

          {/* Record Button */}
          <RecordButton
            selectedImageLabel={selectedImage?.label || null}
            onRecordingComplete={handleRecordingComplete}
          />
        </View>

        {/* Navigation Footer */}
        <GameNavigation
          currentLevel={currentLevelIndex + 1}
          totalLevels={totalLevels}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFinish={handleFinish}
        />
      </ScrollView>
    </ScreenShell>
  );
}
