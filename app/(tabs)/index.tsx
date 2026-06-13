import { getTotalBalloonLevels } from "@/lib/balloon-game-data";
import { getTotalCandlesLevels } from "@/lib/candles-game-data";
import { getTotalLevels as getTotalLetterLevels } from "@/lib/letters-game-data";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { Flame, Mic, Sparkles, Type, Video, Wind } from "lucide-react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

function StreakBadge({ streak }: { streak: number }) {
  const scaleAnim = useSharedValue(0.8);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

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
            fontFamily: isRTL ? "Cairo_700Bold" : "Fredoka_700Bold",
            fontSize: 16,
            color: palette.orange,
          }}
        >
          {t("tabs.home.streakDay", { streak })}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const { user } = useUserData();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <ScreenShell
      title={t("tabs.home.title")}
      subtitle={t("tabs.home.subtitle")}
      accent="green"
      topNavBar={<TopNavBar userName={user.name} gender={user.gender} onProfilePress={() => router.push(Routes.settings)} />}
      headerRight={<StreakBadge streak={user.streakDays} />}
    >
      <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="-mt-2 gap-4">
        <Card className="overflow-hidden border-tk-green p-0">
          <View className="bg-tk-green-light px-5 py-4">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-green">
                <Mic size={26} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View className="flex-1">
                <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="label" className="text-tk-green-dark">
                  {t("tabs.home.dailyPractice")}
                </Text>
                <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="title" className="text-lg">
                  {t("tabs.home.startSession")}
                </Text>
              </View>
              <Sparkles size={22} color={palette.green} />
            </View>
          </View>
          <View className="gap-3 p-5">
            <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="body">
              {t("tabs.home.dailyDesc")}
            </Text>
            <PrimaryButton
              label={t("common.continue")}
              color="green"
              accessibilityLabel={t("accessibilityLabels.homeBtn")}
            />
          </View>
        </Card>

        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="label" className="px-1">
          {t("tabs.home.exploreGames")}
        </Text>

        <Pressable
          onPress={() => router.push(Routes.lettersGame)}
          accessibilityRole="button"
          accessibilityLabel={t("accessibilityLabels.lettersBtn")}
        >
          {({ pressed }: { pressed: boolean }) => {
            const letterTotal = getTotalLetterLevels();
            const progressPercent = Math.max(5, (user.lettersGameLevel / letterTotal) * 100);

            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-purple`}>
                  <View className="flex-row items-center justify-between bg-tk-purple-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-purple">
                        <Type size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="title" className="text-lg">
                          {t("tabs.home.lettersGame")}
                        </Text>
                        <Text
                          style={{
                            fontFamily: isRTL ? "Cairo_600SemiBold" : "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.purple,
                            marginTop: 2,
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          {user.lettersGameLevel === 0
                            ? t("tabs.home.notStarted")
                            : user.lettersGameLevel >= letterTotal
                              ? t("tabs.home.completed")
                              : t("games.letters.levelFormat", { level: user.lettersGameLevel, total: letterTotal })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="gap-4 p-5">
                    <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="body">
                      {t("tabs.home.lettersDesc")}
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
          onPress={() => router.push(Routes.videoQuestionsGame as any)}
          accessibilityRole="button"
          accessibilityLabel={isRTL ? "تشغيل لعبة الأسئلة والفهم" : "Play Questions Game"}
        >
          {({ pressed }: { pressed: boolean }) => {
            const totalQuestions = 13; // 4 places + 3 sizes + 3 colors + 3 interactive
            const completedQuestions =
              user.questionsPlacesLevel +
              user.questionsSizesLevel +
              user.questionsColorsLevel +
              user.questionsInteractiveLevel;
            const progressPercent = Math.max(5, (completedQuestions / totalQuestions) * 100);

            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-blue`}>
                  <View className="flex-row items-center justify-between bg-tk-blue-light p-4">
                    <View className="flex-row items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-blue">
                        <Sparkles size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View style={{ alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="title" className="text-lg">
                          {isRTL ? "لعبة الأسئلة والفهم" : "Questions & Cognitive Game"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: isRTL ? "Cairo_600SemiBold" : "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.blue,
                            marginTop: 2,
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          {completedQuestions === 0
                            ? (isRTL ? "لم تبدأ بعد" : "Not started")
                            : completedQuestions >= totalQuestions
                              ? (isRTL ? "مكتمل! 🎉" : "Completed! 🎉")
                              : isRTL
                                ? `المستوى ${completedQuestions} من ${totalQuestions}`
                                : `Level ${completedQuestions} of ${totalQuestions}`}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="gap-4 p-5" style={{ alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                    <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="body">
                      {isRTL
                        ? "ألعاب تفاعلية مسلية لتطوير النطق والذكاء والفهم البصري والسمعي!"
                        : "Fun interactive games to develop pronunciation, cognitive logic, visual and auditory understanding!"}
                    </Text>

                    {/* Progress Bar Container */}
                    <View className="h-4 w-full overflow-hidden rounded-full bg-[#DDF4FF]">
                      <Animated.View
                        className="h-full rounded-full bg-tk-blue"
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
          onPress={() => router.push(Routes.balloonGame)}
          accessibilityRole="button"
          accessibilityLabel="Play Balloon Blowing Game"
        >
          {({ pressed }: { pressed: boolean }) => {
            const balloonTotal = getTotalBalloonLevels();
            const balloonProgressPercent = Math.max(5, (user.balloonGameLevel / balloonTotal) * 100);

            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-orange`}>
                  <View className="flex-row items-center justify-between bg-tk-orange-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-orange">
                        <Wind size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="title" className="text-lg">
                          {t("tabs.home.balloonTitle")}
                        </Text>
                        <Text
                          style={{
                            fontFamily: isRTL ? "Cairo_600SemiBold" : "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.orange,
                            marginTop: 2,
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          {user.balloonGameLevel === 0
                            ? t("tabs.home.notStarted")
                            : user.balloonGameLevel >= balloonTotal
                              ? t("tabs.home.completed")
                              : t("games.levelHeader", { levelNumber: user.balloonGameLevel, totalLevels: balloonTotal })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="gap-4 p-5">
                    <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="body">
                      {t("tabs.home.balloonDesc")}
                    </Text>

                    {/* Progress Bar Container */}
                    <View className="h-4 w-full overflow-hidden rounded-full bg-[#FFF4E5]">
                      <Animated.View
                        className="h-full rounded-full bg-tk-orange"
                        style={{ width: `${balloonProgressPercent}%` }}
                      />
                    </View>
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
            const candlesTotal = getTotalCandlesLevels();
            const candlesProgressPercent = Math.max(5, (user.candlesGameLevel / candlesTotal) * 100);

            return (
              <Animated.View style={{ opacity: pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] }}>
                <Card className={`overflow-hidden p-0 border-tk-red`}>
                  <View className="flex-row items-center justify-between bg-tk-red-light p-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-red">
                        <Flame size={26} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View>
                        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="title" className="text-lg">
                          {t("tabs.home.candlesTitle")}
                        </Text>
                        <Text
                          style={{
                            fontFamily: isRTL ? "Cairo_600SemiBold" : "Fredoka_600SemiBold",
                            fontSize: 14,
                            color: palette.red,
                            marginTop: 2,
                            textAlign: isRTL ? 'right' : 'left',
                          }}
                        >
                          {user.candlesGameLevel === 0
                            ? t("tabs.home.notStarted")
                            : user.candlesGameLevel >= candlesTotal
                              ? t("tabs.home.completed")
                              : t("games.levelHeader", { levelNumber: user.candlesGameLevel, totalLevels: candlesTotal })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="gap-4 p-5">
                    <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="body">
                      {t("tabs.home.candlesDesc")}
                    </Text>

                    {/* Progress Bar Container */}
                    <View className="h-4 w-full overflow-hidden rounded-full bg-[#FFEBEB]">
                      <Animated.View
                        className="h-full rounded-full bg-tk-red"
                        style={{ width: `${candlesProgressPercent}%` }}
                      />
                    </View>
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