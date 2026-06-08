import { Award, Calendar, Target } from "lucide-react-native";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { ScreenShell } from "@/components/ScreenShell";
import { EmptyStateCard } from "@/components/ui/EmptyStateCard";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StatsScreen() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <ScreenShell
      title={t("tabs.stats.title")}
      subtitle={t("tabs.stats.subtitle")}
      accent="blue"
    >
      <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="-mt-2 gap-4">
        <View className="flex-row gap-3">
          {[
            { value: "0", label: t("tabs.stats.dayStreak"), color: palette.orange },
            { value: "0", label: t("tabs.stats.minutes"), color: palette.blue },
            { value: "0", label: t("tabs.stats.goalsMet"), color: palette.green },
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
          description={t("tabs.stats.weeklyGoalsDesc")}
          iconColor={palette.green}
          iconBg={palette.greenLight}
        />
        <EmptyStateCard
          icon={Calendar}
          title={t("tabs.stats.practiceHistoryTitle")}
          description={t("tabs.stats.practiceHistoryDesc")}
          iconColor={palette.blue}
          iconBg={palette.blueLight}
        />
        <EmptyStateCard
          icon={Award}
          title={t("tabs.stats.achievementsTitle")}
          description={t("tabs.stats.achievementsDesc")}
          iconColor={palette.purple}
          iconBg={palette.purpleLight}
        />
      </View>
    </ScreenShell>
  );
}