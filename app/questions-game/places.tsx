import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { RecordButton } from "@/components/games/RecordButton";
import { SubscriptionModal } from "@/components/games/SubscriptionModal";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { PLACES_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

function PlacesVisual({ type, position }: { type: string; position: string }) {
  return (
    <View
      className="items-center justify-center p-6 bg-white border-2 border-tk-border rounded-2xl self-center w-full shadow-sm"
      style={{ height: 210 }}
    >
      {type === "box-ball" && (
        <View className="relative w-40 h-40 items-center justify-center">
          {/* Box */}
          <View
            className="w-24 h-24 border-4 border-dashed rounded-xl items-center justify-center"
            style={{
              borderColor: palette.purple,
              backgroundColor: palette.purpleLight,
            }}
          />
          {/* Ball */}
          <View
            className="absolute w-8 h-8 rounded-full shadow"
            style={{
              backgroundColor: palette.red,
              transform: [
                {
                  translateY:
                    position === "inside"
                      ? 0
                      : position === "above"
                        ? -60
                        : position === "under"
                          ? 60
                          : 0,
                },
                {
                  translateX:
                    position === "outside"
                      ? 60
                      : position === "left"
                        ? -60
                        : position === "right"
                          ? 60
                          : 0,
                },
              ],
            }}
          />
        </View>
      )}

      {type === "table-cat" && (
        <View className="relative w-40 h-40 items-center justify-center">
          {/* Table container */}
          <View className="items-center justify-center mt-6">
            {/* Table top */}
            <View
              className="w-32 h-4 rounded"
              style={{ backgroundColor: "#8B4513" }}
            />
            {/* Table legs */}
            <View className="flex-row justify-between w-24 px-3">
              <View className="w-2 h-14" style={{ backgroundColor: "#8B4513" }} />
              <View className="w-2 h-14" style={{ backgroundColor: "#8B4513" }} />
            </View>
          </View>
          {/* Cat emoji */}
          <Text
            className="absolute text-4xl"
            style={{
              transform: [
                {
                  translateY: position === "above" ? -35 : 20,
                },
              ],
            }}
          >
            🐱
          </Text>
        </View>
      )}

      {type === "tree-bird" && (
        <View className="relative w-40 h-40 items-center justify-center">
          {/* Tree */}
          <Text className="text-7xl">🌳</Text>
          {/* Bird */}
          <Text
            className="absolute text-4xl"
            style={{
              transform: [
                {
                  translateY: position === "above" ? -45 : 30,
                },
                {
                  translateX: position === "above" ? 0 : -35,
                },
              ],
            }}
          >
            🐦
          </Text>
        </View>
      )}
    </View>
  );
}

export default function PlacesGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = user.questionsPlacesLevel || 0;
    return saved < PLACES_LEVELS.length ? saved : 0;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const totalLevels = PLACES_LEVELS.length;
  const currentLevel = PLACES_LEVELS[currentLevelIndex] || PLACES_LEVELS[0];

  // Reset states when level changes
  useEffect(() => {
    setSelectedOption(null);
    setIsRecording(false);
    setIsRecordingCompleted(false);
    setHasError(false);
  }, [currentLevelIndex]);

  const handleSelectOption = (option: { label: string; pronunciation: string }) => {
    if (isRecording) return;
    setSelectedOption(option.label);
    setIsRecordingCompleted(false);
    setHasError(false);
  };

  const handleRecordingComplete = (duration: number) => {
    console.log(`Places recording complete: ${duration}s`);
    setIsRecordingCompleted(true);

    if (selectedOption === currentLevel.correctAnswer) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNext = () => {
    // Show subscription modal after level 2
    if (currentLevelIndex + 1 === 2) {
      setShowSubscriptionModal(true);
      return;
    }

    if (currentLevelIndex < totalLevels - 1) {
      const nextLevel = currentLevelIndex + 1;
      setCurrentLevelIndex(nextLevel);
      // Save progress if higher
      if (nextLevel > user.questionsPlacesLevel) {
        setUser({ questionsPlacesLevel: nextLevel });
      }
    }
  };

  const handleFinish = () => {
    if (totalLevels > user.questionsPlacesLevel) {
      setUser({ questionsPlacesLevel: totalLevels });
    }
    router.back();
  };

  // Determine mascot state
  let mascotState: "idle" | "selected" | "recording" | "completed" = "idle";
  let mascotLabel = currentLevel.question;

  if (isRecording) {
    mascotState = "recording";
    mascotLabel = "جاري الاستماع إليك... تكلّم بوضوح!";
  } else if (isRecordingCompleted) {
    if (selectedOption === currentLevel.correctAnswer) {
      mascotState = "completed";
      mascotLabel = "أحسنت! إجابة صحيحة ونطق رائع! 🎉";
    } else {
      mascotState = "selected";
      mascotLabel = "حاول مرة أخرى! اختر الكلمة الصحيحة وسجل صوتك.";
    }
  } else if (selectedOption) {
    mascotState = "selected";
    mascotLabel = `لقد اخترت "${selectedOption}". الآن اضغط على زر التسجيل وانطق الكلمة!`;
  }

  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="العودة"
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
          transform: [{ scaleX: isRTL ? -1 : 1 }],
        },
      ]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title="الجهات والمواضع"
      subtitle="استمع، اختر الإجابة ثم انطقها!"
      accent="purple"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, justifyContent: "space-between", minHeight: 560, direction: isRTL ? "rtl" : "ltr" }}>
        {/* Top & Middle Content Group */}
        <View className="gap-4">
          {/* Header progress info */}
          <LevelHeader
            levelNumber={currentLevelIndex + 1}
            totalLevels={totalLevels}
            letter=""
          />

          {/* Visual positioning container */}
          <PlacesVisual
            type={currentLevel.visualType}
            position={currentLevel.visualPosition}
          />

          {/* Question Text */}
          <View className="flex-row items-center justify-center gap-2 self-center mt-2 px-4">
            <Text variant="title" className="text-xl text-center flex-1">
              {currentLevel.question}
            </Text>
          </View>

          {/* Interactive options clickable to listen */}
          <View
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            className="gap-4 px-2 mt-1 justify-center"
          >
            {currentLevel.options.map((option) => {
              const isSelected = selectedOption === option.label;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => handleSelectOption(option)}
                  className="flex-1 py-4 px-6 rounded-2xl border-2 items-center active:opacity-95"
                  style={{
                    backgroundColor: isSelected ? palette.purpleLight : palette.surface,
                    borderColor: isSelected ? palette.purple : palette.border,
                    shadowColor: isSelected ? palette.purple : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0.2 : 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <Text
                    variant="title"
                    className="text-lg"
                    style={{ color: isSelected ? palette.purple : palette.text }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Bottom Mascot & controls */}
        <View className="gap-2" style={{ marginTop: 16 }}>
          {/* Duolingo Mascot Mentor */}
          <View style={{ height: 85, justifyContent: "center" }} className="my-1">
            <TalkyMascot state={mascotState} label={mascotLabel} />
          </View>

          {/* Microphone speech recorder */}
          <View className="-mt-3">
            <RecordButton
              selectedImageLabel={selectedOption}
              onRecordingComplete={handleRecordingComplete}
              onRecordingStatusChange={(recording) => setIsRecording(recording)}
            />
          </View>

          {/* Navigation bottom bar */}
          <View style={{ paddingVertical: 10 }}>
            <GameNavigation
              currentLevel={currentLevelIndex + 1}
              totalLevels={totalLevels}
              onPrevious={handlePrevious}
              onNext={
                isRecordingCompleted && selectedOption === currentLevel.correctAnswer
                  ? handleNext
                  : undefined
              }
              onFinish={
                isRecordingCompleted && selectedOption === currentLevel.correctAnswer
                  ? handleFinish
                  : undefined
              }
            />
          </View>
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
