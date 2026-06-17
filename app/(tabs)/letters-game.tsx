import { audioMap } from "@/lib/audioMap";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";

import { GameImageCard } from "@/components/games/GameImageCard";
import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { RecordButton } from "@/components/games/RecordButton";
import { SubscriptionModal } from "@/components/games/SubscriptionModal";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import {
    LETTER_LEVELS,
    getLetterLevel,
    getTotalLevels,
} from "@/lib/letters-game-data";
import { palette } from "@/lib/theme";



export default function LettersGameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setUser, user } = useUserData();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const totalLevels = getTotalLevels();
  const currentLevel = getLetterLevel(currentLevelIndex) || LETTER_LEVELS[0];

  // Dynamically translate the labels of current level's images
  const translatedImages = currentLevel.images.map((image, index) => {
    const letterTranslations = t(`letters.${currentLevel.letterUpper}`, { returnObjects: true });
    let label = image.label;
    if (Array.isArray(letterTranslations) && letterTranslations[index]) {
      label = letterTranslations[index];
    }
    return { ...image, label };
  });

  const selectedImage = translatedImages.find(
    (img) => img.id === selectedImageId
  );

  useEffect(() => {
    // Reset selected image and recording state when level changes
    setSelectedImageId(null);
    setIsRecording(false);
    setIsRecordingCompleted(false);
  }, [currentLevelIndex]);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleSelectImage = async (id: string) => {
    setSelectedImageId(id);
    setIsRecordingCompleted(false);
    // Audio source is resolved via static audioMap; no need to lookup image data
    // Build the require path to the audio asset. Assume files are .mp4; replace extension if needed.
    // Use static audio map for bundler compatibility
    const source = audioMap[id];
    if (!source) {
      console.warn('Audio asset not found for id', id);
      return;
    }
    try {
      // Unload previous sound if any
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(source);
      await soundObject.playAsync();
      setSound(soundObject);
    } catch (error) {
      console.warn('Failed to play sound for image', id, error);
    }
  };

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNext = () => {
    // Show subscription modal after level 3
    if (currentLevelIndex + 1 === 3) {
      setShowSubscriptionModal(true);
      return;
    }

    if (currentLevelIndex < totalLevels - 1) {
      const nextLevel = currentLevelIndex + 1;
      setCurrentLevelIndex(nextLevel);
      // Persist highest level reached
      setUser({ lettersGameLevel: nextLevel + 1 });
    }
  };

  const handleFinish = () => {
    // Mark game as fully completed
    setUser({ lettersGameLevel: totalLevels });
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
      accessibilityLabel={t("common.back")}
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
          transform: [{ scaleX: isRTL ? -1 : 1 }], // Flip arrow for RTL
        },
      ]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title={t("games.letters.title")}
      subtitle={t("games.letters.subtitle")}
      accent="green"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, direction: isRTL ? 'rtl' : 'ltr' }}>
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
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }} className="gap-3">
              {translatedImages.map((image) => (
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

      <SubscriptionModal
        visible={showSubscriptionModal}
        onSubscribe={() => {
          setShowSubscriptionModal(false);
          // Handle subscription action
        }}
        onLater={() => {
          setShowSubscriptionModal(false);
          router.back();
        }}
      />
    </ScreenShell>
  );
}
