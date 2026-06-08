import { TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette } from "@/lib/theme";

type AuthInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, style, ...props }: AuthInputProps) {
  const { language } = useLanguage();
  
  return (
    <View className="gap-1.5">
      <Text
        style={{
          fontFamily: getFontForLanguage(language, 'semi'),
          fontSize: 14,
          color: palette.text,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholderTextColor={palette.textMuted}
        className="rounded-2xl border-2 border-tk-border bg-tk-surface px-4 py-3.5 text-base text-tk-text"
        style={[{ fontFamily: getFontForLanguage(language, 'regular') }, style]}
        {...props}
      />
      {error ? (
        <Text style={{ fontFamily: getFontForLanguage(language, 'regular'), fontSize: 12, color: palette.red }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}