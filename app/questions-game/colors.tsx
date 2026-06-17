import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { SubscriptionModal } from "@/components/games/SubscriptionModal";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { COLORS_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

export default function ColorsGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = user.questionsColorsLevel || 0;
    return saved < COLORS_LEVELS.length ? saved : 0;
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const totalLevels = COLORS_LEVELS.length;
  const currentLevel = COLORS_LEVELS[currentLevelIndex] || COLORS_LEVELS[0];

  useEffect(() => {
    setSelectedIndex(null);
    setIsCorrect(false);
  }, [currentLevelIndex]);

  const handleSelectOption = (index: number) => {
    setSelectedIndex(index);
    setIsCorrect(index === currentLevel.correctIndex);
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
      if (nextLevel > user.questionsColorsLevel) {
        setUser({ questionsColorsLevel: nextLevel });
      }
    }
  };

  const handleFinish = () => {
    if (totalLevels > user.questionsColorsLevel) {
      setUser({ questionsColorsLevel: totalLevels });
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
      title="الألوان"
      subtitle="استمع جيداً للسؤال واختر الشيء باللون المناسب!"
      accent="blue"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, justifyContent: "space-between", minHeight: 540, direction: isRTL ? "rtl" : "ltr" }}>
        {/* Top/Middle Group */}
        <View className="gap-6">
          <LevelHeader
            levelNumber={currentLevelIndex + 1}
            totalLevels={totalLevels}
            letter=""
          />

          {/* Question Text */}
          <View className="flex-row items-center justify-center gap-2 self-center mt-2 px-4">
            <Text variant="title" className="text-xl text-center flex-1">
              {currentLevel.question}
            </Text>
          </View>

          {/* Color Choices Row */}
          <View
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            className="gap-5 px-1 justify-center items-center mt-4"
          >
            {currentLevel.options.map((option, idx) => {
              const isSelected = selectedIndex === idx;
              const isOptionCorrect = idx === currentLevel.correctIndex;

              let cardBorderColor: string = palette.border;
              let cardBgColor: string = palette.surface;
              if (isSelected) {
                cardBorderColor = isOptionCorrect ? palette.green : palette.red;
                cardBgColor = isOptionCorrect ? palette.greenLight : palette.redLight;
              }

              return (
                <Pressable
                  key={option.id}
                  onPress={() => handleSelectOption(idx)}
                  className="flex-1 rounded-2xl border-2 items-center justify-center p-5 active:opacity-95"
                  style={{
                    height: 140,
                    borderColor: cardBorderColor,
                    backgroundColor: cardBgColor,
                    shadowColor: isSelected ? cardBorderColor : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0.2 : 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <Text className="text-5xl">{option.emoji}</Text>
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
        </View>

        {/* Bottom Mascot & controls */}
        <View className="gap-3" style={{ marginTop: 16 }}>
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
