import { useRouter } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, View } from "react-native";
import * as Speech from "expo-speech";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { INTERACTIVE_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

type DraggableItemProps = {
  emoji: string;
  label: string;
  isCorrect: boolean;
  onDrop: (isCorrect: boolean, label: string) => void;
  targetBounds: { x: number; y: number; w: number; h: number } | null;
  currentLevelIndex: number;
  isCorrectDropped: boolean;
};

function DraggableItem({
  emoji,
  label,
  isCorrect,
  onDrop,
  targetBounds,
  currentLevelIndex,
  isCorrectDropped,
}: DraggableItemProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  // Track the latest props in a ref to avoid stale closure issues in PanResponder
  const stateRef = useRef({ isCorrectDropped, targetBounds, isCorrect, label, onDrop });
  stateRef.current = { isCorrectDropped, targetBounds, isCorrect, label, onDrop };

  // Reset position when level changes
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [currentLevelIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !stateRef.current.isCorrectDropped,
      onMoveShouldSetPanResponder: () => !stateRef.current.isCorrectDropped,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();

        const { targetBounds, onDrop, isCorrect, label } = stateRef.current;

        if (targetBounds) {
          const touchX = gestureState.moveX;
          const touchY = gestureState.moveY;

          const isOverTarget =
            touchX >= targetBounds.x &&
            touchX <= targetBounds.x + targetBounds.w &&
            touchY >= targetBounds.y &&
            touchY <= targetBounds.y + targetBounds.h;

          if (isOverTarget) {
            onDrop(isCorrect, label);
            if (isCorrect) {
              // Lock it or let it animate slightly
            } else {
              // Bounce back
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
              }).start();
            }
          } else {
            // Bounce back
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        } else {
          // Bounce back fallback
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        {
          width: 100,
          height: 100,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: palette.border,
          backgroundColor: palette.surface,
          alignItems: "center",
          justifyContent: "center",
          opacity: isCorrectDropped && !isCorrect ? 0.4 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
      ]}
    >
      <Text className="text-5xl">{emoji}</Text>
      <Text variant="label" className="text-xs mt-1 text-tk-text">
        {label}
      </Text>
    </Animated.View>
  );
}

