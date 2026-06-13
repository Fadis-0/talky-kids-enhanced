import { useRouter } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import * as Speech from "expo-speech";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { SIZES_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

export default function SizesGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const totalLevels = SIZES_LEVELS.length;
  const currentLevel = SIZES_LEVELS[currentLevelIndex] || SIZES_LEVELS[0];

  const playQuestionTTS = () => {
    Speech.stop();
    Speech.speak(currentLevel.question, {
      language: "ar-SA",
      pitch: 1.1,
      rate: 0.85,
    });
  };

  useEffect(() => {
    setSelectedIndex(null);
    setIsCorrect(false);

    const timer = setTimeout(() => {
      playQuestionTTS();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentLevelIndex]);

  const handleSelectOption = (index: number) => {
    setSelectedIndex(index);
    const option = currentLevel.options[index];
    
    // Play option TTS
    Speech.stop();
    Speech.speak(option.label, {
      language: "ar-SA",
      pitch: 1.15,
      rate: 0.8,
    });

    if (index === currentLevel.correctIndex) {
      setIsCorrect(true);
      // Speak success after a short delay
      setTimeout(() => {
        Speech.speak("أحسنت! إجابة صحيحة", {
          language: "ar-SA",
          pitch: 1.2,
          rate: 0.85,
        });
      }, 900);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        Speech.speak("حاول مرة أخرى", {
          language: "ar-SA",
          pitch: 1.0,
          rate: 0.85,
        });
      }, 900);
    }
  };

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLevelIndex < totalLevels - 1) {
      const nextLevel = currentLevelIndex + 1;
      setCurrentLevelIndex(nextLevel);
      if (nextLevel > user.questionsSizesLevel) {
        setUser({ questionsSizesLevel: nextLevel });
      }
    }
  };

  const handleFinish = () => {
    if (totalLevels > user.questionsSizesLevel) {
      setUser({ questionsSizesLevel: totalLevels });
    }
    router.back();
  };

  // Determine mascot state
  let mascotState: "idle" | "selected" | "recording" | "completed" = "idle";
  let mascotLabel = currentLevel.question;

  if (selectedIndex !== null) {
    if (isCorrect) {
      mascotState = "completed";
      mascotLabel = "رائع! إجابة صحيحة تماماً! 🎉";
    } else {
      mascotState = "selected";
      mascotLabel = "هذه ليست الإجابة المطلوبة، حاول مرة أخرى!";
    }
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
      title="الأحجام والمقاسات"
      subtitle="استمع جيداً للسؤال واختر الإجابة الصحيحة!"
      accent="orange"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }} className="gap-6">
        <LevelHeader
          levelNumber={currentLevelIndex + 1}
          totalLevels={totalLevels}
          letter=""
        />

        {/* Spoken Question Text */}
        <View className="flex-row items-center justify-center gap-2 self-center mt-2 px-4">
          <Text variant="title" className="text-xl text-center flex-1">
            {currentLevel.question}
          </Text>
          <Pressable
            onPress={playQuestionTTS}
            className="p-2 bg-tk-orange-light rounded-full border border-[#FED7AA] active:opacity-75"
          >
            <Volume2 size={22} color={palette.orange} />
          </Pressable>
        </View>

        {/* Sizes Choices Row */}
        <View
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          className="gap-5 px-1 justify-center items-end mt-4"
        >
          {currentLevel.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isOptionCorrect = idx === currentLevel.correctIndex;
            
            let cardBorderColor = palette.border;
            let cardBgColor = palette.surface;
            if (isSelected) {
              cardBorderColor = isOptionCorrect ? palette.green : palette.red;
              cardBgColor = isOptionCorrect ? palette.greenLight : palette.redLight;
            }

            // custom container height if specified, or default 140
            const containerHeight = option.height || 140;

            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelectOption(idx)}
                className="flex-1 rounded-2xl border-2 items-center justify-center p-4 active:opacity-95"
                style={{
                  height: containerHeight,
                  borderColor: cardBorderColor,
                  backgroundColor: cardBgColor,
                  shadowColor: isSelected ? cardBorderColor : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isSelected ? 0.2 : 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    transform: [{ scale: option.scale }],
                  }}
                >
                  <Text className="text-5xl">{option.emoji}</Text>
                </View>
                <Text
                  variant="label"
                  className="mt-3 text-sm text-center"
                  style={{
                    color: isSelected && isOptionCorrect ? palette.greenDark : palette.text,
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Duolingo Mascot Mentor */}
        <View style={{ height: 90, justifyContent: "center" }} className="mt-4">
          <TalkyMascot state={mascotState} label={mascotLabel} />
        </View>

        {/* Navigation bar at bottom */}
        <View style={{ paddingVertical: 10, marginTop: 10 }}>
          <GameNavigation
            currentLevel={currentLevelIndex + 1}
            totalLevels={totalLevels}
            onPrevious={handlePrevious}
            onNext={isCorrect ? handleNext : undefined}
            onFinish={isCorrect ? handleFinish : undefined}
          />
        </View>
      </View>
    </ScreenShell>
  );
}
