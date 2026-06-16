import { router } from "expo-router";
import { Award, Calendar, ChevronLeft, Target } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { palette } from "@/lib/theme";

type StatCardProps = {
  value: string;
  label: string;
  color: string;
};

function StatCard({ value, label, color }: StatCardProps) {
  return (
    <View className="flex-1 items-center rounded-2xl border-2 border-tk-border bg-tk-surface py-4 px-2">
      <Text
        style={{
          fontFamily: "Cairo_700Bold",
          fontSize: 28,
          color,
          lineHeight: 34,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Cairo_400Regular",
          fontSize: 12,
          color: palette.textMuted,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

type NavCardProps = {
  icon: typeof Target;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
  onPress: () => void;
};

function NavCard({ icon: Icon, title, description, iconColor, iconBg, onPress }: NavCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            padding: 16,
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: iconBg,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={26} color={iconColor} strokeWidth={2.25} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Cairo_700Bold",
                fontSize: 16,
                color: palette.text,
                textAlign: "left",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: "Cairo_400Regular",
                fontSize: 13,
                color: palette.textMuted,
                textAlign: "left",
                marginTop: 2,
              }}
            >
              {description}
            </Text>
          </View>
          <ChevronLeft size={20} color={palette.textMuted} />
        </View>
      </Card>
    </Pressable>
  );
}

export default function StatsScreen() {
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

  const minutesPlayed = totalLevels * 5;
  const goalsMet = Math.floor(totalLevels / 3);

  const gamesStarted = [
    user.lettersGameLevel,
    user.balloonGameLevel,
    user.candlesGameLevel,
    user.questionsColorsLevel,
    user.questionsSizesLevel,
    user.questionsPlacesLevel,
    user.questionsInteractiveLevel,
    user.videoQuestionsGameLevel,
  ].filter((l) => l > 0).length;

  return (
    <ScreenShell
      title="الإحصائيات"
      subtitle={`تقدّم ${user.name}`}
      accent="blue"
    >
      <View className="-mt-2 gap-4">
        {/* Top stat cards */}
        <View style={{ flexDirection: "row-reverse", gap: 10 }}>
          <StatCard
            value={String(user.streakDays)}
            label="يوم متتالي"
            color={palette.orange}
          />
          <StatCard
            value={String(minutesPlayed)}
            label="دقيقة تدريب"
            color={palette.blue}
          />
          <StatCard
            value={String(goalsMet)}
            label="هدف محقق"
            color={palette.green}
          />
        </View>

        {/* Quick summary card */}
        <Card>
          <View
            style={{
              padding: 16,
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text
                style={{
                  fontFamily: "Cairo_700Bold",
                  fontSize: 22,
                  color: palette.purple,
                }}
              >
                {gamesStarted}
              </Text>
              <Text
                style={{
                  fontFamily: "Cairo_400Regular",
                  fontSize: 12,
                  color: palette.textMuted,
                  textAlign: "center",
                }}
              >
                ألعاب جُرِّبت
              </Text>
            </View>
            <View
              style={{ width: 1, backgroundColor: palette.border, marginVertical: 4 }}
            />
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text
                style={{
                  fontFamily: "Cairo_700Bold",
                  fontSize: 22,
                  color: palette.blue,
                }}
              >
                {totalLevels}
              </Text>
              <Text
                style={{
                  fontFamily: "Cairo_400Regular",
                  fontSize: 12,
                  color: palette.textMuted,
                  textAlign: "center",
                }}
              >
                مستوى أُنجز
              </Text>
            </View>
            <View
              style={{ width: 1, backgroundColor: palette.border, marginVertical: 4 }}
            />
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text
                style={{
                  fontFamily: "Cairo_700Bold",
                  fontSize: 22,
                  color: palette.green,
                }}
              >
                {user.streakDays}
              </Text>
              <Text
                style={{
                  fontFamily: "Cairo_400Regular",
                  fontSize: 12,
                  color: palette.textMuted,
                  textAlign: "center",
                }}
              >
                أيام نشاط
              </Text>
            </View>
          </View>
        </Card>

        {/* Section label */}
        <Text
          style={{
            fontFamily: "Cairo_600SemiBold",
            fontSize: 14,
            color: palette.textMuted,
            textAlign: "right",
            paddingHorizontal: 4,
          }}
        >
          استكشف التفاصيل
        </Text>

        {/* Nav cards */}
        <NavCard
          icon={Target}
          title="المهام الأسبوعية"
          description={`${totalLevels} مهمة منجزة هذا الأسبوع`}
          iconColor={palette.green}
          iconBg={palette.greenLight}
          onPress={() => router.push("/tasks")}
        />
        <NavCard
          icon={Calendar}
          title="سجل التدريبات"
          description={
            user.lastPracticeDate
              ? `آخر تدريب: ${new Date(user.lastPracticeDate).toLocaleDateString("ar-DZ")}`
              : "ابدأ التدريب لتظهر سجلاتك هنا"
          }
          iconColor={palette.blue}
          iconBg={palette.blueLight}
          onPress={() => router.push("/history")}
        />
        <NavCard
          icon={Award}
          title="الإنجازات"
          description={`${goalsMet} إنجاز محقق — استمر!`}
          iconColor={palette.purple}
          iconBg={palette.purpleLight}
          onPress={() => router.push("/accomplishments")}
        />
      </View>
    </ScreenShell>
  );
}