export default function InteractiveGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = user.questionsInteractiveLevel || 0;
    return saved < INTERACTIVE_LEVELS.length ? saved : 0;
  });
  const [targetBounds, setTargetBounds] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [isCorrectDropped, setIsCorrectDropped] = useState(false);
  const [droppedItemLabel, setDroppedItemLabel] = useState<string | null>(null);
  const [lastActionStatus, setLastActionStatus] = useState<"success" | "fail" | null>(null);

  const targetRef = useRef<View>(null);
  const totalLevels = INTERACTIVE_LEVELS.length;
  const currentLevel = INTERACTIVE_LEVELS[currentLevelIndex] || INTERACTIVE_LEVELS[0];

  const updateTargetBounds = () => {
    if (targetRef.current) {
      targetRef.current.measure((x, y, w, h, pageX, pageY) => {
        setTargetBounds({ x: pageX, y: pageY, w, h });
      });
    }
  };

  const playQuestionTTS = () => {
    Speech.stop();
    Speech.speak(currentLevel.question, {
      language: "ar-SA",
      pitch: 1.1,
      rate: 0.85,
    });
  };

  useEffect(() => {
    setIsCorrectDropped(false);
    setDroppedItemLabel(null);
    setLastActionStatus(null);

    const timer = setTimeout(() => {
      playQuestionTTS();
      // Ensure target bounds are measured after render
      updateTargetBounds();
    }, 600);

    return () => clearTimeout(timer);
  }, [currentLevelIndex]);

  const handleDrop = (isCorrect: boolean, label: string) => {
    if (isCorrect) {
      setIsCorrectDropped(true);
      setDroppedItemLabel(label);
      setLastActionStatus("success");

      // Play success audio
      Speech.stop();
      Speech.speak(`رائع! وضعت ${label} في ${currentLevel.targetLabel}`, {
        language: "ar-SA",
        pitch: 1.15,
        rate: 0.85,
      });
    } else {
      setLastActionStatus("fail");
      setDroppedItemLabel(label);

      // Play try again advice
      Speech.stop();
      Speech.speak(`حاول مرة أخرى! ضع الإجراء الصحيح وليس ${label}`, {
        language: "ar-SA",
        pitch: 1.0,
        rate: 0.85,
      });
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
      if (nextLevel > user.questionsInteractiveLevel) {
        setUser({ questionsInteractiveLevel: nextLevel });
      }
    }
  };

  const handleFinish = () => {
    if (totalLevels > user.questionsInteractiveLevel) {
      setUser({ questionsInteractiveLevel: totalLevels });
    }
    router.back();
  };

  // Determine mascot state
  let mascotState: "idle" | "selected" | "recording" | "completed" = "idle";
  let mascotLabel = currentLevel.question;

  if (lastActionStatus === "success") {
    mascotState = "completed";
    mascotLabel = `عمل ممتاز! لقد وضعت ال${droppedItemLabel} داخل ${currentLevel.targetLabel}! 🎉`;
  } else if (lastActionStatus === "fail") {
    mascotState = "selected";
    mascotLabel = `حاول مجدداً! ضع المطلوب داخل ${currentLevel.targetLabel}.`;
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
      title="الأسئلة التفاعلية"
      subtitle="اسحب العنصر الصحيح وأفلته في المكان المناسب!"
      accent="green"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, justifyContent: "space-between", minHeight: 580, direction: "ltr" }}>
        {/* Top/Middle Group */}
        <View className="gap-5">
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
              className="p-2 bg-tk-green-light rounded-full border border-[#BBF7D0] active:opacity-75"
            >
              <Volume2 size={22} color={palette.green} />
            </Pressable>
          </View>

          {/* Target Zone Box */}
          <View
            ref={targetRef}
            onLayout={updateTargetBounds}
            className="w-44 h-44 rounded-3xl border-4 border-dashed items-center justify-center self-center my-2 relative"
            style={{
              borderColor: isCorrectDropped ? palette.green : palette.borderStrong,
              backgroundColor: isCorrectDropped ? palette.greenLight : "#F9F9F9",
            }}
          >
            {isCorrectDropped ? (
              <View className="items-center justify-center">
                <Text className="text-6xl">{currentLevel.items.find(i => i.isCorrect)?.emoji}</Text>
                <Text variant="label" className="text-sm mt-2 font-bold text-tk-green-dark">
                  {currentLevel.targetLabel}
                </Text>
              </View>
            ) : (
              <View className="items-center justify-center p-4">
                <Text className="text-6xl">{currentLevel.targetEmoji}</Text>
                <Text variant="label" className="text-xs mt-2 text-tk-text-secondary text-center">
                  {`أفلت هنا: ${currentLevel.targetLabel}`}
                </Text>
              </View>
            )}
          </View>

          {/* Draggable items container (LTR Row Flow) */}
          <View
            style={{ flexDirection: "row" }}
            className="justify-around items-center h-28 mt-2 px-2"
          >
            {currentLevel.items.map((item) => (
              <DraggableItem
                key={item.id}
                emoji={item.emoji}
                label={item.label}
                isCorrect={item.isCorrect}
                onDrop={handleDrop}
                targetBounds={targetBounds}
                currentLevelIndex={currentLevelIndex}
                isCorrectDropped={isCorrectDropped}
              />
            ))}
          </View>
        </View>

        {/* Bottom Mascot & controls */}
        <View className="gap-2" style={{ marginTop: 16 }}>
          {/* Duolingo Mascot Mentor */}
          <View style={{ height: 80, justifyContent: "center" }} className="mt-2">
            <TalkyMascot state={mascotState} label={mascotLabel} />
          </View>

          {/* Navigation bar at bottom */}
          <View style={{ paddingVertical: 10 }}>
            <GameNavigation
              currentLevel={currentLevelIndex + 1}
              totalLevels={totalLevels}
              onPrevious={handlePrevious}
              onNext={isCorrectDropped ? handleNext : () => Speech.speak("ضع الشكل في مكانه أولاً", { language: "ar-SA" })}
              onFinish={isCorrectDropped ? handleFinish : () => Speech.speak("ضع الشكل في مكانه أولاً", { language: "ar-SA" })}
            />
          </View>
        </View>
      </View>
    </ScreenShell>
  );
}
