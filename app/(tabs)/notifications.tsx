import { router } from "expo-router";
import { ChevronLeft, MessageCircle, PartyPopper } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { massageReminders } from "@/lib/massage-reminders-data";
import { getFontForLanguage, palette } from "@/lib/theme";

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  return (
    <ScreenShell
      title={t("tabs.notifications.title")}
      subtitle={t("tabs.notifications.subtitle")}
      accent="purple"
    >
      <ScrollView
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        className="-mt-2"
        showsVerticalScrollIndicator={false}
      >
        {/* Massage Reminders Section */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: getFontForLanguage(language as any, "bold"),
              fontSize: 16,
              fontWeight: "600",
              color: palette.text,
              marginHorizontal: 20,
              marginBottom: 12,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            📋 تنبيهات التدليك
          </Text>

          {massageReminders.map((reminder) => (
            <Pressable
              key={reminder.id}
              onPress={() => router.push({ pathname: "/reminder-detail", params: { id: reminder.id } })}
              style={({ pressed }) => [
                styles.reminderCard,
                {
                  opacity: pressed ? 0.7 : 1,
                  backgroundColor: reminder.backgroundColor,
                  flexDirection: isRTL ? "row-reverse" : "row",
                },
              ]}
            >
              {/* Icon Circle */}
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: reminder.color + "20" },
                  { marginEnd: isRTL ? 0 : 12, marginStart: isRTL ? 12 : 0 },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{reminder.emoji}</Text>
              </View>

              {/* Content */}
              <View style={styles.reminderContent}>
                <Text
                  style={{
                    fontFamily: getFontForLanguage(language as any, "bold"),
                    fontSize: 14,
                    fontWeight: "600",
                    color: palette.text,
                    marginBottom: 4,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(reminder.titleKey)}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: getFontForLanguage(language as any, "bold"),
                      fontSize: 13,
                      fontWeight: "600",
                      color: reminder.color,
                      marginEnd: 6,
                    }}
                  >
                    ⏰ {reminder.time}
                  </Text>
                  <Text
                    style={{
                      fontFamily: getFontForLanguage(language as any, "regular"),
                      fontSize: 12,
                      color: palette.textSecondary,
                    }}
                  >
                    • {reminder.steps.length} خطوات
                  </Text>
                </View>
              </View>

              {/* Chevron */}
              <ChevronLeft
                size={20}
                color={palette.textMuted}
                strokeWidth={2.5}
                style={{ marginStart: isRTL ? 0 : 8, marginEnd: isRTL ? 8 : 0 }}
              />
            </Pressable>
          ))}

          <View
            style={{
              backgroundColor: palette.blueLight,
              borderRadius: 16,
              padding: 12,
              marginHorizontal: 20,
              marginTop: 12,
              borderLeftWidth: isRTL ? 0 : 4,
              borderLeftColor: isRTL ? "transparent" : palette.blue,
              borderRightWidth: isRTL ? 4 : 0,
              borderRightColor: isRTL ? palette.blue : "transparent",
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                fontFamily: getFontForLanguage(language as any, "regular"),
                fontSize: 12,
                color: palette.text,
                flex: 1,
                textAlign: isRTL ? "right" : "left",
                marginEnd: isRTL ? 0 : 8,
                marginStart: isRTL ? 8 : 0,
              }}
            >
              💡 <Text style={{ fontWeight: "600" }}>تلميح:</Text> انقر على أي تنبيه لرؤية الخطوات التفصيلية والنصائح المهمة
            </Text>
          </View>
        </View>

        {/* Other Notifications Info */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
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
            سيتم إظهار المزيد من التنبيهات
          </Text>
          {[
            {
              icon: PartyPopper,
              text: t("tabs.notifications.milestones"),
              color: palette.orange,
              bg: palette.orangeLight,
            },
            {
              icon: MessageCircle,
              text: t("tabs.notifications.nudges"),
              color: palette.blue,
              bg: palette.blueLight,
            },
          ].map((item) => (
            <View
              key={item.text}
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                gap: 12,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: palette.border,
                backgroundColor: palette.surface,
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  backgroundColor: item.bg,
                }}
              >
                <item.icon size={20} color={item.color} strokeWidth={2.25} />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontFamily: getFontForLanguage(language as any, "regular"),
                  fontSize: 13,
                  color: palette.text,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  reminderCard: {
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  reminderContent: {
    flex: 1,
  },
});