import { Award, Calendar, Target } from "lucide-react-native";
import { View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { EmptyStateCard } from "@/components/ui/EmptyStateCard";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

export default function StatsScreen() {
  return (
    <ScreenShell
      title="Your progress"
      subtitle="Track streaks, minutes practiced, and milestones."
      accent="blue"
    >
      <View className="-mt-2 gap-4">
        <View className="flex-row gap-3">
          {[
            { value: "0", label: "Day streak", color: palette.orange },
            { value: "0", label: "Minutes", color: palette.blue },
            { value: "0", label: "Goals met", color: palette.green },
          ].map((stat) => (
            <View
              key={stat.label}
              className="flex-1 items-center rounded-2xl border-2 border-tk-border bg-tk-surface py-4"
            >
              <Text
                style={{
                  fontFamily: "Fredoka_700Bold",
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

        <Text variant="label" className="px-1">
          Insights
        </Text>

        <EmptyStateCard
          icon={Target}
          title="Weekly goals"
          description="Set gentle targets that fit your child's pace."
          iconColor={palette.green}
          iconBg={palette.greenLight}
        />
        <EmptyStateCard
          icon={Calendar}
          title="Practice history"
          description="See which days you showed up — celebrate small wins."
          iconColor={palette.blue}
          iconBg={palette.blueLight}
        />
        <EmptyStateCard
          icon={Award}
          title="Achievements"
          description="Badges and rewards will unlock as you play."
          iconColor={palette.purple}
          iconBg={palette.purpleLight}
        />
      </View>
    </ScreenShell>
  );
}