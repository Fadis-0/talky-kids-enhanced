import { TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/Text";
import { fonts, palette } from "@/lib/theme";

type AuthInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, style, ...props }: AuthInputProps) {
  return (
    <View className="gap-1.5">
      <Text
        style={{
          fontFamily: fonts.displaySemi,
          fontSize: 14,
          color: palette.text,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholderTextColor={palette.textMuted}
        className="rounded-2xl border-2 border-tk-border bg-tk-surface px-4 py-3.5 text-base text-tk-text"
        style={[{ fontFamily: fonts.bodyRegular }, style]}
        {...props}
      />
      {error ? (
        <Text style={{ fontFamily: fonts.body, fontSize: 12, color: palette.red }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}