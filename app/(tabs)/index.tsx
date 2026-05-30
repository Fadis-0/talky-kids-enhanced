import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Flame, Mic, Sparkles, Type, Video, Wind } from "lucide-react-native";
import { useCallback } from "react";
import { Pressable, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { TopNavBar } from "@/components/navigation/TopNavBar";
import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
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
      topNavBar={<TopNavBar userName={user.name} gender={user.gender} onProfilePress={() => router.push(Routes.settings)} />}
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

        <Pressable
          onPress={() => router.push(Routes.lettersGame)}
          accessibilityRole="button"
          accessibilityLabel="Play Letters Game"
        >
          {({ pressed }: { pressed: boolean }) => {
            const progressPercent = Math.max(5, (user.lettersGameLevel / 26) * 100);
            
            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-purple`}>
                  <View className="flex-row items-center justify-between bg-tk-purple-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-purple">
                        <Type size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text variant="title" className="text-lg">
                          Letters Game
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.purple,
                            marginTop: 2,
                          }}
                        >
                          {user.lettersGameLevel === 0
                            ? "Not started yet"
                            : user.lettersGameLevel >= 26
                              ? "Completed! 🎉"
                              : `Level ${user.lettersGameLevel} of 26`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View className="gap-4 p-5">
                    <Text variant="body">
                      Learn the 26 letters of the alphabet with fun sounds and interactions!
                    </Text>
                    
                    {/* Progress Bar Container */}
                    <View className="h-4 w-full overflow-hidden rounded-full bg-[#F3E8FF]">
                      <Animated.View
                        className="h-full rounded-full bg-tk-purple"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </View>
                  </View>
                </Card>
              </Animated.View>
            );
          }}
        </Pressable>

        <Pressable
          onPress={() => router.push(Routes.videoQuestionsGame)}
          accessibilityRole="button"
          accessibilityLabel="Play Video Questions Game"
        >
          {({ pressed }: { pressed: boolean }) => {
            const videoProgressPercent = Math.max(5, (user.videoQuestionsGameLevel / 8) * 100);
            
            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-blue`}>
                  <View className="flex-row items-center justify-between bg-tk-blue-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-blue">
                        <Video size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text variant="title" className="text-lg">
                          Video Questions
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.blue,
                            marginTop: 2,
                          }}
                        >
                          {user.videoQuestionsGameLevel === 0
                            ? "Not started yet"
                            : user.videoQuestionsGameLevel >= 8
                              ? "Completed! 🎉"
                              : `Level ${user.videoQuestionsGameLevel} of 8`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View className="gap-4 p-5">
                    <Text variant="body">
                      Watch videos and GIFs, then answer questions with your voice!
                    </Text>
                    
                    {/* Progress Bar Container */}
                    <View className="h-4 w-full overflow-hidden rounded-full bg-[#DDF4FF]">
                      <Animated.View
                        className="h-full rounded-full bg-tk-blue"
                        style={{ width: `${videoProgressPercent}%` }}
                      />
                    </View>
                  </View>
                </Card>
              </Animated.View>
            );
          }}
        </Pressable>

        <Pressable
          onPress={() => router.push(Routes.balloonGame)}
          accessibilityRole="button"
          accessibilityLabel="Play Balloon Blowing Game"
        >
          {({ pressed }: { pressed: boolean }) => {
            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-orange`}>
                  <View className="flex-row items-center justify-between bg-tk-orange-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-orange">
                        <Wind size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text variant="title" className="text-lg">
                          Balloon Blowing
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.orange,
                            marginTop: 2,
                          }}
                        >
                          Not started yet
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View className="gap-4 p-5">
                    <Text variant="body">
                      Blow air to inflate balloons and have fun with breathing exercises!
                    </Text>
                  </View>
                </Card>
              </Animated.View>
            );
          }}
        </Pressable>

        <Pressable
          onPress={() => router.push(Routes.candlesGame)}
          accessibilityRole="button"
          accessibilityLabel="Play Candles Blowing Game"
        >
          {({ pressed }: { pressed: boolean }) => {
            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-red`}>
                  <View className="flex-row items-center justify-between bg-tk-red-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-red">
                        <Flame size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text variant="title" className="text-lg">
                          Candles Blowing
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.red,
                            marginTop: 2,
                          }}
                        >
                          Not started yet
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View className="gap-4 p-5">
                    <Text variant="body">
                      Blow out the candles while practicing controlled breathing!
                    </Text>
                  </View>
                </Card>
              </Animated.View>
            );
          }}
        </Pressable>
      </View>
    </ScreenShell>
  );
}
