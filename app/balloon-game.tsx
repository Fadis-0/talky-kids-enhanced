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
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { GameNavigation } from "@/components/games/GameNavigation";
import { LevelHeader } from "@/components/games/LevelHeader";
import { TalkyMascot } from "@/components/games/TalkyMascot";
import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import {
  BALLOON_LEVELS,
  getBalloonLevel,
  getTotalBalloonLevels,
} from "@/lib/balloon-game-data";
import { fonts, palette } from "@/lib/theme";

const { width: SCREEN_W } = Dimensions.get("window");
const BALLOON_BASE = Math.min(SCREEN_W * 0.46, 190);
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
    const dist = 60 + Math.random() * 90;
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

// Balloon Shape with Face
function BalloonShape({ color, size, isBlowing }: { color: string; size: number; isBlowing: boolean }) {
  const w = size;
  const h = size * 1.28;
  const cx = w / 2;
  const cy = h * 0.44;
  const rx = w * 0.44;
  const ry = h * 0.44;

  return (
    <Svg width={w} height={h + 40} viewBox={`0 0 ${w} ${h + 40}`}>
      <Defs>
        <LinearGradient id="balloonGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.45" />
          <Stop offset="0.3" stopColor={color} stopOpacity="1" />
          <Stop offset="1" stopColor={color} stopOpacity="0.8" />
        </LinearGradient>
      </Defs>

      {/* Main Balloon */}
      <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#balloonGrad)" />

      {/* Shine Highlight */}
      <Ellipse cx={w * 0.35} cy={h * 0.25} rx={w * 0.08} ry={h * 0.1} fill="#FFFFFF" opacity={0.35} />

      {/* ── Funny Face ── */}
      {/* Eyes */}
      <Circle cx={cx - rx * 0.28} cy={cy - ry * 0.08} r={rx * 0.12} fill="#FFFFFF" />
      <Circle cx={cx + rx * 0.28} cy={cy - ry * 0.08} r={rx * 0.12} fill="#FFFFFF" />
      {/* Pupils */}
      <Circle cx={cx - rx * 0.28 + (isBlowing ? 1 : 0)} cy={cy - ry * 0.08} r={rx * 0.06} fill="#3C3C3C" />
      <Circle cx={cx + rx * 0.28 - (isBlowing ? 1 : 0)} cy={cy - ry * 0.08} r={rx * 0.06} fill="#3C3C3C" />
      {/* Eye Shine */}
      <Circle cx={cx - rx * 0.28 - 2} cy={cy - ry * 0.08 - 2} r={rx * 0.025} fill="#FFFFFF" />
      <Circle cx={cx + rx * 0.28 - 2} cy={cy - ry * 0.08 - 2} r={rx * 0.025} fill="#FFFFFF" />

      {/* Eyebrows */}
      <Path
        d={`M${cx - rx * 0.42},${cy - ry * 0.25} Q${cx - rx * 0.28},${cy - ry * 0.34} ${cx - rx * 0.14},${cy - ry * 0.25}`}
        stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" fill="none"
      />
      <Path
        d={`M${cx + rx * 0.14},${cy - ry * 0.25} Q${cx + rx * 0.28},${cy - ry * 0.34} ${cx + rx * 0.42},${cy - ry * 0.25}`}
        stroke="#3C3C3C" strokeWidth={2} strokeLinecap="round" fill="none"
      />

      {/* Cheek blush */}
      <Circle cx={cx - rx * 0.48} cy={cy + ry * 0.08} r={rx * 0.08} fill="#FF4B4B" opacity={0.25} />
      <Circle cx={cx + rx * 0.48} cy={cy + ry * 0.08} r={rx * 0.08} fill="#FF4B4B" opacity={0.25} />

      {/* Mouth */}
      {isBlowing ? (
        <Ellipse cx={cx} cy={cy + ry * 0.22} rx={rx * 0.09} ry={rx * 0.11} fill="#D84315" />
      ) : (
        <Path
          d={`M${cx - rx * 0.18},${cy + ry * 0.18} Q${cx},${cy + ry * 0.32} ${cx + rx * 0.18},${cy + ry * 0.18}`}
          stroke="#D84315" strokeWidth={2.5} strokeLinecap="round" fill="none"
        />
      )}

      {/* Knot */}
      <Path d={`M${cx - 6},${cy + ry - 2} L${cx + 6},${cy + ry - 2} L${cx},${cy + ry + 6} Z`} fill={color} />
      {/* String */}
      <Path d={`M${cx},${cy + ry + 6} Q${cx + 8},${cy + ry + 18} ${cx - 4},${cy + ry + 32}`} stroke={palette.textMuted} strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SCREEN component
// ═══════════════════════════════════════════════════════════
export default function BalloonGameScreen() {
  const router = useRouter();
  const { setUser } = useUserData();

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "listening" | "popped">("idle");
  const [isBlowing, setIsBlowing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalLevels = getTotalBalloonLevels();
  const currentLevel = getBalloonLevel(currentLevelIndex) || BALLOON_LEVELS[0];

  // Animation values
  const balloonScale = useSharedValue(currentLevel.initialScale);
  const balloonOpacity = useSharedValue(1);
  const balloonRotate = useSharedValue(0);
  const mascotScale = useSharedValue(1);
  const actionBtnPulse = useSharedValue(1);

  // Audio & loop references
  const recordingRef = useRef<Audio.Recording | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const volumeRef = useRef(0);
  const stateRef = useRef(gameState);
  const levelRef = useRef(currentLevelIndex);

  // Keep refs in sync with state
  useEffect(() => { stateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = currentLevelIndex; }, [currentLevelIndex]);

  // Wobble effect when idle/listening
  useEffect(() => {
    balloonRotate.value = withRepeat(
      withSequence(
        withTiming(-2.5, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(2.5, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1, true,
    );
  }, []);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // ── POP ACTION ──
  const popBalloon = useCallback(() => {
    setGameState("popped");
    setShowConfetti(true);
    setIsBlowing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Explosive visual animation
    balloonScale.value = withSequence(
      withTiming(1.28, { duration: 70 }),
      withTiming(0, { duration: 100 }),
    );
    balloonOpacity.value = withTiming(0, { duration: 160 });

    // Mascot reaction
    mascotScale.value = withSequence(
      withTiming(1.26, { duration: 90 }),
      withSpring(1, { damping: 5 }),
    );

    // Clear loops
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

      const lvl = getBalloonLevel(levelRef.current) || BALLOON_LEVELS[0];
      const vol = volumeRef.current;
      let nextScale = balloonScale.value;

      // Threshold is 0.08 (quiet room floor)
      if (vol > 0.08) {
        setIsBlowing(true);
        // Base growth + volume-driven boost (scaled by level sensitivity)
        const growth = 0.007 + vol * 0.038 * lvl.volumeSensitivity;
        nextScale = Math.min(lvl.popScale, nextScale + growth);
      } else {
        setIsBlowing(false);
        // Deflate gradually down to initial level scale
        nextScale = Math.max(lvl.initialScale, nextScale - lvl.shrinkRate);
      }

      balloonScale.value = nextScale;

      if (nextScale >= lvl.popScale) {
        popBalloon();
      }
    }, 50); // 20 frames per second check
  }, [popBalloon]);

  // ── START LISTENING ──
  const startListening = async () => {
    // Reset balloon visual
    const lvl = getBalloonLevel(currentLevelIndex) || BALLOON_LEVELS[0];
    balloonScale.value = lvl.initialScale;
    balloonOpacity.value = 1;
    setGameState("listening");
    setIsBlowing(false);
    volumeRef.current = 0;

    // Start UI loop immediately
    startGameTick();

    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        console.warn("Mic permission denied, playing in simulator/fallback mode.");
        // Auto-simulation: oscillate mock volume so balloon expands steadily
        let simTime = 0;
        const simInterval = setInterval(() => {
          if (stateRef.current !== "listening") {
            clearInterval(simInterval);
            return;
          }
          simTime += 0.2;
          // Simulate blowing in waves (active for 2s, silent for 1s)
          const isBlowingSim = Math.sin(simTime) > -0.3;
          volumeRef.current = isBlowingSim ? 0.45 + Math.random() * 0.15 : 0;
        }, 150);
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      // Simple callback to update volume level
      const onStatusUpdate = (status: any) => {
        if (status.isRecording && status.metering !== undefined) {
          const db = status.metering;
          // Map decibels (-160 to 0) into 0..1 scale. Standard loud speech is around -20dB to -3dB.
          // Floor speaking noise at -45dB
          const mappedVol = Math.max(0, Math.min(1, (db + 45) / 40));
          volumeRef.current = mappedVol;
        }
      };

      // Create and start recording in single step
      const { recording } = await Audio.Recording.createAsync(
        {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        },
        onStatusUpdate,
        60 // check every 60ms
      );
      recordingRef.current = recording;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (err) {
      console.warn("Failed to start mic recording:", err);
      // Fail gracefully: simulate steady inflation so it is playable on simulator/web
      let simTime = 0;
      const simInterval = setInterval(() => {
        if (stateRef.current !== "listening") {
          clearInterval(simInterval);
          return;
        }
        simTime += 0.2;
        const isBlowingSim = Math.sin(simTime) > -0.3;
        volumeRef.current = isBlowingSim ? 0.5 : 0;
      }, 150);
    }
  };

  // ── STOP LISTENING ──
  const stopListening = async () => {
    setGameState("idle");
    setIsBlowing(false);
    volumeRef.current = 0;

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

    // Return visual scale back to initial
    const lvl = getBalloonLevel(levelRef.current) || BALLOON_LEVELS[0];
    balloonScale.value = withTiming(lvl.initialScale, { duration: 300 });
  };

  // ── LEVEL MANAGEMENT ──
  const resetLevel = (idx: number) => {
    const lvl = getBalloonLevel(idx) || BALLOON_LEVELS[0];
    setGameState("idle");
    setIsBlowing(false);
    setShowConfetti(false);
    volumeRef.current = 0;
    balloonScale.value = lvl.initialScale;
    balloonOpacity.value = 1;
    mascotScale.value = 1;

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
      setUser({ balloonGameLevel: next + 1 });
    }
  };

  const handleFinish = () => {
    setUser({ balloonGameLevel: totalLevels });
    router.back();
  };

  // ── ANIMATED STYLES ──
  const balloonAnimStyle = useAnimatedStyle(() => ({
    opacity: balloonOpacity.value,
    transform: [
      { scale: balloonScale.value },
      { rotate: `${balloonRotate.value}deg` },
    ],
  }));

  const mascotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mascotScale.value }],
  }));

  const actionBtnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: actionBtnPulse.value }],
  }));

  // ── BACK NAV BAR BUTTON ──
  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="Go back"
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
      }]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title="Balloon Blowing"
      subtitle="Blow into the mic to inflate!"
      accent="orange"
      topNavBar={backButton}
      hideTabBarClearance
    >
      <View style={{ flex: 1, justifyContent: "space-between", minHeight: 520 }}>
        {/* Header section */}
        <View className="gap-2">
          <LevelHeader levelNumber={currentLevelIndex + 1} totalLevels={totalLevels} letter="" />
          <View style={s.levelBadge}>
            <Text style={s.levelBadgeText}>{currentLevel.label}</Text>
          </View>
        </View>

        {/* Center Balloon Area */}
        <View style={s.balloonArea}>
          {/* Confetti Explosion Layer */}
          {showConfetti && (
            <View style={s.confettiWrap}>
              {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
                <ConfettiPiece key={i} index={i} active={showConfetti} />
              ))}
            </View>
          )}

          {gameState !== "popped" ? (
            <Animated.View style={[s.balloonWrap, balloonAnimStyle]}>
              <BalloonShape color={currentLevel.color} size={BALLOON_BASE} isBlowing={isBlowing} />
            </Animated.View>
          ) : (
            <View style={s.popWrap}>
              <Text style={s.popText}>POP! 💥</Text>
              <Text style={s.popSub}>Splendid! 🎉</Text>
            </View>
          )}
        </View>

        {/* Character Reaction Mascot */}
        <Animated.View style={[mascotAnimStyle, { marginBottom: 4 }]}>
          <TalkyMascot
            state={gameState === "popped" ? "completed" : gameState === "listening" ? "recording" : "idle"}
            label={gameState === "popped" ? "POP!" : gameState === "listening" ? "Blow!" : "🎈"}
          />
        </Animated.View>

        {/* Footer controls */}
        <View className="gap-4" style={{ paddingBottom: 8 }}>
          {gameState !== "popped" ? (
            <Animated.View style={actionBtnAnimStyle}>
              <Pressable
                onPress={gameState === "listening" ? stopListening : startListening}
                accessibilityRole="button"
                accessibilityLabel={gameState === "listening" ? "Stop listening" : "Start blowing game"}
              >
                {({ pressed }) => {
                  const isListen = gameState === "listening";
                  const shadowColor = isListen ? "#A22929" : "#E68600";
                  const faceColor = isListen ? palette.red : palette.orange;

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
              <Text style={s.poppedText}>🎈 BALLOON POPPED! 🎈</Text>
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
    backgroundColor: palette.orangeLight,
    paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1.5, borderColor: palette.orange,
    marginTop: 10,
    marginBottom: 6,
  },
  levelBadgeText: {
    fontFamily: fonts.displaySemi, fontSize: 14,
    color: palette.orange, textAlign: "center",
  },
  balloonArea: {
    flex: 1, alignItems: "center", justifyContent: "center", minHeight: 250,
    marginVertical: 16,
  },
  balloonWrap: { alignItems: "center", justifyContent: "center" },
  confettiWrap: {
    position: "absolute", alignItems: "center", justifyContent: "center",
    width: 1, height: 1, zIndex: 20,
  },
  popWrap: { alignItems: "center", gap: 4 },
  popText: { fontFamily: fonts.displayBold, fontSize: 42, color: palette.orange, textAlign: "center" },
  popSub: { fontFamily: fonts.displaySemi, fontSize: 18, color: palette.textSecondary, textAlign: "center" },
  btnOuter: { position: "relative", height: 76, width: 76, alignSelf: "center" },
  btnShadow: { position: "absolute", left: 0, right: 0, bottom: 0, height: 72, borderRadius: 38 },
  btnFace: {
    position: "absolute", left: 0, right: 0, height: 70, borderRadius: 38,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  poppedBanner: {
    backgroundColor: palette.orangeLight, paddingVertical: 14, paddingHorizontal: 24,
    borderRadius: 18, borderWidth: 2, borderColor: palette.orange, alignItems: "center",
  },
  poppedText: { fontFamily: fonts.displayBold, fontSize: 17, color: palette.orange },
});
