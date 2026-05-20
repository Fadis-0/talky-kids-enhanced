import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Flame, Mic, Sparkles, Type } from "lucide-react-native";
import { useCallback } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { TopNavBar } from "@/components/navigation/TopNavBar";
import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { EmptyStateCard } from "@/components/ui/EmptyStateCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

function StreakBadge({ streak }: { streak: number }) {
  const scaleAnim = useSharedValue(0.8);

  const streakAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  useFocusEffect(
    useCallback(() => {
      scaleAnim.value = 0.8;
      scaleAnim.value = withSpring(1, {
        damping: 6,
        mass: 0.6,
        overshootClamping: false,
      });
    }, [scaleAnim])
  );

  return (
    <Animated.View style={[{ width: "100%" }, streakAnimStyle]}>
      <View className="flex-row items-center justify-center gap-2 rounded-full border-2 border-tk-border bg-tk-surface px-4 py-2.5">
        <Flame size={22} color={palette.orange} fill={palette.orangeLight} />
        <Text
          style={{
            fontFamily: "Fredoka_700Bold",
            fontSize: 16,
            color: palette.orange,
          }}
        >
          {streak} Day Streak
        </Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const { user } = useUserData();

  return (
    <ScreenShell
      title="Ready to practice?"
      subtitle="Warm up your voice with fun mouth and speaking games."
      accent="green"
      topNavBar={<TopNavBar userName={user.name} onProfilePress={() => router.push(Routes.settings)} />}
      headerRight={<StreakBadge streak={user.streakDays} />}
    >
      <View className="-mt-2 gap-4">
        <Card className="overflow-hidden border-tk-green p-0">
          <View className="bg-tk-green-light px-5 py-4">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-green">
                <Mic size={26} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View className="flex-1">
                <Text variant="label" className="text-tk-green-dark">
                  Daily practice
                </Text>
                <Text variant="title" className="text-lg">
                  Start a session
                </Text>
              </View>
              <Sparkles size={22} color={palette.green} />
            </View>
          </View>
          <View className="gap-3 p-5">
            <Text variant="body">
              Games for speaking and mouth movements are on the way. Tap below to
              preview the flow.
            </Text>
            <PrimaryButton
              label="CONTINUE"
              color="green"
              accessibilityLabel="Continue to practice"
            />
          </View>
        </Card>

        <Text variant="label" className="px-1">
          Explore Games
        </Text>

        <EmptyStateCard
          icon={Type}
          title="Letters Game"
          description="Learn the 26 letters of the alphabet with fun sounds and interactions!"
          iconColor={palette.purple}
          iconBg={palette.purpleLight}
          onPress={() => router.push(Routes.lettersGame)}
        />
      </View>
    </ScreenShell>
  );
}
