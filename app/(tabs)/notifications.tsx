import { BellOff, MessageCircle, PartyPopper } from "lucide-react-native";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <ScreenShell
      title={t("tabs.notifications.title")}
      subtitle={t("tabs.notifications.subtitle")}
      accent="purple"
    >
      <View style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="-mt-2">
        <Card className="items-center px-6 py-10">
          <View
            className="mb-4 h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: palette.purpleLight }}
          >
            <BellOff size={32} color={palette.purple} strokeWidth={2.25} />
          </View>
          <Text variant="title" className="text-center text-lg">
            {t("tabs.notifications.empty")}
          </Text>
          <Text variant="body" className="mt-2 text-center">
            {t("tabs.notifications.emptyDesc")}
          </Text>
        </Card>

        <View className="mt-6 gap-3">
          <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="label" className="px-1">
            {t("tabs.notifications.youWillSee")}
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
              className="flex-row items-center gap-3 rounded-2xl border-2 border-tk-border bg-tk-surface px-4 py-3"
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={20} color={item.color} strokeWidth={2.25} />
              </View>
              <Text style={{ textAlign: isRTL ? 'right' : 'left' }} variant="subtitle" className="flex-1 text-tk-text">
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenShell>
  );
}