import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette, radius } from "@/lib/theme";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  color?: "green" | "blue" | "orange" | "purple" | "red";
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: ReactNode;
};

const colorMap = {
  green: { bg: palette.green, shadow: palette.greenDark, text: palette.textOnPrimary },
  blue: { bg: palette.blue, shadow: palette.blueDark, text: palette.textOnPrimary },
  orange: { bg: palette.orange, shadow: "#E68600", text: palette.textOnPrimary },
  purple: { bg: palette.purple, shadow: "#B167E4", text: palette.textOnPrimary },
  red: { bg: palette.red, shadow: "#EA2B2B", text: palette.textOnPrimary },
};

export function PrimaryButton({
  label,
  onPress,
  color = "green",
  accessibilityLabel,
  disabled,
  style,
  icon,
}: PrimaryButtonProps) {
  const c = colorMap[color];
  const { language } = useLanguage();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.wrap,
        (pressed || disabled) && styles.wrapPressed,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      <View style={[styles.shadow, { backgroundColor: c.shadow }]} />
      <View style={[styles.face, { backgroundColor: c.bg }]}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text
          style={{
            fontFamily: getFontForLanguage(language, 'bold'),
            fontSize: 17,
            color: c.text,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", position: "relative" },
  wrapPressed: { transform: [{ translateY: 2 }] },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    borderRadius: radius.lg,
    transform: [{ translateY: 4 }],
  },
  face: {
    flexDirection: "row",
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});