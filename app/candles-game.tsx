import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ChevronLeft, Square, Wind } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import {
  CANDLES_LEVELS,
  getCandlesLevel,
  getTotalCandlesLevels,
} from "@/lib/candles-game-data";
import { fonts, palette } from "@/lib/theme";

const { width: SCREEN_W } = Dimensions.get("window");
const CONFETTI_COUNT = 24;
const CONFETTI_COLORS = [
  "#FF6B6B", "#FFCC00", "#58CC02", "#1CB0F6",
  "#CE82FF", "#FF9600", "#FF6BCB", "#FF4B4B",
];

// Confetti Particle
function ConfettiPiece({ index, active }: { index: number; active: boolean }) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const rot = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      tx.value = 0; ty.value = 0; rot.value = 0; scale.value = 0; opacity.value = 0;
      return;
    }
    const angle = (index / CONFETTI_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 60 + Math.random() * 95;
    const dur = 600 + Math.random() * 400;

    tx.value = 0;
    ty.value = 0;
    rot.value = 0;
    scale.value = 0;
    opacity.value = 1;

    scale.value = withSpring(1, { damping: 5 });
    tx.value = withTiming(Math.cos(angle) * dist, { duration: dur, easing: Easing.out(Easing.cubic) });
    ty.value = withSequence(
      withTiming(Math.sin(angle) * dist * 0.5, { duration: dur * 0.4 }),
      withTiming(Math.sin(angle) * dist + 120, { duration: dur * 0.6 }),
    );
    rot.value = withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: dur });
    opacity.value = withDelay(dur * 0.6, withTiming(0, { duration: dur * 0.4 }));
  }, [active]);

  const style = useAnimatedStyle(() => ({
    position: "absolute" as const,
    width: 8 + (index % 3) * 4,
    height: 8 + (index % 3) * 4,
    borderRadius: index % 2 === 0 ? 2 : 6,
    backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    opacity: opacity.value,
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${rot.value}deg` },
      { scale: scale.value },
    ],
  }));

  return <Animated.View style={style} />;
}

// Pretty SVG Candle with animated flame
function Candle({ color, isLit, isBlowing, index }: { color: string; isLit: boolean; isBlowing: boolean; index: number }) {
  const flameScaleX = useSharedValue(1);
  const flameScaleY = useSharedValue(1);
  const flameRotate = useSharedValue(0);

  // Flicker animation when lit
  useEffect(() => {
    if (!isLit) return;
    const delay = index * 120;
    flameScaleX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.9, { duration: 130 + Math.random() * 40 }),
          withTiming(1.1, { duration: 130 + Math.random() * 40 }),
        ),
        -1,
        true
      )
    );
    flameScaleY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.85, { duration: 180 + Math.random() * 60 }),
          withTiming(1.15, { duration: 180 + Math.random() * 60 }),
        ),
        -1,
        true
      )
    );
    flameRotate.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-3, { duration: 220 + Math.random() * 80 }),
          withTiming(3, { duration: 220 + Math.random() * 80 }),
        ),
        -1,
        true
      )
    );
  }, [isLit]);

  // Adjust flame angle/size when blowing
  useEffect(() => {
    if (!isLit) return;
    if (isBlowing) {
      flameRotate.value = withSpring(-20 + Math.random() * 4, { damping: 4 });
      flameScaleY.value = withSpring(0.75, { damping: 5 });
    } else {
      flameRotate.value = withSpring(0);
      flameScaleY.value = withSpring(1);
    }
  }, [isBlowing, isLit]);

  const flameStyle = useAnimatedStyle(() => ({
    opacity: isLit ? 1 : 0,
    transform: [
      { translateY: 15 },
      { rotate: `${flameRotate.value}deg` },
      { scaleX: flameScaleX.value },
      { scaleY: flameScaleY.value },
      { translateY: -15 },
    ],
  }));

  const height = 80;
  const width = 24;

  return (
    <View style={{ alignItems: "center", marginHorizontal: 8, marginVertical: 6 }}>
      <View style={{ height: 130, width: 38, justifyContent: "flex-end", alignItems: "center" }}>
        
        {/* Animated Flame */}
        {isLit && (
          <Animated.View style={[flameStyle, { position: "absolute", bottom: height }]}>
            <Svg width={28} height={38} viewBox="0 0 28 38">
              <Defs>
                <LinearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                  <Stop offset="0" stopColor="#FF3D00" />
                  <Stop offset="0.4" stopColor="#FF9100" />
                  <Stop offset="0.8" stopColor="#FFEA00" />
                  <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.8" />
                </LinearGradient>
              </Defs>
              <Path
                d="M14,0 C19,10 24,17 24,24 C24,31 18,36 14,36 C10,36 4,31 4,24 C4,17 9,10 14,0 Z"
                fill="url(#flameGrad)"
              />
              <Path
                d="M14,10 C16,17 19,22 19,25 C19,29 16,32 14,32 C12,32 9,29 9,25 C9,22 11,17 14,10 Z"
                fill="#FFFFC0"
                opacity={0.85}
              />
            </Svg>
          </Animated.View>
        )}

        {/* Smoke puff when extinguished */}
        {!isLit && (
          <View style={{ position: "absolute", bottom: height, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: palette.textMuted, opacity: 0.35, top: -6 }}>💨</Text>
          </View>
        )}

        {/* Wick */}
        <View style={{ width: 2.5, height: 8, backgroundColor: "#424242", marginBottom: -1 }} />

        {/* Candle Body */}
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: color,
            borderRadius: 5,
            borderWidth: 1.8,
            borderColor: "#3C3C3C",
            overflow: "hidden",
          }}
        >
          {/* Decorative stripes */}
          <View style={{ flex: 1, opacity: 0.18 }}>
            <View style={{ height: 8, backgroundColor: "#FFF", transform: [{ skewY: "-20deg" }], marginTop: 12 }} />
            <View style={{ height: 8, backgroundColor: "#FFF", transform: [{ skewY: "-20deg" }], marginTop: 12 }} />
            <View style={{ height: 8, backgroundColor: "#FFF", transform: [{ skewY: "-20deg" }], marginTop: 12 }} />
          </View>
        </View>

        {/* Candle Stand/Base */}
        <View
          style={{
            width: width + 10,
            height: 7,
            backgroundColor: "#E5E5E5",
            borderRadius: 3.5,
            borderWidth: 1.5,
            borderColor: "#3C3C3C",
            marginTop: 1.5,
          }}
        />
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SCREEN component
// ═══════════════════════════════════════════════════════════

export default function CandlesGameScreen() {
  const router = useRouter();
  const { setUser } = useUserData();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "listening" | "popped">("idle");
  const [isBlowing, setIsBlowing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalLevels = getTotalCandlesLevels();
  const currentLevel = getCandlesLevel(currentLevelIndex) || CANDLES_LEVELS[0];

  // Track which candles are extinguished (true = extinguished/blown out, false = still lit)
  const [extinguished, setExtinguished] = useState<boolean[]>([]);

  // Animation values
  const actionBtnPulse = useSharedValue(1);
  const mascotScale = useSharedValue(1);

  // Audio, ticks and progress tracking refs
  const recordingRef = useRef<Audio.Recording | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const volumeRef = useRef(0);
  const progressRef = useRef(0); // energy accumulated for current active candle (0 to 1)
  const stateRef = useRef(gameState);
  const levelRef = useRef(currentLevelIndex);
  const extinguishedRef = useRef(extinguished);

  // Sync refs
  useEffect(() => { stateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = currentLevelIndex; }, [currentLevelIndex]);
  useEffect(() => { extinguishedRef.current = extinguished; }, [extinguished]);

  // Initialise candles array for current level
  useEffect(() => {
    setExtinguished(new Array(currentLevel.candleCount).fill(false));
    progressRef.current = 0;
  }, [currentLevelIndex]);

  // Button pulse when waiting
  useEffect(() => {
    if (gameState === "idle") {
      actionBtnPulse.value = withRepeat(
        withSequence(withTiming(1.05, { duration: 750 }), withTiming(1, { duration: 750 })),
        -1, true,
      );
    } else {
      actionBtnPulse.value = withTiming(1, { duration: 200 });
    }
  }, [gameState]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // ── POP / COMPLETE LEVEL ACTION ──
  const completeLevel = useCallback(() => {
    setGameState("popped");
    setShowConfetti(true);
    setIsBlowing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    mascotScale.value = withSequence(
      withTiming(1.26, { duration: 90 }),
      withSpring(1, { damping: 5 }),
    );

    // Stop loops
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }

    // Stop mic
    const rec = recordingRef.current;
    recordingRef.current = null;
    if (rec) {
      rec.stopAndUnloadAsync().catch(() => {});
    }
  }, []);

  // ── CORE GAME TICK ──
  const startGameTick = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      if (stateRef.current !== "listening") return;

      const lvl = getCandlesLevel(levelRef.current) || CANDLES_LEVELS[0];
      const vol = volumeRef.current;
      const candlesList = extinguishedRef.current;

      // Find first candle that is still lit (false)
      const activeIdx = candlesList.indexOf(false);

      if (activeIdx === -1) {
        // All candles are already blown out
        completeLevel();
        return;
      }

      if (vol > 0.08) {
        setIsBlowing(true);
        // Accumulate progress
        const step = 0.015 + vol * 0.06 * lvl.volumeSensitivity;
        progressRef.current = Math.min(1.0, progressRef.current + step);

        // Once full progress, extinguish this candle
        if (progressRef.current >= 1.0) {
          const nextState = [...candlesList];
          nextState[activeIdx] = true;
          setExtinguished(nextState);
          extinguishedRef.current = nextState;
          progressRef.current = 0;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

          // Check if all are now extinguished
          if (nextState.every((val) => val === true)) {
            completeLevel();
          }
        }
      } else {
        setIsBlowing(false);
        // Cool down energy towards current candle, but already extinguished candles stay extinguished
        progressRef.current = Math.max(0, progressRef.current - 0.08);
      }
    }, 60);
  }, [completeLevel]);

  // ── START LISTENING ──
  const startListening = async () => {
    const lvl = getCandlesLevel(currentLevelIndex) || CANDLES_LEVELS[0];
    setExtinguished(new Array(lvl.candleCount).fill(false));
    setGameState("listening");
    setIsBlowing(false);
    volumeRef.current = 0;
    progressRef.current = 0;

    startGameTick();

    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        console.warn("Mic permission denied, playing in simulator/fallback mode.");
        let simTime = 0;
        const simInterval = setInterval(() => {
          if (stateRef.current !== "listening") {
            clearInterval(simInterval);
            return;
          }
          simTime += 0.25;
          // Simulate blowing patterns
          const isBlowingSim = Math.sin(simTime) > -0.2;
          volumeRef.current = isBlowingSim ? 0.5 + Math.random() * 0.15 : 0;
        }, 150);
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      const onStatusUpdate = (status: any) => {
        if (status.isRecording && status.metering !== undefined) {
          const db = status.metering;
          // Map typical speaking/blowing range (~ -40dB to -3dB) to 0..1 range
          const clamped = Math.max(0, Math.min(1, (db + 45) / 40));
          volumeRef.current = clamped;
        }
      };

      const { recording } = await Audio.Recording.createAsync(
        {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        },
        onStatusUpdate,
        60
      );
      recordingRef.current = recording;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (err) {
      console.warn("Failed to start mic recording:", err);
      let simTime = 0;
      const simInterval = setInterval(() => {
        if (stateRef.current !== "listening") {
          clearInterval(simInterval);
          return;
        }
        simTime += 0.25;
        const isBlowingSim = Math.sin(simTime) > -0.2;
        volumeRef.current = isBlowingSim ? 0.5 : 0;
      }, 150);
    }
  };

  // ── STOP LISTENING ──
  const stopListening = async () => {
    setGameState("idle");
    setIsBlowing(false);
    volumeRef.current = 0;
    progressRef.current = 0;

    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }

    const rec = recordingRef.current;
    recordingRef.current = null;
    if (rec) {
      try {
        await rec.stopAndUnloadAsync();
      } catch {}
    }

    // Reset candles status
    const lvl = getCandlesLevel(levelRef.current) || CANDLES_LEVELS[0];
    setExtinguished(new Array(lvl.candleCount).fill(false));
  };

  // ── LEVEL MANAGEMENT ──
  const resetLevel = (idx: number) => {
    const lvl = getCandlesLevel(idx) || CANDLES_LEVELS[0];
    setGameState("idle");
    setIsBlowing(false);
    setShowConfetti(false);
    volumeRef.current = 0;
    progressRef.current = 0;
    setExtinguished(new Array(lvl.candleCount).fill(false));

    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    const rec = recordingRef.current;
    recordingRef.current = null;
    if (rec) rec.stopAndUnloadAsync().catch(() => {});
  };

  const handlePrevious = () => {
    if (currentLevelIndex > 0) {
      const prev = currentLevelIndex - 1;
      resetLevel(prev);
      setCurrentLevelIndex(prev);
    }
  };

  const handleNext = () => {
    if (currentLevelIndex < totalLevels - 1) {
      const next = currentLevelIndex + 1;
      resetLevel(next);
      setCurrentLevelIndex(next);
      setUser({ candlesGameLevel: next + 1 });
    }
  };

  const handleFinish = () => {
    setUser({ candlesGameLevel: totalLevels });
    router.back();
  };

  const mascotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mascotScale.value }],
  }));

  const actionBtnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: actionBtnPulse.value }],
  }));

  // Back navigation bar button
  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel={t("common.back")}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [{
        width: 44, height: 44, borderRadius: 14,
        borderWidth: 2, borderColor: palette.border,
        backgroundColor: palette.surface,
        alignItems: "center", justifyContent: "center",
        opacity: pressed ? 0.8 : 1,
        elevation: 4, shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, shadowRadius: 2, zIndex: 10,
        transform: [{ scaleX: isRTL ? -1 : 1 }], // Flip arrow for RTL
      }]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title={t("games.candles.title")}
      subtitle={t("games.candles.subtitle")}
      accent="red"
      topNavBar={backButton}
      hideTabBarClearance
    >
      <View style={{ flex: 1, justifyContent: "space-between", minHeight: 520, direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* Header section */}
        <View className="gap-2">
          <LevelHeader levelNumber={currentLevelIndex + 1} totalLevels={totalLevels} letter="" />
          <View style={s.levelBadge}>
            <Text style={[s.levelBadgeText, { fontFamily: isRTL ? "Cairo_600SemiBold" : fonts.displaySemi }]}>
              {t(`candlesGame.level${currentLevelIndex + 1}`, { defaultValue: currentLevel.label })}
            </Text>
          </View>
        </View>

        {/* Center Candle Area */}
        <View style={s.candleArea}>
          {/* Confetti Layer */}
          {showConfetti && (
            <View style={s.confettiWrap}>
              {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
                <ConfettiPiece key={i} index={i} active={showConfetti} />
              ))}
            </View>
          )}

          {gameState !== "popped" ? (
            <View style={[s.candlesRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              {extinguished.map((isExt, idx) => (
                <Candle
                  key={idx}
                  color={currentLevel.colors[idx % currentLevel.colors.length]}
                  isLit={!isExt}
                  isBlowing={isBlowing}
                  index={idx}
                />
              ))}
            </View>
          ) : (
            <View style={s.completeWrap}>
              <Text style={[s.completeText, { fontFamily: isRTL ? "Cairo_700Bold" : fonts.displayBold }]}>
                {t("games.candles.blownOutText")} 💨🕯️
              </Text>
              <Text style={[s.completeSub, { fontFamily: isRTL ? "Cairo_600SemiBold" : fonts.displaySemi }]}>
                {t("games.candles.congrats")}
              </Text>
            </View>
          )}
        </View>

        {/* Character Reaction Mascot */}
        <Animated.View style={[mascotAnimStyle, { marginBottom: 4 }]}>
          <TalkyMascot
            state={gameState === "popped" ? "completed" : gameState === "listening" ? "recording" : "idle"}
            label={gameState === "popped" ? t("games.candles.blownOutText") : gameState === "listening" ? t("games.candles.blow") : "🎂"}
          />
        </Animated.View>

        {/* Footer controls */}
        <View className="gap-4" style={{ paddingBottom: 8 }}>
          {gameState !== "popped" ? (
            <Animated.View style={actionBtnAnimStyle}>
              <Pressable
                onPress={gameState === "listening" ? stopListening : startListening}
                accessibilityRole="button"
                accessibilityLabel={gameState === "listening" ? t("games.candles.stopListening") : t("games.candles.startListening")}
              >
                {({ pressed }) => {
                  const isListen = gameState === "listening";
                  const shadowColor = isListen ? "#A22929" : "#B21A1A";
                  const faceColor = isListen ? palette.textSecondary : palette.red;

                  return (
                    <View style={s.btnOuter}>
                      <View style={[s.btnShadow, { backgroundColor: shadowColor }]} />
                      <View style={[s.btnFace, {
                        backgroundColor: faceColor,
                        top: pressed ? 4 : 0,
                      }]}>
                        {isListen ? (
                          <Square size={26} color="#FFF" fill="#FFF" />
                        ) : (
                          <Wind size={32} color="#FFF" />
                        )}
                      </View>
                    </View>
                  );
                }}
              </Pressable>
            </Animated.View>
          ) : (
            <View style={s.poppedBanner}>
              <Text style={[s.poppedText, { fontFamily: isRTL ? "Cairo_700Bold" : fonts.displayBold }]}>
                {t("games.candles.blownOutBanner")}
              </Text>
            </View>
          )}

          {gameState === "popped" && (
            <View style={{ paddingVertical: 4 }}>
              <GameNavigation
                currentLevel={currentLevelIndex + 1}
                totalLevels={totalLevels}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onFinish={handleFinish}
              />
            </View>
          )}
        </View>
      </View>
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  levelBadge: {
    alignSelf: "center",
    backgroundColor: palette.redLight,
    paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1.5, borderColor: palette.red,
    marginTop: 10,
    marginBottom: 6,
  },
  levelBadgeText: {
    fontSize: 14,
    color: palette.red, textAlign: "center",
  },
  candleArea: {
    flex: 1, alignItems: "center", justifyContent: "center", minHeight: 250,
    marginVertical: 16,
  },
  candlesRow: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
  },
  confettiWrap: {
    position: "absolute", alignItems: "center", justifyContent: "center",
    width: 1, height: 1, zIndex: 20,
  },
  completeWrap: { alignItems: "center", gap: 4 },
  completeText: { fontSize: 36, color: palette.red, textAlign: "center" },
  completeSub: { fontSize: 16, color: palette.textSecondary, textAlign: "center" },
  btnOuter: { position: "relative", height: 76, width: 76, alignSelf: "center" },
  btnShadow: { position: "absolute", left: 0, right: 0, bottom: 0, height: 72, borderRadius: 38 },
  btnFace: {
    position: "absolute", left: 0, right: 0, height: 70, borderRadius: 38,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  poppedBanner: {
    backgroundColor: palette.redLight, paddingVertical: 14, paddingHorizontal: 24,
    borderRadius: 18, borderWidth: 2, borderColor: palette.red, alignItems: "center",
  },
  poppedText: { fontSize: 16, color: palette.red },
});
