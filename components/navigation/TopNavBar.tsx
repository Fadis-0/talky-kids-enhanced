import { User } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { fonts, palette } from "@/lib/theme";

type TopNavBarProps = {
  userName: string;
  onProfilePress?: () => void;
};

export function TopNavBar({ userName, onProfilePress }: TopNavBarProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: palette.textMuted,
          }}
        >
          Hello,
        </Text>
        <Text
          style={{
            fontFamily: fonts.displaySemi,
            fontSize: 16,
            color: palette.text,
            marginTop: 2,
          }}
        >
          {userName}
        </Text>
      </View>

      <Pressable
        onPress={onProfilePress}
        style={({ pressed }) => [
          styles.profileButton,
          pressed && { opacity: 0.7 },
        ]}
        accessibilityLabel="Profile"
        accessibilityRole="button"
      >
        <View style={styles.profileCircle}>
          <User size={18} color={palette.text} strokeWidth={2.25} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  profileButton: {
    padding: 4,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.surface,
    borderWidth: 1.5,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});
