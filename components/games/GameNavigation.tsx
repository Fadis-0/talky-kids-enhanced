import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/Text";
import { fonts, palette } from "@/lib/theme";
import { useLanguage } from "@/contexts/LanguageContext";

type GameNavigationProps = {
  currentLevel: number;
  totalLevels: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export function GameNavigation({
  currentLevel,
  totalLevels,
  onPrevious,
  onNext,
  onFinish,
}: GameNavigationProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const isFirstLevel = currentLevel === 1;
  const isLastLevel = currentLevel === totalLevels;

  // Swapped chevrons for RTL
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <View style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr' }]}>
      {/* Previous Button */}
      <Pressable
        onPress={onPrevious}
        disabled={isFirstLevel}
        accessibilityRole="button"
        accessibilityLabel={t("games.previousLevel")}
        style={styles.buttonWrapper}
      >
        {({ pressed }) => {
          const shadowColor = isFirstLevel ? palette.borderStrong : palette.blueDark;
          const faceColor = isFirstLevel ? palette.border : palette.blue;
          const textColor = isFirstLevel ? palette.textMuted : "#FFFFFF";

          return (
            <View style={styles.buttonInner}>
              {/* Shadow Layer */}
              <View style={[styles.shadow, { backgroundColor: shadowColor }]} />
              {/* Face Layer */}
              <View
                style={[
                  styles.face,
                  { backgroundColor: faceColor },
                  pressed && !isFirstLevel && styles.facePressed,
                ]}
              >
                <PrevIcon
                  size={20}
                  color={textColor}
                  strokeWidth={3}
                />
                <Text
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontFamily: isRTL ? "Cairo_700Bold" : fonts.displayBold,
                  }}
                >
                  {t("common.previous").toUpperCase()}
                </Text>
              </View>
            </View>
          );
        }}
      </Pressable>

      {/* Next/Finish Button */}
      <Pressable
        onPress={isLastLevel ? onFinish : onNext}
        accessibilityRole="button"
        accessibilityLabel={isLastLevel ? t("games.finishGame") : t("games.nextLevel")}
        style={styles.buttonWrapper}
      >
        {({ pressed }) => {
          const shadowColor = isLastLevel ? "#E68600" : palette.greenDark;
          const faceColor = isLastLevel ? palette.orange : palette.green;

          return (
            <View style={styles.buttonInner}>
              {/* Shadow Layer */}
              <View style={[styles.shadow, { backgroundColor: shadowColor }]} />
              {/* Face Layer */}
              <View
                style={[
                  styles.face,
                  { backgroundColor: faceColor },
                  pressed && styles.facePressed,
                ]}
              >
                {isLastLevel ? (
                  <>
                    <CheckCircle size={20} color="#FFFFFF" strokeWidth={3} />
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontFamily: isRTL ? "Cairo_700Bold" : fonts.displayBold,
                      }}
                    >
                      {t("common.finish").toUpperCase()}
                    </Text>
                  </>
                ) : (
                  <>
                    {isRTL ? (
                      <>
                        <NextIcon size={20} color="#FFFFFF" strokeWidth={3} />
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: 14,
                            fontFamily: "Cairo_700Bold",
                          }}
                        >
                          {t("common.next").toUpperCase()}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontSize: 14,
                            fontFamily: fonts.displayBold,
                          }}
                        >
                          {t("common.next").toUpperCase()}
                        </Text>
                        <NextIcon size={20} color="#FFFFFF" strokeWidth={3} />
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          );
        }}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    paddingVertical: 10,
    marginTop: 6,
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonInner: {
    position: "relative",
    height: 52,
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
    borderRadius: 14,
  },
  face: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 46,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  facePressed: {
    top: 4,
  },
});
