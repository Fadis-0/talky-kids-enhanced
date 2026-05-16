import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { fonts, palette, radius } from "@/lib/theme";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  color?: "green" | "blue" | "orange";
  accessibilityLabel?: string;
};

const colorMap = {
  green: { bg: palette.green, shadow: palette.greenDark, text: palette.textOnPrimary },
  blue: { bg: palette.blue, shadow: palette.blueDark, text: palette.textOnPrimary },
  orange: { bg: palette.orange, shadow: "#E68600", text: palette.textOnPrimary },
};

export function PrimaryButton({
  label,
  onPress,
  color = "green",
  accessibilityLabel,
}: PrimaryButtonProps) {
  const c = colorMap[color];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [styles.wrap, pressed && styles.wrapPressed]}
    >
      <View style={[styles.shadow, { backgroundColor: c.shadow }]} />
      <View style={[styles.face, { backgroundColor: c.bg }]}>
        <Text
          style={{
            fontFamily: fonts.displayBold,
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
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});