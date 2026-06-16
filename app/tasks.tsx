import { router } from "expo-router";
import { ArrowRight, CheckCircle2, Circle, Trophy } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useUserData } from "@/contexts/UserDataContext";
import { palette } from "@/lib/theme";

type TaskItem = {
  title: string;
  description: string;
  current: number;
  target: number;
  color: string;
  emoji: string;
};

export default function TasksScreen() {
  const { user } = useUserData();

  const tasks: TaskItem[] = [
    {
      title: "لعبة الحروف",
      description: "تعلّم الحروف العربية خطوة بخطوة",
      current: user.lettersGameLevel,
      target: 5,
      color: palette.blue,
      emoji: "📝",
    },
    {
      title: "لعبة البالون",
      description: "انقح النطق مع البالونات المتطايرة",
      current: user.balloonGameLevel,
      target: 5,
      color: palette.red,
      emoji: "🎈",
    },
    {
      title: "لعبة الشموع",
      description: "تمارين النفس والنطق",
      current: user.candlesGameLevel,
      target: 5,
      color: palette.orange,
      emoji: "🕯️",
    },
    {
      title: "أسئلة الألوان",
      description: "تعرّف على الألوان بالعربية",
      current: user.questionsColorsLevel,
      target: 5,
      color: palette.purple,
      emoji: "🎨",
    },
    {
      title: "أسئلة الأحجام",
      description: "تعلّم الكبير والصغير",
      current: user.questionsSizesLevel,
      target: 5,
      color: palette.green,
      emoji: "📐",
    },
    {
      title: "أسئلة الأماكن",
      description: "اكتشف أسماء الأماكن",
      current: user.questionsPlacesLevel,
      target: 5,
      color: palette.orange,
      emoji: "🏠",
    },
    {
      title: "الأسئلة التفاعلية",
      description: "تحدّيات تفاعلية ممتعة",
      current: user.questionsInteractiveLevel,
      target: 5,
      color: palette.blue,
      emoji: "🎯",
    },
    {
      title: "أسئلة الفيديو",
      description: "تعلّم من خلال مقاطع الفيديو",
      current: user.videoQuestionsGameLevel,
      target: 5,
      color: palette.green,
      emoji: "🎬",
    },
  ];

  const completedCount = tasks.filter((t) => t.current >= t.target).length;

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
        <Pressable
          onPress={() => router.back()}
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
          <ArrowRight size={20} color={palette.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              fontSize: 22,
              paddingBottom: 4,
              paddingTop: 2,
              color: palette.text,
              textAlign: "left",
              marginLeft: 4
            }}
          >
            المهام الأسبوعية
          </Text>
          <Text
            style={{
              fontFamily: "Cairo_400Regular",
              fontSize: 13,
              color: palette.textMuted,
              textAlign: "left",
              marginLeft: 4
            }}
          >
            {completedCount} من {tasks.length} مهام مكتملة
          </Text>
        </View>
      </View>

      {/* Progress overview */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <Card>
          <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: palette.greenLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Trophy size={28} color={palette.green} />
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
                تقدّم {user.name} الأسبوعي
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
                    backgroundColor: palette.green,
                    width: `${Math.min((completedCount / tasks.length) * 100, 100)}%`,
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
                {Math.round((completedCount / tasks.length) * 100)}% مكتمل
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingBottom: 40 }}>
        {tasks.map((task) => {
          const isDone = task.current >= task.target;
          const progress = Math.min(task.current / task.target, 1);
          return (
            <Card key={task.title}>
              <View style={{ padding: 14 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: isDone ? palette.greenLight : palette.surface,
                      borderWidth: 2,
                      borderColor: isDone ? palette.green : palette.border,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{task.emoji}</Text>
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
                      {task.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Cairo_400Regular",
                        fontSize: 12,
                        color: palette.textMuted,
                        textAlign: "left",
                      }}
                    >
                      {task.description}
                    </Text>
                  </View>
                  {isDone ? (
                    <CheckCircle2 size={22} color={palette.green} />
                  ) : (
                    <Circle size={22} color={palette.textMuted} />
                  )}
                </View>
                {/* Progress bar */}
                <View
                  style={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: palette.border,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      borderRadius: 3,
                      backgroundColor: isDone ? palette.green : task.color,
                      width: `${progress * 100}%`,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Cairo_400Regular",
                    fontSize: 11,
                    color: palette.textMuted,
                    textAlign: "left",
                    marginLeft: 8,
                    marginTop: 4,
                  }}
                >
                  {task.current} / {task.target} مستويات
                </Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
