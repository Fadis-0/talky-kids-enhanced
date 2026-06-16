import { router } from "expo-router";
import { ArrowRight, Calendar } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { palette } from "@/lib/theme";

type HistoryEntry = {
  game: string;
  emoji: string;
  level: number;
  color: string;
};

export default function HistoryScreen() {
  const { user } = useUserData();

  const allEntries: HistoryEntry[] = [
    { game: "لعبة الحروف", emoji: "📝", level: user.lettersGameLevel, color: palette.blue },
    { game: "لعبة البالون", emoji: "🎈", level: user.balloonGameLevel, color: palette.red },
    { game: "لعبة الشموع", emoji: "🕯️", level: user.candlesGameLevel, color: palette.orange },
    { game: "أسئلة الألوان", emoji: "🎨", level: user.questionsColorsLevel, color: palette.purple },
    { game: "أسئلة الأحجام", emoji: "📐", level: user.questionsSizesLevel, color: palette.green },
    { game: "أسئلة الأماكن", emoji: "🏠", level: user.questionsPlacesLevel, color: palette.orange },
    { game: "الأسئلة التفاعلية", emoji: "🎯", level: user.questionsInteractiveLevel, color: palette.blue },
    { game: "أسئلة الفيديو", emoji: "🎬", level: user.videoQuestionsGameLevel, color: palette.green },
  ].filter((e) => e.level > 0);

  const lastPracticeStr = user.lastPracticeDate
    ? new Date(user.lastPracticeDate).toLocaleDateString("ar-DZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;

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
              paddingBottom: 4,
              paddingTop: 4,
            }}
          >
            سجل التدريبات
          </Text>
          <Text
            style={{
              fontFamily: "Cairo_400Regular",
              fontSize: 13,
              color: palette.textMuted,
              textAlign: "left",
            }}
          >
            {allEntries.length > 0
              ? `${allEntries.length} ألعاب جرى تمرينها`
              : "لا توجد تمارين بعد"}
          </Text>
        </View>
      </View>

      {/* Last practice banner */}
      {lastPracticeStr && (
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Card>
            <View
              style={{
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: palette.blueLight,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar size={22} color={palette.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Cairo_600SemiBold",
                    fontSize: 14,
                    color: palette.text,
                    textAlign: "left",
                  }}
                >
                  آخر جلسة تدريب
                </Text>
                <Text
                  style={{
                    fontFamily: "Cairo_400Regular",
                    fontSize: 13,
                    color: palette.textMuted,
                    textAlign: "left",
                  }}
                >
                  {lastPracticeStr}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingBottom: 40 }}>
        {allEntries.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              paddingVertical: 60,
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 48 }}>📭</Text>
            <Text
              style={{
                fontFamily: "Cairo_600SemiBold",
                fontSize: 16,
                color: palette.textMuted,
                textAlign: "center",
              }}
            >
              لا يوجد سجل بعد
            </Text>
            <Text
              style={{
                fontFamily: "Cairo_400Regular",
                fontSize: 14,
                color: palette.textMuted,
                textAlign: "center",
              }}
            >
              ابدأ بممارسة الألعاب لتظهر هنا
            </Text>
          </View>
        ) : (
          allEntries.map((entry, i) => (
            <Card key={entry.game}>
              <View
                style={{
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* Rank */}
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: entry.color + "22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Cairo_700Bold",
                      fontSize: 12,
                      color: entry.color,
                    }}
                  >
                    {i + 1}
                  </Text>
                </View>



                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Cairo_600SemiBold",
                      fontSize: 15,
                      color: palette.text,
                      textAlign: "left",
                    }}
                  >
                    {entry.game}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Cairo_400Regular",
                      fontSize: 13,
                      color: entry.color,
                      textAlign: "left",
                    }}
                  >
                    وصل إلى المستوى {entry.level}
                  </Text>
                </View>


                {/* Emoji icon */}
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: palette.surface,
                    borderWidth: 2,
                    borderColor: entry.color + "55",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{entry.emoji}</Text>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
