import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { RecordButton } from "@/components/games/RecordButton";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { palette } from "@/lib/theme";
import {
    VIDEO_QUESTION_LEVELS,
    getTotalVideoLevels,
    getVideoQuestionLevel,
} from "@/lib/video-questions-data";

export default function VideoQuestionsScreen() {
  const router = useRouter();
  const { setUser } = useUserData();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);

  const totalLevels = getTotalVideoLevels();
  const currentLevel = getVideoQuestionLevel(currentLevelIndex) || VIDEO_QUESTION_LEVELS[0];
  
  // Get translated question
  const translatedQuestion = t(`videoQuestions.question${currentLevelIndex + 1}`);

  useEffect(() => {
    // Reset recording state when level changes
    setIsRecording(false);
    setIsRecordingCompleted(false);
  }, [currentLevelIndex]);

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLevelIndex < totalLevels - 1) {
      const nextLevel = currentLevelIndex + 1;
      setCurrentLevelIndex(nextLevel);
      // Persist highest level reached
      setUser({ videoQuestionsGameLevel: nextLevel + 1 });
    }
  };

  const handleFinish = () => {
    // Mark game as fully completed
    setUser({ videoQuestionsGameLevel: totalLevels });
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
  } else {
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
      title={t("games.video.title")}
      subtitle={t("games.video.subtitle")}
      accent="blue"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, justifyContent: "space-between", direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* Top Content */}
        <View className="gap-2">
          {/* Level Header */}
          <LevelHeader
            levelNumber={currentLevelIndex + 1}
            totalLevels={totalLevels}
            letter=""
          />

          {/* Video/GIF Box - Centered Rectangle */}
          <View
            className="mt-4 items-center justify-center overflow-hidden rounded-2xl border-2 border-tk-border bg-white self-center"
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            {currentLevel.videoQuestion.videoUrl ? (
              <Image
                source={{ uri: currentLevel.videoQuestion.videoUrl }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <Text
                variant="hero"
                style={{
                  fontSize: 56,
                  lineHeight: 56,
                }}
              >
                {currentLevel.videoQuestion.videoEmoji || "🎬"}
              </Text>
            )}
          </View>

          {/* Question Text */}
          <View className="items-center pb-2 mb-18 ">
            <Text
              variant="title"
              className="text-base text-center text-xl"
              style={{
                color: palette.text,
              }}
            >
              {translatedQuestion}
            </Text>
          </View>

          {/* Duolingo Mascot Mentor - Smaller with better spacing */}
          <View style={{ height: 70, justifyContent: "center", alignItems: "center", marginTop: 8 }}>
            <TalkyMascot 
              state={mascotState} 
              label={translatedQuestion}
            />
          </View>
        </View>

        {/* Bottom Content - Record Button and Navigation */}
        <View className="gap-4" style={{ marginTop: 45 }}>
          {/* Record Button */}
          <RecordButton
            selectedImageLabel={translatedQuestion}
            onRecordingComplete={handleRecordingComplete}
            onRecordingStatusChange={(recording) => setIsRecording(recording)}
          />

          {/* Navigation Footer */}
          <View style={{ paddingVertical: 6 }}>
            <GameNavigation
              currentLevel={currentLevelIndex + 1}
              totalLevels={totalLevels}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onFinish={handleFinish}
            />
          </View>
        </View>
      </View>
    </ScreenShell>
  );
}
