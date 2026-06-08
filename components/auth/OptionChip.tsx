import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette } from "@/lib/theme";

type OptionChipProps<T extends string> = {
  label: string;
  value: T;
  selected: T | null;
  onSelect: (value: T) => void;
  accent?: string;
};

export function OptionChip<T extends string>({
  label,
  value,
  selected,
  onSelect,
  accent = palette.green,
}: OptionChipProps<T>) {
  const isSelected = selected === value;
  const { language } = useLanguage();

  return (
    <Pressable
      onPress={() => onSelect(value)}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      className="flex-1"
    >
      <View
        className="items-center rounded-2xl border-2 px-3 py-3.5"
        style={{
          borderColor: isSelected ? accent : palette.border,
          backgroundColor: isSelected ? `${accent}22` : palette.surface,
        }}
      >
        <Text
          style={{
            fontFamily: getFontForLanguage(language, 'semi'),
            fontSize: 15,
            color: isSelected ? accent : palette.textSecondary,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}