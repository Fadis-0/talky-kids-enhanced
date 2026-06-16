import { router } from "expo-router";
import { ArrowRight, Star } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { palette } from "@/lib/theme";

type Achievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  unlocked: boolean;
};

export default function AccomplishmentsScreen() {
  const { user } = useUserData();

  const totalLevels =
    user.lettersGameLevel +
    user.balloonGameLevel +
    user.candlesGameLevel +
    user.questionsColorsLevel +
    user.questionsSizesLevel +
    user.questionsPlacesLevel +
    user.questionsInteractiveLevel +
    user.videoQuestionsGameLevel;

  const achievements: Achievement[] = [
    {
      id: "first_step",
      title: "الخطوة الأولى",
      description: "أكمل أول مستوى في أي لعبة",
      emoji: "🌟",
      color: palette.orange,
      bgColor: palette.orangeLight,
      unlocked: totalLevels >= 1,
    },
    {
      id: "streak_3",
      title: "ثلاثة أيام متتالية",
      description: "تدرّب لمدة 3 أيام بدون انقطاع",
      emoji: "🔥",
      color: palette.red,
      bgColor: palette.redLight,
      unlocked: user.streakDays >= 3,
    },
    {
      id: "letters_master",
      title: "أستاذ الحروف",
      description: "أتقن لعبة الحروف كاملاً",
      emoji: "📝",
      color: palette.blue,
      bgColor: palette.blueLight,
      unlocked: user.lettersGameLevel >= 5,
    },
    {
      id: "balloon_pop",
      title: "بطل البالون",
      description: "أكمل جميع مستويات لعبة البالون",
      emoji: "🎈",
      color: palette.red,
      bgColor: palette.redLight,
      unlocked: user.balloonGameLevel >= 5,
    },
    {
      id: "candles_breath",
      title: "نفَس القوة",
      description: "أتقن لعبة الشموع بامتياز",
      emoji: "🕯️",
      color: palette.orange,
      bgColor: palette.orangeLight,
      unlocked: user.candlesGameLevel >= 5,
    },
    {
      id: "colors_expert",
      title: "خبير الألوان",
      description: "اجتز جميع مستويات أسئلة الألوان",
      emoji: "🎨",
      color: palette.purple,
      bgColor: palette.purpleLight,
      unlocked: user.questionsColorsLevel >= 5,
    },
    {
      id: "five_games",
      title: "المستكشف",
      description: "جرّب 5 مستويات في مختلف الألعاب",
      emoji: "🗺️",
      color: palette.green,
      bgColor: palette.greenLight,
      unlocked: totalLevels >= 5,
    },
    {
      id: "ten_levels",
      title: "المتقدّم",
      description: "أكمل 10 مستويات إجمالاً",
      emoji: "🏅",
      color: palette.blue,
      bgColor: palette.blueLight,
      unlocked: totalLevels >= 10,
    },
    {
      id: "streak_7",
      title: "أسبوع كامل",
      description: "تدرّب لمدة 7 أيام متتالية",
      emoji: "💪",
      color: palette.orange,
      bgColor: palette.orangeLight,
      unlocked: user.streakDays >= 7,
    },
    {
      id: "all_games",
      title: "بطل الجميع",
      description: "العب جميع الألعاب على الأقل مرة واحدة",
      emoji: "🏆",
      color: palette.orange,
      bgColor: palette.orangeLight,
      unlocked:
        user.lettersGameLevel > 0 &&
        user.balloonGameLevel > 0 &&
        user.candlesGameLevel > 0 &&
        user.questionsColorsLevel > 0 &&
        user.questionsSizesLevel > 0 &&
        user.questionsPlacesLevel > 0,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 16,
          gap: 12,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: palette.surface,
            borderWidth: 1.5,
            borderColor: palette.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowRight
            size={20}
            color={palette.text}
            onPress={() => router.back()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              fontSize: 22,
              color: palette.text,
              textAlign: "left",
              paddingBottom: 4
            }}
          >
            الإنجازات
          </Text>
          <Text
            style={{
              fontFamily: "Cairo_400Regular",
              fontSize: 13,
              color: palette.textMuted,
              textAlign: "left",
            }}
          >
            {unlockedCount} من {achievements.length} إنجازات مفتوحة
          </Text>
        </View>
      </View>

      {/* Trophy summary */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <Card>
          <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: palette.orangeLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Star size={28} color={palette.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Cairo_600SemiBold",
                  fontSize: 16,
                  color: palette.text,
                  textAlign: "left",
                }}
              >
                إنجازات {user.name}
              </Text>
              <View
                style={{
                  marginTop: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: palette.border,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    borderRadius: 4,
                    backgroundColor: palette.orange,
                    width: `${Math.round((unlockedCount / achievements.length) * 100)}%`,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Cairo_400Regular",
                  fontSize: 12,
                  color: palette.textMuted,
                  textAlign: "left",
                  marginTop: 4,
                }}
              >
                {Math.round((unlockedCount / achievements.length) * 100)}% مكتمل
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingBottom: 40 }}>
        {/* Unlocked first */}
        {achievements.filter((a) => a.unlocked).length > 0 && (
          <Text
            style={{
              fontFamily: "Cairo_600SemiBold",
              fontSize: 14,
              color: palette.textMuted,
              textAlign: "left",
              paddingHorizontal: 4,
              marginBottom: 4,
            }}
          >
            مفتوحة ✅
          </Text>
        )}
        {achievements
          .filter((a) => a.unlocked)
          .map((achievement) => (
            <Card key={achievement.id}>
              <View
                style={{
                  padding: 14,
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: achievement.bgColor,
                    borderWidth: 2,
                    borderColor: achievement.color + "55",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{achievement.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cairo_700Bold",
                      fontSize: 15,
                      color: palette.text,
                      textAlign: "left",
                    }}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Cairo_400Regular",
                      fontSize: 13,
                      color: palette.textMuted,
                      textAlign: "left",
                    }}
                  >
                    {achievement.description}
                  </Text>
                </View>
              </View>
            </Card>
          ))}

        {/* Locked */}
        {achievements.filter((a) => !a.unlocked).length > 0 && (
          <Text
            style={{
              fontFamily: "Cairo_600SemiBold",
              fontSize: 14,
              color: palette.textMuted,
              textAlign: "left",
              paddingHorizontal: 4,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            مقفلة 🔒
          </Text>
        )}
        {achievements
          .filter((a) => !a.unlocked)
          .map((achievement) => (
            <Card key={achievement.id} bordered>
              <View
                style={{
                  padding: 14,
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  gap: 12,
                  opacity: 0.4,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: palette.border,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 24 }}>🔒</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cairo_700Bold",
                      fontSize: 15,
                      color: palette.text,
                      textAlign: "left",
                    }}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Cairo_400Regular",
                      fontSize: 13,
                      color: palette.textMuted,
                      textAlign: "left",
                    }}
                  >
                    {achievement.description}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
