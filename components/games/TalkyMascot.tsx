import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { fonts, palette } from "@/lib/theme";

type MascotState = "idle" | "selected" | "recording" | "completed";

type TalkyMascotProps = {
  state: MascotState;
  label?: string | null;
};

const AnimatedG = Animated.createAnimatedComponent(G);

export function TalkyMascot({ state, label }: TalkyMascotProps) {
  const { user, setUser } = useUserData();
  const gender = user.gender || "male"; // "male" = boy (Leo), "female" = girl (Mia)

  // Shared values for animations
  const bounceY = useSharedValue(0);
  const scale = useSharedValue(1);
  const blinkScaleY = useSharedValue(1);
  const wiggleRotation = useSharedValue(0);

  const toggleMascot = () => {
    setUser({ gender: gender === "male" ? "female" : "male" });
  };

  // Floating bounce animation
  useEffect(() => {
    bounceY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      blinkScaleY.value = withSequence(
        withTiming(0.1, { duration: 80 }),
        withTiming(1.0, { duration: 80 })
      );
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // State reactions
  useEffect(() => {
    if (state === "completed") {
      scale.value = withSequence(
        withTiming(1.15, { duration: 150 }),
        withSpring(1.0, { damping: 7 })
      );
      wiggleRotation.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 150 }),
          withTiming(10, { duration: 150 })
        ),
        6,
        true
      );
    } else if (state === "recording") {
      scale.value = withSpring(1.08);
      wiggleRotation.value = withSpring(0);
    } else if (state === "selected") {
      scale.value = withSequence(
        withTiming(1.05, { duration: 100 }),
        withSpring(1.0, { damping: 9 })
      );
      wiggleRotation.value = withSpring(0);
    } else {
      scale.value = withSpring(1.0);
      wiggleRotation.value = withSpring(0);
    }
  }, [state]);

  const animatedBodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }, { scale: scale.value }],
  }));

  const eyesProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 50 },
        { translateY: 50 },
        { scaleY: blinkScaleY.value },
        { translateX: -50 },
        { translateY: -50 },
      ] as any,
    };
  });

  const leftPigtailProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 25 },
        { translateY: 45 },
        { rotate: `${wiggleRotation.value}deg` },
        { translateX: -25 },
        { translateY: -45 },
      ] as any,
    };
  });

  const rightPigtailProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 75 },
        { translateY: 45 },
        { rotate: `${-wiggleRotation.value}deg` },
        { translateX: -75 },
        { translateY: -45 },
      ] as any,
    };
  });

  const getSpeechBubbleText = () => {
    const characterName = gender === "male" ? "Leo" : "Mia";
    switch (state) {
      case "recording":
        return `I'm listening! Say "${label}"... 🎙️`;
      case "completed":
        return "Awesome job! 🎉 Let's do the next one!";
      case "selected":
        return `Ready? Tap the mic and say "${label}"!`;
      case "idle":
      default:
        return `Hi, I'm ${characterName}! Tap an image to start!`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{getSpeechBubbleText()}</Text>
        </View>
        <View style={styles.bubbleArrow} />
      </View>

      <View style={styles.characterContainer}>
        <Animated.View style={[styles.mascotWrapper, animatedBodyStyle]}>
          <Svg width={140} height={140} viewBox="0 0 100 100">
            
            {/* --- GIRL PIGTAILS (Behind Head) --- */}
            {gender === "female" && (
              <G>
                <AnimatedG animatedProps={leftPigtailProps as any}>
                  <Ellipse cx="15" cy="55" rx="12" ry="16" fill="#EF6C00" />
                  <Circle cx="25" cy="45" r="4" fill="#E91E63" />
                </AnimatedG>
                <AnimatedG animatedProps={rightPigtailProps as any}>
                  <Ellipse cx="85" cy="55" rx="12" ry="16" fill="#EF6C00" />
                  <Circle cx="75" cy="45" r="4" fill="#E91E63" />
                </AnimatedG>
              </G>
            )}

            {/* --- HEAD/FACE BASE --- */}
            <Circle cx="50" cy="50" r="38" fill="#FFD5AE" />

            {/* --- CHEEKS --- */}
            <Circle cx="28" cy="60" r="6" fill="#FF4B4B" opacity="0.25" />
            <Circle cx="72" cy="60" r="6" fill="#FF4B4B" opacity="0.25" />

            {/* --- MOUTH --- */}
            {state === "recording" || state === "completed" ? (
              <Ellipse cx="50" cy="68" rx="6" ry="8" fill="#D84315" />
            ) : (
              <Path d="M42,65 Q50,72 58,65" fill="none" stroke="#D84315" strokeWidth="2.5" strokeLinecap="round" />
            )}

            {/* --- EYES --- */}
            <AnimatedG animatedProps={eyesProps as any}>
              <Circle cx="35" cy="46" r="8" fill="#3C3C3C" />
              <Circle cx="33" cy="44" r="3" fill="#FFFFFF" />
              
              <Circle cx="65" cy="46" r="8" fill="#3C3C3C" />
              <Circle cx="63" cy="44" r="3" fill="#FFFFFF" />
            </AnimatedG>

            {/* --- HAIR ON HEAD --- */}
            {gender === "male" ? (
              // Boy Hair (Leo) - spiky/messy on top
              <Path d="M12,45 C15,20 30,8 50,8 C70,8 85,20 88,45 Q70,25 50,28 Q30,25 12,45 Z" fill="#5D4037" />
            ) : (
              // Girl Hair (Mia) - bangs
              <Path d="M12,45 C15,20 30,8 50,8 C70,8 85,20 88,45 C75,35 60,35 50,38 C40,35 25,35 12,45 Z" fill="#EF6C00" />
            )}
            
            {/* Top Tuft/Cowlick */}
            {gender === "male" ? (
              <Path d="M45,8 Q50,0 55,8" fill="none" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
            ) : null}

            {/* --- HEADPHONES (when recording) --- */}
            {state === "recording" && (
              <G>
                <Path d="M18,50 C18,10 82,10 82,50" fill="none" stroke={gender === "male" ? "#1CB0F6" : "#FF4081"} strokeWidth="6" strokeLinecap="round" />
                <Circle cx="12" cy="50" r="10" fill={gender === "male" ? "#1899D6" : "#E91E63"} />
                <Circle cx="88" cy="50" r="10" fill={gender === "male" ? "#1899D6" : "#E91E63"} />
              </G>
            )}

            {/* --- PARTY HAT (when completed) --- */}
            {state === "completed" && (
              <G>
                <Path d="M35,25 L50,0 L65,25 Z" fill="#CE82FF" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
                <Circle cx="50" cy="0" r="6" fill="#FF9600" />
              </G>
            )}

          </Svg>
        </Animated.View>

        {/* Mascot Toggle Button */}
        <Pressable
          onPress={toggleMascot}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.toggleBtn,
            { transform: [{ translateY: pressed ? 2 : 0 }] },
          ]}
        >
          <View style={styles.toggleShadow} />
          <View style={styles.toggleFace}>
            <Text style={styles.toggleText}>
              {gender === "male" ? "👧 Switch to Mia" : "👦 Switch to Leo"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  bubbleContainer: {
    alignItems: "center",
    marginBottom: -4,
    maxWidth: "85%",
    zIndex: 5,
  },
  bubble: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 16,
    borderWidth: 2.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleText: {
    color: palette.text,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  bubbleArrow: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    height: 12,
    marginTop: -7,
    transform: [{ rotate: "45deg" }],
    width: 12,
    zIndex: 6,
  },
  characterContainer: {
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  mascotWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  toggleBtn: {
    position: "absolute",
    bottom: 5,
    right: 20,
    height: 28,
    width: 110,
    zIndex: 10,
  },
  toggleShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 26,
    borderRadius: 14,
    backgroundColor: palette.borderStrong,
  },
  toggleFace: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 24,
    borderRadius: 14,
    backgroundColor: palette.surface,
    borderWidth: 1.5,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    fontFamily: fonts.displayBold,
    fontSize: 9,
    color: palette.textSecondary,
    textAlign: "center",
  },
});
