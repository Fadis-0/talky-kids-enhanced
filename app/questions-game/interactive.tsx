import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, PanResponder, Pressable, View } from "react-native";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { SubscriptionModal } from "@/components/games/SubscriptionModal";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { BooksLevel, INTERACTIVE_LEVELS } from "@/lib/questions-game-data";
import { palette } from "@/lib/theme";

// ─── Audio maps ─────────────────────────────────────────────────────────────
const questionAudioMap: Record<string, any> = {
  "interactive-apples.mp4": require("../../assets/audio/interactive-game/interactive-apples.mp4"),
  "books-audio.mp4": require("../../assets/audio/interactive-game/books-audio.mp4"),
};

// ─── Apple positions on tree image ──────────────────────────────────────────
const APPLE_POSITIONS = [
  { x: 80,  y: 40  },
  { x: 150, y: 10  },
  { x: 230, y: 30  },
  { x: 80,  y: 110 },
  { x: 130, y: 100 },
  { x: 180, y: 120 },
  { x: 240, y: 100 },
  { x: 180, y: 80 },
];

// ─── Book assets ─────────────────────────────────────────────────────────────
const BOOK_IMAGES = {
  red:    require("../../assets/images/red-book.png"),
  green:  require("../../assets/images/green-book.png"),
  yellow: require("../../assets/images/yellow-book.png"),
};
const BOOK_LIST = ["red", "green", "yellow"] as const;
// Left-side starting positions for each book (absolute within game wrapper)
const BOOK_POSITIONS = {
  red:    { x: 8, y: 10  },
  green:  { x: 8, y: 115 },
  yellow: { x: 8, y: 220 },
};

// ─── Generic Draggable component ─────────────────────────────────────────────
type DraggableProps = {
  children: (panHandlers: any) => React.ReactNode;
  initialX: number;
  initialY: number;
  targetBoundsRef: React.MutableRefObject<{ x: number; y: number; w: number; h: number } | null>;
  onDrop: () => boolean; // returns true if drop accepted
  levelKey: number;
  disabled?: boolean;
};

function Draggable({ children, initialX, initialY, targetBoundsRef, onDrop, levelKey, disabled }: DraggableProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const lockedRef = useRef(false);

  // Keep latest props in refs so PanResponder always reads fresh values
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    lockedRef.current = false;
  }, [levelKey]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !lockedRef.current && !disabledRef.current,
      onMoveShouldSetPanResponder: () => !lockedRef.current && !disabledRef.current,
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
      onPanResponderRelease: (_e, gestureState) => {
        pan.flattenOffset();
        const bounds = targetBoundsRef.current;
        if (bounds && !lockedRef.current) {
          const { moveX, moveY } = gestureState;
          const over =
            moveX >= bounds.x && moveX <= bounds.x + bounds.w &&
            moveY >= bounds.y && moveY <= bounds.y + bounds.h;
          if (over) {
            const accepted = onDropRef.current();
            if (accepted) {
              lockedRef.current = true;
              return;
            }
          }
        }
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        zIndex: 100,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
    >
      {children(panResponder.panHandlers)}
    </Animated.View>
  );
}

