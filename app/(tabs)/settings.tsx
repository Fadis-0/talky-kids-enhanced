import {
  ChevronRight,
  HelpCircle,
  Shield,
  UserRound,
  Volume2,
} from "lucide-react-native";
import { Pressable, View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { fonts, palette } from "@/lib/theme";

type SettingsRowProps = {
  icon: typeof UserRound;
  label: string;
  description?: string;
  iconColor: string;
  iconBg: string;
};

function SettingsRow({
  icon: Icon,
  label,
  description,
  iconColor,
  iconBg,
}: SettingsRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-tk-bg"
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
            fontFamily: fonts.displaySemi,
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

export default function SettingsScreen() {
  return (
    <ScreenShell
      title="Profile"
      subtitle="Sound, safety, and account preferences."
      accent="orange"
    >
      <View className="-mt-2 gap-4">
        <Card className="flex-row items-center gap-4 p-5">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-tk-green">
            <UserRound size={32} color="#FFFFFF" strokeWidth={2.25} />
          </View>
          <View className="flex-1">
            <Text variant="title" className="text-lg">
              Little learner
            </Text>
            <Text variant="body" className="mt-0.5">
              Add a name and avatar soon
            </Text>
          </View>
        </Card>

        <Card className="overflow-hidden p-0">
          <SettingsRow
            icon={Volume2}
            label="Sound and voice"
            description="Effects and speech feedback"
            iconColor={palette.blue}
            iconBg={palette.blueLight}
          />
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={Shield}
            label="Parent controls"
            description="PIN, screen time, privacy"
            iconColor={palette.green}
            iconBg={palette.greenLight}
          />
          <View className="ml-[68px] h-0.5 bg-tk-border" />
          <SettingsRow
            icon={HelpCircle}
            label="Help and support"
            description="FAQs and contact"
            iconColor={palette.purple}
            iconBg={palette.purpleLight}
          />
        </Card>
      </View>
    </ScreenShell>
  );
}