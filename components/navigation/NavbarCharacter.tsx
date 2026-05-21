import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

type NavbarCharacterProps = {
  gender?: "male" | "female" | null;
  size?: number;
};

export function NavbarCharacter({ gender = "male", size = 48 }: NavbarCharacterProps) {
  const bounceY = useSharedValue(0);
  const blinkScaleY = useSharedValue(1);
  const mouthScaleY = useSharedValue(1);
  const pigtailRotation = useSharedValue(0);

  // Floating bounce animation
  useEffect(() => {
    bounceY.value = withRepeat(
      withSequence(
        withTiming(-2.5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Periodic blinking and singing/talking
  useEffect(() => {
    // Blinking every 4 seconds
    const blinkInterval = setInterval(() => {
      blinkScaleY.value = withSequence(
        withTiming(0.1, { duration: 80 }),
        withTiming(1.0, { duration: 80 })
      );
    }, 4000);

    // Random singing/talking every 6 seconds
    const talkInterval = setInterval(() => {
      mouthScaleY.value = withSequence(
        withTiming(3, { duration: 150 }), // mouth opens
        withTiming(1, { duration: 150 }), // closes
        withTiming(2, { duration: 150 }), // opens a bit
        withTiming(1, { duration: 150 })  // closes
      );
      
      if (gender === "female") {
        pigtailRotation.value = withSequence(
          withTiming(-12, { duration: 200 }),
          withTiming(12, { duration: 200 }),
          withTiming(0, { duration: 200 })
        );
      }
    }, 6000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(talkInterval);
    };
  }, [gender]);

  const animatedBodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }],
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

  const mouthProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 50 },
        { translateY: 65 },
        { scaleY: mouthScaleY.value },
        { translateX: -50 },
        { translateY: -65 },
      ] as any,
    };
  });

  const leftPigtailProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 25 },
        { translateY: 45 },
        { rotate: `${pigtailRotation.value}deg` },
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
        { rotate: `${-pigtailRotation.value}deg` },
        { translateX: -75 },
        { translateY: -45 },
      ] as any,
    };
  });

  return (
    <Animated.View style={[{ width: size, height: size }, animatedBodyStyle]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        {/* --- GIRL PIGTAILS --- */}
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

        {/* --- HEAD BASE --- */}
        <Circle cx="50" cy="50" r="38" fill="#FFD5AE" />

        {/* --- CHEEKS --- */}
        <Circle cx="28" cy="60" r="6" fill="#FF4B4B" opacity="0.25" />
        <Circle cx="72" cy="60" r="6" fill="#FF4B4B" opacity="0.25" />

        {/* --- MOUTH (Animated Singing) --- */}
        <AnimatedG animatedProps={mouthProps as any}>
          <Path d="M42,65 Q50,70 58,65" fill="none" stroke="#D84315" strokeWidth="2.5" strokeLinecap="round" />
        </AnimatedG>

        {/* --- EYES (Blinking) --- */}
        <AnimatedG animatedProps={eyesProps as any}>
          <Circle cx="35" cy="46" r="8" fill="#3C3C3C" />
          <Circle cx="33" cy="44" r="3" fill="#FFFFFF" />
          
          <Circle cx="65" cy="46" r="8" fill="#3C3C3C" />
          <Circle cx="63" cy="44" r="3" fill="#FFFFFF" />
        </AnimatedG>

        {/* --- HAIR ON HEAD --- */}
        {gender === "male" ? (
          <Path d="M12,45 C15,20 30,8 50,8 C70,8 85,20 88,45 Q70,25 50,28 Q30,25 12,45 Z" fill="#5D4037" />
        ) : (
          <Path d="M12,45 C15,20 30,8 50,8 C70,8 85,20 88,45 C75,35 60,35 50,38 C40,35 25,35 12,45 Z" fill="#EF6C00" />
        )}
        
        {/* Top Tuft */}
        {gender === "male" ? (
          <Path d="M45,8 Q50,0 55,8" fill="none" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
        ) : null}
      </Svg>
    </Animated.View>
  );
}
