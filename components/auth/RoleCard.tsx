import { LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette } from "@/lib/theme";

type RoleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  accent: string;
  accentLight: string;
  onPress: () => void;
};

export function RoleCard({
  title,
  description,
  icon: Icon,
  selected,
  accent,
  accentLight,
  onPress,
}: RoleCardProps) {
  const { language } = useLanguage();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className="active:opacity-90"
    >
      <View
        className="flex-row items-center gap-4 rounded-2xl border-2 bg-tk-surface p-5"
        style={{
          borderColor: selected ? accent : palette.border,
          backgroundColor: selected ? accentLight : palette.surface,
        }}
      >
        <View
          className="h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: selected ? accent : palette.border }}
        >
          <Icon
            size={28}
            color={selected ? palette.textOnPrimary : palette.textMuted}
            strokeWidth={2.25}
          />
        </View>
        <View className="flex-1">
          <Text style={{ fontFamily: getFontForLanguage(language, 'bold'), fontSize: 18, color: palette.text }}>
            {title}
          </Text>
          <Text variant="body" className="mt-1">
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}