import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { SubscriptionModal } from "@/components/games/SubscriptionModal";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { SIZES_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

// Static map of question audio assets (Metro requires static require calls)
const questionAudioMap: Record<string, any> = {
  "sizes-tallest.mp4": require("../../assets/audio/sizes-game/sizes-tallest.mp4"),
  "sizes-shortest.mp4": require("../../assets/audio/sizes-game/sizes-shortest.mp4"),
};

export default function SizesGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();
  const soundRef = useRef<Audio.Sound | null>(null);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = user.questionsSizesLevel || 0;
    return saved < SIZES_LEVELS.length ? saved : 0;
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const totalLevels = SIZES_LEVELS.length;
  const currentLevel = SIZES_LEVELS[currentLevelIndex] || SIZES_LEVELS[0];

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  // Reset state on level change
  useEffect(() => {
    setSelectedIndex(null);
    setIsCorrect(false);
  }, [currentLevelIndex]);

  const playQuestionAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const source = questionAudioMap[currentLevel.audioFile];
      if (!source) {
        console.warn("No audio found for", currentLevel.audioFile);
        return;
      }
      const { sound } = await Audio.Sound.createAsync(source);
      soundRef.current = sound;
      await sound.playAsync();
    } catch (err) {
      console.warn("Failed to play question audio", err);
    }
  };

  const handleSelectOption = (index: number) => {
    setSelectedIndex(index);
    if (index === currentLevel.correctIndex) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
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
  let mascotLabel: string | undefined;

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
      subtitle="اضغط على الزر واستمع للسؤال، ثم اختر الإجابة!"
      accent="orange"
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

          {/* Audio Play Button — question is heard, not read */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Pressable
              onPress={playQuestionAudio}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 24,
                paddingVertical: 14,
                backgroundColor: pressed ? "#FED7AA" : "#FFF7ED",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: palette.orange,
                opacity: pressed ? 0.85 : 1,
                shadowColor: palette.orange,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 4,
              })}
            >
              <Volume2 size={24} color={palette.orange} />
              <Text variant="label" style={{ color: palette.orange, fontSize: 16, paddingVertical: 4 }}>
                استمع للسؤال
              </Text>
            </Pressable>
          </View>

          {/* Single image with two tap-zones overlaid (left = index 0, right = index 1) */}
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 8,
              borderRadius: 20,
              overflow: "hidden",
              borderWidth: 3,
              borderColor:
                selectedIndex !== null
                  ? selectedIndex === currentLevel.correctIndex
                    ? palette.green
                    : palette.red
                  : palette.border,
              shadowColor:
                selectedIndex !== null
                  ? selectedIndex === currentLevel.correctIndex
                    ? palette.green
                    : palette.red
                  : "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: selectedIndex !== null ? 0.3 : 0.08,
              shadowRadius: 8,
              elevation: 4,
              backgroundColor: palette.surface,
            }}
          >
            {/* The image showing both boys side by side */}
            <Image
              source={require("../../assets/images/sizes.jpeg")}
              style={{ width: "100%", height: 260 }}
              resizeMode="contain"
            />

            {/* Invisible tap zones overlay — left half = option 0, right half = option 1 */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flexDirection: "row",
              }}
            >
              {currentLevel.options.map((option, idx) => {
                const isSelected = selectedIndex === idx;
                const isOptionCorrect = idx === currentLevel.correctIndex;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => handleSelectOption(idx)}
                    style={{
                      flex: 1,
                      backgroundColor:
                        isSelected
                          ? isOptionCorrect
                            ? "rgba(34,197,94,0.18)"
                            : "rgba(239,68,68,0.18)"
                          : "transparent",
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>


        {/* Bottom: Mascot + Navigation */}
        <View className="gap-3" style={{ marginTop: 16 }}>
          <View style={{ height: 90, justifyContent: "center" }} className="mt-2">
            <TalkyMascot state={mascotState} label={mascotLabel} />
          </View>

          <View style={{ paddingVertical: 10, marginTop: 8 }}>
            <GameNavigation
              currentLevel={currentLevelIndex + 1}
              totalLevels={totalLevels}
              onPrevious={handlePrevious}
              onNext={isCorrect ? handleNext : () => { }}
              onFinish={isCorrect ? handleFinish : () => { }}
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
