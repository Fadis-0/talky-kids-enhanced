import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontForLanguage, palette } from "@/lib/theme";
import { Crown, Lock } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, View } from "react-native";

interface SubscriptionModalProps {
  visible: boolean;
  onSubscribe: () => void;
  onLater: () => void;
}

export function SubscriptionModal({
  visible,
  onSubscribe,
  onLater,
}: SubscriptionModalProps) {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onLater}
    >
      <View style={styles.container}>
        {/* Semi-transparent background */}
        <Pressable
          style={styles.backdrop}
          onPress={onLater}
        />

        {/* Modal Content */}
        <View
          style={[
            styles.modalContent,
            { direction: isRTL ? "rtl" : "ltr" },
          ]}
        >
          {/* Premium Icon */}
          <View style={styles.iconContainer}>
            <Crown size={48} color={palette.orange} strokeWidth={2} />
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                fontFamily: getFontForLanguage(language as any, "bold"),
              },
            ]}
          >
            {t("subscription.title")}
          </Text>

          {/* Subtitle/Message */}
          <Text
            style={[
              styles.message,
              {
                fontFamily: getFontForLanguage(language as any, "regular"),
              },
            ]}
          >
            {t("subscription.message")}
          </Text>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <Lock size={16} color={palette.green} />
              <Text style={[styles.featureText, { fontFamily: getFontForLanguage(language as any, "regular"), flexShrink: 1 }]}>
                كل المستويات المتقدمة
              </Text>
            </View>
            <View style={styles.featureRow}>
              <Lock size={16} color={palette.green} />
              <Text style={[styles.featureText, { fontFamily: getFontForLanguage(language as any, "regular"), flexShrink: 1 }]}>
                تقدم بدون حدود
              </Text>
            </View>
            <View style={styles.featureRow}>
              <Lock size={16} color={palette.green} />
              <Text style={[styles.featureText, { fontFamily: getFontForLanguage(language as any, "regular"), flexShrink: 1 }]}>
                تحليل شامل للتقدم
              </Text>
            </View>
          </View>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            {/* Subscribe Button */}
            <Pressable
              style={({ pressed }) => [
                styles.subscribeButton,
                pressed && styles.subscribeButtonPressed,
              ]}
              onPress={onSubscribe}
            >
              <Text
                style={[
                  styles.subscribeButtonText,
                  {
                    fontFamily: getFontForLanguage(language as any, "bold"),
                  },
                ]}
              >
                ✨ {t("subscription.subscribe")}
              </Text>
            </Pressable>

            {/* Later Button */}
            <Pressable
              style={({ pressed }) => [
                styles.laterButton,
                pressed && styles.laterButtonPressed,
              ]}
              onPress={onLater}
            >
              <Text
                style={[
                  styles.laterButtonText,
                  {
                    fontFamily: getFontForLanguage(language as any, "regular"),
                    fontSize: 14,
                    fontWeight: "500",
                  },
                ]}
              >
                {t("subscription.later")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginHorizontal: 16,
    maxWidth: 340,
    alignItems: "center",
    zIndex: 1,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    borderWidth: 2,
    borderColor: palette.greenLight,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.orangeLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: palette.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    color: palette.text,
    fontSize: 26,
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 32,
    width: "100%",
  },
  message: {
    color: palette.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    width: "100%",
  },
  featuresContainer: {
    width: "100%",
    backgroundColor: palette.greenLight,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
    gap: 10,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  featureText: {
    color: palette.text,
    fontSize: 13,
    flex: 1,
    flexWrap: "wrap",
    lineHeight: 18,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  subscribeButton: {
    backgroundColor: palette.green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 50,
    elevation: 4,
    shadowColor: palette.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  subscribeButtonPressed: {
    opacity: 0.85,
    elevation: 2,
  },
  laterButton: {
    backgroundColor: palette.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 48,
    borderWidth: 2,
    borderColor: palette.textMuted,
  },
  laterButtonPressed: {
    opacity: 0.7,
    backgroundColor: palette.borderStrong,
  },
  subscribeButtonText: {
    color: palette.textOnPrimary,
    textAlign: "center",
  },
  laterButtonText: {
    color: palette.text,
    textAlign: "center",
  },
});
