import { Award, Calendar, Target } from "lucide-react-native";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { ScreenShell } from "@/components/ScreenShell";
import { EmptyStateCard } from "@/components/ui/EmptyStateCard";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";

export default function StatsScreen() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user } = useUserData();

  const totalLevels = 
    user.lettersGameLevel +
    user.videoQuestionsGameLevel +
    user.balloonGameLevel +
    user.candlesGameLevel +
    user.questionsPlacesLevel +
    user.questionsSizesLevel +
    user.questionsColorsLevel +
    user.questionsInteractiveLevel;

  const minutesPlayed = totalLevels * 5; // roughly 5 mins per level completed
  const goalsMet = Math.floor(totalLevels / 3); // arbitrarily every 3 levels is a goal

  return (
    <ScreenShell
      title={t("tabs.stats.title")}
      subtitle={t("tabs.stats.subtitle")}
      accent="blue"
    >
      <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="-mt-2 gap-4">
        <View className="flex-row gap-3">
          {[
            { value: String(user.streakDays), label: t("tabs.stats.dayStreak"), color: palette.orange },
            { value: String(minutesPlayed), label: t("tabs.stats.minutes"), color: palette.blue },
            { value: String(goalsMet), label: t("tabs.stats.goalsMet"), color: palette.green },
          ].map((stat) => (
            <View
              key={stat.label}
              className="flex-1 items-center rounded-2xl border-2 border-tk-border bg-tk-surface py-4"
            >
              <Text
                style={{
                  fontFamily: isRTL ? "Cairo_700Bold" : "Fredoka_700Bold",
                  fontSize: 26,
                  color: stat.color,
                }}
              >
                {stat.value}
              </Text>
              <Text variant="caption" className="mt-1 text-center">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="label" className="px-1">
          {t("tabs.stats.insights")}
        </Text>

        <EmptyStateCard
          icon={Target}
          title={t("tabs.stats.weeklyGoalsTitle")}
          description={`${totalLevels} completed tasks out of 10 this week! Keep it up.`}
          iconColor={palette.green}
          iconBg={palette.greenLight}
        />

        {totalLevels > 0 ? (
          <EmptyStateCard
            icon={Calendar}
            title={t("tabs.stats.practiceHistoryTitle")}
            description={`Practiced recently on ${user.lastPracticeDate ? new Date(user.lastPracticeDate).toLocaleDateString() : 'today'}.`}
            iconColor={palette.blue}
            iconBg={palette.blueLight}
          />
        ) : (
          <EmptyStateCard
            icon={Calendar}
            title={t("tabs.stats.practiceHistoryTitle")}
            description={t("tabs.stats.practiceHistoryDesc")}
            iconColor={palette.blue}
            iconBg={palette.blueLight}
          />
        )}

        {totalLevels > 0 ? (
          <EmptyStateCard
            icon={Award}
            title={t("tabs.stats.achievementsTitle")}
            description={`You have reached level ${user.balloonGameLevel} in Balloon Game and level ${user.candlesGameLevel} in Candles Game!`}
            iconColor={palette.purple}
            iconBg={palette.purpleLight}
          />
        ) : (
          <EmptyStateCard
            icon={Award}
            title={t("tabs.stats.achievementsTitle")}
            description={t("tabs.stats.achievementsDesc")}
            iconColor={palette.purple}
            iconBg={palette.purpleLight}
          />
        )}
      </View>
    </ScreenShell>
  );
}