// ─── Hearts display ───────────────────────────────────────────────────────────
function Hearts({ total, remaining }: { total: number; remaining: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, justifyContent: "center", marginBottom: 4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Text key={i} style={{ fontSize: 22 }}>
          {i < remaining ? "❤️" : "🖤"}
        </Text>
      ))}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function InteractiveGameScreen() {
  const router = useRouter();
  const { user, setUser } = useUserData();
  const { isRTL } = useLanguage();
  const soundRef = useRef<Audio.Sound | null>(null);

  // Drop target refs
  const basketRef = useRef<View>(null);
  const basketBoundsRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const teacherRef = useRef<View>(null);
  const teacherBoundsRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    const saved = user.questionsInteractiveLevel || 0;
    return saved < INTERACTIVE_LEVELS.length ? saved : 0;
  });

  // Apples level state
  const [droppedAppleIds, setDroppedAppleIds] = useState<Set<number>>(new Set());

  // Books level state
  const [heartsLeft, setHeartsLeft] = useState(5);
  const [correctDropped, setCorrectDropped] = useState(false);
  const [levelFailed, setLevelFailed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const totalLevels = INTERACTIVE_LEVELS.length;
  const currentLevel = INTERACTIVE_LEVELS[currentLevelIndex] || INTERACTIVE_LEVELS[0];

  const isApplesLevel = currentLevel.type === "apples";
  const isBooksLevel = currentLevel.type === "books";

  const applesBasketCount = droppedAppleIds.size;
  const applesComplete = isApplesLevel && applesBasketCount >= (currentLevel as any).targetCount;
  const booksComplete = isBooksLevel && correctDropped;
  const isComplete = applesComplete || booksComplete;

  // Cleanup audio
  useEffect(() => {
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  // Reset state on level change
  useEffect(() => {
    setDroppedAppleIds(new Set());
    setHeartsLeft(isBooksLevel ? (currentLevel as BooksLevel).maxAttempts : 5);
    setCorrectDropped(false);
    setLevelFailed(false);
  }, [currentLevelIndex]);

  const playQuestionAudio = async () => {
    try {
      if (soundRef.current) { await soundRef.current.unloadAsync(); soundRef.current = null; }
      const source = questionAudioMap[currentLevel.audioFile];
      if (!source) return;
      const { sound } = await Audio.Sound.createAsync(source);
      soundRef.current = sound;
      await sound.playAsync();
    } catch (err) { console.warn("Failed to play audio", err); }
  };

  // ── Apple handlers ──
  const handleAppleDropped = (id: number) => {
    setDroppedAppleIds(prev => new Set([...prev, id]));
  };

  // ── Book handlers ──
  const handleBookDrop = (bookType: "red" | "green" | "yellow"): boolean => {
    const level = currentLevel as BooksLevel;
    if (bookType === level.correctBook) {
      setCorrectDropped(true);
      return true; // accepted — lock in place
    } else {
      const newHearts = heartsLeft - 1;
      setHeartsLeft(newHearts);
      if (newHearts <= 0) setLevelFailed(true);
      return false; // bounce back
    }
  };

  // ── Navigation ──
  const handlePrevious = () => { if (currentLevelIndex > 0) setCurrentLevelIndex(currentLevelIndex - 1); };
  const handleNext = () => {
    // Show subscription modal after level 2
    if (currentLevelIndex + 1 === 2) {
      setShowSubscriptionModal(true);
      return;
    }

    if (currentLevelIndex < totalLevels - 1) {
      const next = currentLevelIndex + 1;
      setCurrentLevelIndex(next);
      if (next > user.questionsInteractiveLevel) setUser({ questionsInteractiveLevel: next });
    }
  };
  const handleFinish = () => {
    if (totalLevels > user.questionsInteractiveLevel) setUser({ questionsInteractiveLevel: totalLevels });
    router.back();
  };
  const handleRetry = () => {
    const level = currentLevel as BooksLevel;
    setHeartsLeft(level.maxAttempts);
    setLevelFailed(false);
    setCorrectDropped(false);
  };

  // ── Mascot ──
  let mascotState: "idle" | "selected" | "recording" | "completed" = "idle";
  let mascotLabel: string | undefined;
  if (isApplesLevel) {
    if (applesComplete) { mascotState = "completed"; mascotLabel = `رائع! وضعت 6 تفاحات في السلة! 🎉`; }
    else if (applesBasketCount > 0) { mascotState = "selected"; mascotLabel = `${applesBasketCount} من 6، استمر! 🍎`; }
  } else {
    if (levelFailed) { mascotState = "selected"; mascotLabel = "نفدت المحاولات! حاول مجدداً 💪"; }
    else if (booksComplete) { mascotState = "completed"; mascotLabel = "رائع! اخترت الكتاب الصحيح! 🎉"; }
  }

  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="العودة"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [{ width: 44, height: 44, borderRadius: 14, borderWidth: 2, borderColor: palette.border, backgroundColor: palette.surface, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.8 : 1, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, zIndex: 10, transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title="الأسئلة التفاعلية"
      subtitle={isApplesLevel ? "اسحب التفاحات من الشجرة إلى السلة!" : "اسحب الكتاب المناسب إلى المعلمة!"}
      accent="green"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr", gap: 12 }}>
        <LevelHeader levelNumber={currentLevelIndex + 1} totalLevels={totalLevels} letter="" />

        {/* Hearts — books level only */}
        {isBooksLevel && (
          <Hearts total={(currentLevel as BooksLevel).maxAttempts} remaining={heartsLeft} />
        )}

        {/* Audio button */}
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={playQuestionAudio}
            style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 22, paddingVertical: 11, backgroundColor: pressed ? "#BBF7D0" : "#F0FDF4", borderRadius: 20, borderWidth: 2, borderColor: palette.green, opacity: pressed ? 0.85 : 1, elevation: 3 })}
          >
            <Volume2 size={24} color={palette.green} />
            <Text variant="label" style={{ color: palette.green, fontSize: 15, paddingVertical: 5 }}>استمع للسؤال</Text>
          </Pressable>
        </View>

        {/* ── APPLES LEVEL ── */}
        {isApplesLevel && (
          <View style={{ position: "relative", marginHorizontal: 16, height: 385 }}>
            {/* Tree scene */}
            <Image source={require("../../assets/images/apples.jpeg")} style={{ width: "100%", height: 300, borderRadius: 20 }} resizeMode="contain" />

            {/* Basket */}
            <View
              ref={basketRef}
              onLayout={() => basketRef.current?.measure((_x, _y, w, h, px, py) => { basketBoundsRef.current = { x: px, y: py, w, h }; })}
              style={{ position: "absolute", bottom: 0, left: 40, right: 40, height: 110, borderRadius: 20, borderWidth: 3, borderStyle: "dashed", borderColor: applesComplete ? palette.green : palette.orange, backgroundColor: applesComplete ? palette.greenLight : "#FFF7ED", alignItems: "center", justifyContent: "center", gap: 4 }}
            >
              <Text style={{ fontSize: 64, padding: 28 }}>🧺</Text>
            </View>

            {/* Draggable apples */}
            {APPLE_POSITIONS.map((pos, id) =>
              droppedAppleIds.has(id) ? null : (
                <Draggable
                  key={`apple-${currentLevelIndex}-${id}`}
                  initialX={pos.x}
                  initialY={pos.y}
                  targetBoundsRef={basketBoundsRef}
                  onDrop={() => { handleAppleDropped(id); return true; }}
                  levelKey={currentLevelIndex}
                >
                  {(handlers) => (
                    <Image {...handlers} source={require("../../assets/images/apple.png")} style={{ width: 52, height: 52 }} resizeMode="contain" />
                  )}
                </Draggable>
              )
            )}
          </View>
        )}

        {/* ── BOOKS LEVEL ── */}
        {isBooksLevel && (
          <View style={{ position: "relative", marginHorizontal: 16, height: 330 }}>
            {/* Background panel */}
            <View style={{ position: "absolute", inset: 0, borderRadius: 20, backgroundColor: "#F0FDF4", borderWidth: 2, borderColor: palette.border }} />

            {/* Teacher drop zone — right side */}
            <View
              ref={teacherRef}
              onLayout={() => teacherRef.current?.measure((_x, _y, w, h, px, py) => { teacherBoundsRef.current = { x: px, y: py, w, h }; })}
              style={{ position: "absolute", right: 12, top: 20, width: 160, height: 290, borderRadius: 16, borderWidth: correctDropped ? 3 : 2, borderColor: correctDropped ? palette.green : palette.border, backgroundColor: correctDropped ? palette.greenLight : "transparent", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
            >
              <Image source={require("../../assets/images/teacher.jpeg")} style={{ width: "100%", height: "100%", borderRadius: 14 }} resizeMode="cover" />
              {!correctDropped && (
                <View style={{ position: "absolute", bottom: 8, left: 0, right: 0, alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgba(0,0,0,0.45)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ color: "#fff", fontSize: 11 }}>أفلت الكتاب هنا</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Draggable books — left side */}
            {!levelFailed && !correctDropped && BOOK_LIST.map(bookType => (
              <Draggable
                key={`book-${currentLevelIndex}-${bookType}`}
                initialX={BOOK_POSITIONS[bookType].x}
                initialY={BOOK_POSITIONS[bookType].y}
                targetBoundsRef={teacherBoundsRef}
                onDrop={() => handleBookDrop(bookType)}
                levelKey={currentLevelIndex}
                disabled={levelFailed || correctDropped}
              >
                {(handlers) => (
                  <Image {...handlers} source={BOOK_IMAGES[bookType]} style={{ width: 90, height: 100, borderRadius: 10 }} resizeMode="contain" />
                )}
              </Draggable>
            ))}

            {/* Retry overlay on fail */}
            {levelFailed && (
              <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", borderRadius: 20, alignItems: "center", justifyContent: "center", gap: 16 }}>
                <Text style={{ fontSize: 40 }}>💔</Text>
                <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>نفدت المحاولات!</Text>
                <Pressable
                  onPress={handleRetry}
                  style={({ pressed }) => ({ backgroundColor: pressed ? palette.greenDark : palette.green, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 16, opacity: pressed ? 0.85 : 1 })}
                >
                  <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>حاول مجدداً 🔄</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {/* Mascot */}
        <View style={{ height: 80, marginTop: 24, justifyContent: "center" }}>
          <TalkyMascot state={mascotState} label={mascotLabel} />
        </View>

        {/* Navigation */}
        <View style={{ paddingVertical: 12 }}>
          <GameNavigation
            currentLevel={currentLevelIndex + 1}
            totalLevels={totalLevels}
            onPrevious={handlePrevious}
            onNext={isComplete ? handleNext : () => {}}
            onFinish={isComplete ? handleFinish : () => {}}
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
