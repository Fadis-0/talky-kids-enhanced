import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { massageReminders } from "@/lib/massage-reminders-data";
import { getFontForLanguage, palette } from "@/lib/theme";

export default function ReminderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();

  const reminder = massageReminders.find((r) => r.id === id);

  if (!reminder) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
        <Text>{t("common.notFound")}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { direction: isRTL ? "rtl" : "ltr", paddingTop: 16, flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.6 : 1, marginEnd: isRTL ? 0 : 12, marginStart: isRTL ? 12 : 0 },
          ]}
        >
          <ArrowLeft size={24} color={palette.text} strokeWidth={2.5} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              fontFamily: getFontForLanguage(language as any, "bold"),
              color: palette.text,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {reminder.emoji} {t(reminder.titleKey)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: reminder.backgroundColor, direction: isRTL ? "rtl" : "ltr" },
          ]}
        >
          <View style={[styles.timeContainer, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
            <Clock size={20} color={reminder.color} strokeWidth={2.5} />
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "bold"),
                fontSize: 16,
                fontWeight: "600",
                color: reminder.color,
                marginEnd: isRTL ? 0 : 8,
                marginStart: isRTL ? 8 : 0,
              }}
            >
              {reminder.time}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: getFontForLanguage(language as any, "regular"),
              fontSize: 13,
              color: palette.textSecondary,
              marginTop: 8,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t(reminder.descriptionKey)}
          </Text>
          <View
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: reminder.color + "30",
            }}
          >
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "bold"),
                fontSize: 13,
                fontWeight: "600",
                color: reminder.color,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              ⏱️ {t("reminders.massage.totalDuration")}
            </Text>
          </View>
        </View>

        {/* Steps */}
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontFamily: getFontForLanguage(language as any, "bold"),
              fontSize: 16,
              fontWeight: "600",
              color: palette.text,
              marginBottom: 16,
              marginHorizontal: 20,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            خطوات الجلسة
          </Text>

          {reminder.steps.map((step, index) => (
            <View
              key={step.id}
              style={[
                styles.stepCard,
                { direction: isRTL ? "rtl" : "ltr" },
              ]}
            >
              {/* Step Number Badge */}
              <View
                style={[
                  styles.stepBadge,
                  { backgroundColor: reminder.color + "20", marginEnd: isRTL ? 0 : 12, marginStart: isRTL ? 12 : 0 },
                ]}
              >
                <Text
                  style={{
                    fontFamily: getFontForLanguage(language as any, "bold"),
                    fontSize: 14,
                    fontWeight: "600",
                    color: reminder.color,
                  }}
                >
                  {step.id}
                </Text>
              </View>

              {/* Step Content */}
              <View style={styles.stepContent}>
                <Text
                  style={{
                    fontFamily: getFontForLanguage(language as any, "bold"),
                    fontSize: 14,
                    fontWeight: "600",
                    color: palette.text,
                    marginBottom: 6,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(step.titleKey)}
                </Text>
                <Text
                  style={{
                    fontFamily: getFontForLanguage(language as any, "regular"),
                    fontSize: 12,
                    color: palette.textSecondary,
                    lineHeight: 18,
                    marginBottom: 8,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(step.descriptionKey)}
                </Text>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Clock
                    size={14}
                    color={palette.textMuted}
                    strokeWidth={2.5}
                  />
                  <Text
                    style={{
                      fontFamily: getFontForLanguage(
                        language as any,
                        "regular"
                      ),
                      fontSize: 12,
                      color: palette.textMuted,
                      marginHorizontal: 6,
                    }}
                  >
                    {step.duration}
                  </Text>
                </View>
              </View>

              {/* Checkmark */}
              <CheckCircle
                size={24}
                color={reminder.color + "40"}
                strokeWidth={2}
                style={{ marginEnd: isRTL ? 12 : 0, marginStart: isRTL ? 0 : 12 }}
              />
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View
          style={[
            styles.tipsCard,
            { direction: isRTL ? "rtl" : "ltr" },
          ]}
        >
          <Text
            style={{
              fontFamily: getFontForLanguage(language as any, "bold"),
              fontSize: 14,
              fontWeight: "600",
              color: palette.text,
              marginBottom: 12,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            💡 نصائح مهمة
          </Text>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "regular"),
                fontSize: 12,
                color: palette.textSecondary,
                lineHeight: 18,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • كن صبوراً وحنوناً مع طفلك وتذكر أن النتيجة تأتي مع الممارسة المستمرة
            </Text>
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "regular"),
                fontSize: 12,
                color: palette.textSecondary,
                lineHeight: 18,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • جعل الجلسات ممتعة وتفاعلية - العبّر بصوت مرح وحماس
            </Text>
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "regular"),
                fontSize: 12,
                color: palette.textSecondary,
                lineHeight: 18,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • لا تجبر الطفل - إذا كان منزعجاً خذ فترة راحة وحاول لاحقاً
            </Text>
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "regular"),
                fontSize: 12,
                color: palette.textSecondary,
                lineHeight: 18,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • مارس الحركات معه حتى يرى كيفية القيام بها بشكل صحيح
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 12,
  },
  stepContent: {
    flex: 1,
  },
  tipsCard: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: palette.border,
  },
});
