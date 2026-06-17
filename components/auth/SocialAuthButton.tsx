import { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette, radius } from "@/lib/theme";

type SocialAuthButtonProps = {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  variant?: "outline" | "google" | "primary";
};

export function SocialAuthButton({
  label,
  icon: Icon,
  onPress,
  variant = "outline",
}: SocialAuthButtonProps) {
  const { language } = useLanguage();
  const isGoogle = variant === "google";
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.inner,
          isGoogle && styles.google,
          isPrimary && styles.primary,
        ]}
      >
        <Icon
          size={22}
          color={isPrimary ? palette.textOnPrimary : palette.text}
          strokeWidth={2.25}
        />
        <Text
          style={{
            fontFamily: getFontForLanguage(language, 'semi'),
            fontSize: 16,
            color: isPrimary ? palette.textOnPrimary : palette.text,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  inner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  google: { backgroundColor: palette.surface },
  primary: {
    borderColor: palette.greenDark,
    backgroundColor: palette.green,
  },
});