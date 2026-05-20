import { LinearGradient } from "expo-linear-gradient";
import { Mic } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui/Text";
import { fonts, palette } from "@/lib/theme";

const SPLASH_MS = 2800;

type AnimatedSplashProps = {
  onFinish: () => void;
};

export function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const logoScale = useSharedValue(0.4);
  const logoY = useSharedValue(24);
  const ringScale = useSharedValue(0.7);
  const ringOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);
  const bounce = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 12, stiffness: 150 });
    logoY.value = withSpring(0, { damping: 14, stiffness: 170 });
    ringOpacity.value = withDelay(150, withTiming(1, { duration: 350 }));
    ringScale.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(1.12, { duration: 850, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 850, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
    textOpacity.value = withDelay(400, withTiming(1, { duration: 450 }));
    bounce.value = withDelay(
      450,
      withRepeat(
        withSequence(
          withTiming(-5, { duration: 380 }),
          withTiming(0, { duration: 380 }),
        ),
        3,
        true,
      ),
    );

    const finish = () => onFinishRef.current();
    const timer = setTimeout(() => {
      containerOpacity.value = withTiming(0, { duration: 400 }, (done) => {
        if (done) runOnJS(finish)();
      });
    }, SPLASH_MS);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoY.value + bounce.value },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value * 0.3,
    transform: [{ scale: ringScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: (1 - textOpacity.value) * 10 }],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, containerStyle]}>
      <LinearGradient
        colors={[palette.greenLight, palette.blueLight, palette.background]}
        style={StyleSheet.absoluteFill}
      >
        <View style={styles.center}>
          <Animated.View style={[styles.ring, ringStyle]} />
          <Animated.View style={[styles.logoWrap, logoStyle]}>
            <View style={styles.logo}>
              <Mic size={48} color={palette.textOnPrimary} strokeWidth={2.5} />
            </View>
          </Animated.View>
          <Animated.View style={[styles.textBlock, textStyle]}>
            <Text style={styles.title}>Talky Kids</Text>
            <Text style={styles.tagline}>Practice speaking, play, and grow</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  ring: {
    position: "absolute",
    width: 188,
    height: 188,
    borderRadius: 94,
    backgroundColor: palette.green,
  },
  logoWrap: {
    marginBottom: 24,
    zIndex: 2,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: palette.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: palette.greenDark,
  },
  textBlock: {
    alignItems: "center",
    zIndex: 2,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 34,
    color: palette.text,
    textAlign: "center",
    padding: 10,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
});