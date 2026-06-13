import { useRouter } from "expo-router";
import { ChevronLeft, MapPin, Palette, Ruler, Sparkles } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
import {
  COLORS_LEVELS,
  INTERACTIVE_LEVELS,
  PLACES_LEVELS,
  SIZES_LEVELS,
} from "@/lib/questions-game-data";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

export default function QuestionsGameSelectorScreen() {
  const router = useRouter();
  const { user } = useUserData();
  const { isRTL } = useLanguage();

  const categories = [
    {
      id: "places",
      title: "الجهات والمواضع",
      description: "داخل، خارج، فوق، تحت... تدرّب على نطق وتحديد مكان الأشياء!",
      progress: user.questionsPlacesLevel,
      total: PLACES_LEVELS.length,
      route: Routes.questionsPlacesGame as any,
      color: "purple" as const,
      icon: MapPin,
      bgColor: palette.purpleLight,
      borderColor: palette.purple,
      borderClass: "border-tk-purple",
    },
    {
      id: "sizes",
      title: "الأحجام والمقاسات",
      description: "كبير، صغير، طويل، قصير... تعلّم مقارنة أحجام الأشياء المختلفة!",
      progress: user.questionsSizesLevel,
      total: SIZES_LEVELS.length,
      route: Routes.questionsSizesGame as any,
      color: "orange" as const,
      icon: Ruler,
      bgColor: palette.orangeLight,
      borderColor: palette.orange,
      borderClass: "border-tk-orange",
    },
    {
      id: "colors",
      title: "الألوان",
      description: "الأحمر، الأزرق، الأخضر... تعرّف على الألوان المختلفة واختر الإجابة الصحيحة!",
      progress: user.questionsColorsLevel,
      total: COLORS_LEVELS.length,
      route: Routes.questionsColorsGame as any,
      color: "blue" as const,
      icon: Palette,
      bgColor: palette.blueLight,
      borderColor: palette.blue,
      borderClass: "border-tk-blue",
    },
    {
      id: "interactive",
      title: "الأسئلة التفاعلية",
      description: "ضع الفاكهة في المحفظة... اسحب وأسقط الأشياء لحلّ الألغاز المسلية!",
      progress: user.questionsInteractiveLevel,
      total: INTERACTIVE_LEVELS.length,
      route: Routes.questionsInteractiveGame as any,
      color: "green" as const,
      icon: Sparkles,
      bgColor: palette.greenLight,
      borderColor: palette.green,
      borderClass: "border-tk-green",
    },
  ];

  const backButton = (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel="العودة"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [
        {
          width: 44,
          height: 44,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: palette.border,
          backgroundColor: palette.surface,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.8 : 1,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          zIndex: 10,
          transform: [{ scaleX: isRTL ? -1 : 1 }],
        },
      ]}
    >
      <ChevronLeft size={24} color={palette.text} />
    </Pressable>
  );

  return (
    <ScreenShell
      title="لعبة الذكاء والفهم"
      subtitle="اختر نوع اللعبة وابدأ في حل الأسئلة الممتعة!"
      accent="blue"
      topNavBar={backButton}
      hideTabBarClearance={true}
    >
      <View className="gap-4 mt-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isCompleted = category.progress >= category.total;
          const progressPercent = Math.max(5, (category.progress / category.total) * 100);

          return (
            <Pressable
              key={category.id}
              onPress={() => router.push(category.route)}
              accessibilityRole="button"
              accessibilityLabel={category.title}
              style={({ pressed }) => [
                {
                  transform: [{ translateY: pressed ? 2 : 0 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Card
                bordered={false}
                className={`overflow-hidden p-0 border-2 ${category.borderClass}`}
              >
                <View
                  className="flex-row items-center gap-3 p-4"
                  style={{
                    backgroundColor: category.bgColor,
                    flexDirection: isRTL ? "row" : "row",
                  }}
                >
                  <View
                    className="h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: category.borderColor }}
                  >
                    <IconComponent size={26} color="#FFFFFF" strokeWidth={2.5} />
                  </View>
                  <View className="flex-1 mr-2" style={{ alignItems: isRTL ? "flex-start" : "flex-start" }}>
                    <Text
                      variant="title"
                      className="text-lg"
                      style={{ textAlign: isRTL ? "left" : "left" }}
                    >
                      {category.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: isRTL ? "Cairo_600SemiBold" : "Fredoka_600SemiBold",
                        fontSize: 14,
                        color: category.borderColor,
                        marginTop: 2,
                      }}
                    >
                      {category.progress === 0
                        ? "لم تبدأ بعد"
                        : isCompleted
                          ? "مكتمل! 🎉"
                          : `المستوى ${category.progress} من ${category.total}`}
                    </Text>
                  </View>
                </View>

                <View className="gap-4 p-5" style={{ alignItems: isRTL ? "flex-start" : "flex-start" }}>
                  <Text
                    variant="body"
                    className="text-sm"
                    style={{ textAlign: isRTL ? "left" : "left", color: palette.text }}
                  >
                    {category.description}
                  </Text>

                  {/* Progress Bar */}
                  <View className="h-3.5 w-full overflow-hidden rounded-full bg-tk-border">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: category.borderColor,
                      }}
                    />
                  </View>
                </View>
              </Card>
            </Pressable>
          );
        })}
      </View>
    </ScreenShell>
  );
}
