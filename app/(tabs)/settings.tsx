import { router } from "expo-router";
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  UserRound,
  Volume2,
} from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/contexts/UserDataContext";
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
      style={{ direction: 'rtl' }}
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
            textAlign: 'left'
          }}
        >
          {label}
        </Text>
        {description ? (
          <Text variant="caption" className="mt-0.5" style={{ textAlign: 'left' }}>
            {description}
          </Text>
        ) : null}
      </View>
      <ChevronRight size={20} color={palette.textMuted} style={{ transform: [{ rotate: '180deg' }] }} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { user } = useUserData();
  const { signOut } = useAuth();
  const { language } = useLanguage();

  return (
    <ScreenShell
      title="الإعدادات"
      subtitle="إدارة حسابك"
      accent="orange"
    >
      <View className="-mt-2 gap-4" style={{ direction: 'rtl' }}>
        <Card className="flex-row items-center gap-4 p-5">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-tk-green">
            <UserRound size={32} color="#FFFFFF" strokeWidth={2.25} />
          </View>
          <View className="flex-1">
            <Text variant="title" className="text-lg" style={{ textAlign: 'right' }}>
              {user.parentName || "ولي الأمر"}
            </Text>
            <Text variant="body" className="mt-0.5" style={{ textAlign: 'right' }}>
              ولي أمر {user.name}
            </Text>
          </View>
        </Card>

        <Card className="overflow-hidden p-0">
          <SettingsRow
            icon={Volume2}
            label="الصوت"
            description="التحكم في المؤثرات الصوتية"
            iconColor={palette.blue}
            iconBg={palette.blueLight}
          />
          <View className="mr-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={Shield}
            label="رقابة الوالدين"
            description="إدارة الوصول والحدود"
            iconColor={palette.green}
            iconBg={palette.greenLight}
          />
          <View className="mr-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={HelpCircle}
            label="المساعدة والدعم"
            description="تواصل معنا لحل المشكلات"
            iconColor={palette.purple}
            iconBg={palette.purpleLight}
          />
        </Card>

        <Card className="overflow-hidden p-0">
          <SettingsRow
            icon={LogOut}
            label="تسجيل الخروج"
            description="تسجيل الخروج من الحساب الحالي"
            iconColor={palette.red}
            iconBg={palette.redLight}
            onPress={async () => {
              await signOut();
              router.replace(Routes.splash);
            }}
          />
        </Card>
      </View>
    </ScreenShell>
  );
}
