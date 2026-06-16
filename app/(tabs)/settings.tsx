import { router } from "expo-router";
import {
    ChevronRight,
    Globe,
    HelpCircle,
    Shield,
    UserRound,
    Volume2,
    LogOut,
} from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { Routes } from "@/lib/routes";
import { getFontForLanguage, palette } from "@/lib/theme";

type SettingsRowProps = {
  icon: typeof UserRound;
  label: string;
  description?: string;
  iconColor: string;
  iconBg: string;
  onPress?: () => void;
};

function SettingsRow({
  icon: Icon,
  label,
  description,
  iconColor,
  iconBg,
  onPress,
}: SettingsRowProps) {
  const { language } = useLanguage();
  
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-tk-bg"
      onPress={onPress}
    >
      <View
        className="h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={22} color={iconColor} strokeWidth={2.25} />
      </View>
      <View className="flex-1">
        <Text
          style={{
            fontFamily: getFontForLanguage(language, 'semi'),
            fontSize: 16,
            color: palette.text,
          }}
        >
          {label}
        </Text>
        {description ? (
          <Text variant="caption" className="mt-0.5">
            {description}
          </Text>
        ) : null}
      </View>
      <ChevronRight size={20} color={palette.textMuted} />
    </Pressable>
  );
}

type LanguageOption = "en" | "ar";

function LanguageSelector() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [showLanguages, setShowLanguages] = React.useState(false);

  return (
    <Card className="overflow-hidden p-0">
      <Pressable
        onPress={() => setShowLanguages(!showLanguages)}
        accessibilityRole="button"
        className="flex-row items-center gap-3 px-4 py-3.5 active:bg-tk-bg"
      >
        <View
          className="h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: palette.blueLight }}
        >
          <Globe size={22} color={palette.blue} strokeWidth={2.25} />
        </View>
        <View className="flex-1">
          <Text
            style={{
              fontFamily: getFontForLanguage(language, 'semi'),
              fontSize: 16,
              color: palette.text,
            }}
          >
            {t("tabs.settings.language")}
          </Text>
          <Text variant="caption" className="mt-0.5">
            {language === "ar"
              ? t("tabs.settings.arabic")
              : t("tabs.settings.english")}
          </Text>
        </View>
        <ChevronRight size={20} color={palette.textMuted} />
      </Pressable>

      {showLanguages && (
        <>
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <Pressable
            onPress={() => {
              setLanguage("ar" as LanguageOption);
              setShowLanguages(false);
            }}
            className="flex-row items-center gap-3 px-4 py-3.5 active:bg-tk-bg"
          >
            <View
              className="h-6 w-6 items-center justify-center rounded-full border-2"
              style={{
                borderColor: language === "ar" ? palette.blue : palette.border,
              }}
            >
              {language === "ar" && (
                <View
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: palette.blue }}
                />
              )}
            </View>
            <Text
              style={{
                fontFamily: getFontForLanguage(language, 'regular'),
                fontSize: 15,
                color: palette.text,
              }}
            >
              {t("tabs.settings.arabic")}
            </Text>
          </Pressable>
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <Pressable
            onPress={() => {
              setLanguage("en" as LanguageOption);
              setShowLanguages(false);
            }}
            className="flex-row items-center gap-3 px-4 py-3.5 active:bg-tk-bg"
          >
            <View
              className="h-6 w-6 items-center justify-center rounded-full border-2"
              style={{
                borderColor: language === "en" ? palette.blue : palette.border,
              }}
            >
              {language === "en" && (
                <View
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: palette.blue }}
                />
              )}
            </View>
            <Text
              style={{
                fontFamily: getFontForLanguage(language, 'regular'),
                fontSize: 15,
                color: palette.text,
              }}
            >
              {t("tabs.settings.english")}
            </Text>
          </Pressable>
        </>
      )}
    </Card>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <ScreenShell
      title={t("tabs.settings.title")}
      subtitle={t("tabs.settings.subtitle")}
      accent="orange"
    >
      <View className="-mt-2 gap-4">
        <Card className="flex-row items-center gap-4 p-5">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-tk-green">
            <UserRound size={32} color="#FFFFFF" strokeWidth={2.25} />
          </View>
          <View className="flex-1">
            <Text variant="title" className="text-lg">
              {t("tabs.settings.userName")}
            </Text>
            <Text variant="body" className="mt-0.5">
              {t("tabs.settings.userDesc")}
            </Text>
          </View>
        </Card>

        <Card className="overflow-hidden p-0">
          <SettingsRow
            icon={Volume2}
            label={t("tabs.settings.sound")}
            description={t("tabs.settings.soundDesc")}
            iconColor={palette.blue}
            iconBg={palette.blueLight}
          />
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={Shield}
            label={t("tabs.settings.parentControls")}
            description={t("tabs.settings.parentControlsDesc")}
            iconColor={palette.green}
            iconBg={palette.greenLight}
          />
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={HelpCircle}
            label={t("tabs.settings.helpSupport")}
            description={t("tabs.settings.helpSupportDesc")}
            iconColor={palette.purple}
            iconBg={palette.purpleLight}
          />
        </Card>

        <LanguageSelector />

        <Card className="overflow-hidden p-0">
          <SettingsRow
            icon={LogOut}
            label={t("tabs.settings.logout")}
            description={t("tabs.settings.logoutDesc")}
            iconColor={palette.red}
            iconBg={palette.redLight}
            onPress={() => router.replace(Routes.splash)}
          />
        </Card>
      </View>
    </ScreenShell>
  );
}
