import { router } from "expo-router";
import { AtSign, Globe, Mic, Phone } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthLink } from "@/components/auth/AuthShell";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Text } from "@/components/ui/Text";
import { Routes } from "@/lib/routes";
import { fonts, palette } from "@/lib/theme";

export default function WelcomeScreen() {
  const { t } = useTranslation();

  const mockAuth = (method: "google" | "phone" | "email") => {
    router.push({ pathname: "/(auth)/login", params: { method } });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Mic size={44} color={palette.textOnPrimary} strokeWidth={2.5} />
          </View>
          <Text style={styles.title} >Talky Kids</Text>
          <Text style={styles.subtitle}>
            {t("auth.welcome.subtitle")}
          </Text>
        </View>

        <View style={styles.actions}>
          <SocialAuthButton
            label={t("auth.welcome.googleBtn")}
            icon={Globe}
            variant="google"
            onPress={() => mockAuth("google")}
          />
          <SocialAuthButton
            label={t("auth.welcome.phoneBtn")}
            icon={Phone}
            onPress={() => mockAuth("phone")}
          />
          <SocialAuthButton
            label={t("auth.welcome.emailBtn")}
            icon={AtSign}
            onPress={() => mockAuth("email")}
          />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>{t("common.or")}</Text>
            <View style={styles.divider} />
          </View>

          <SocialAuthButton
            label={t("auth.welcome.createAccount")}
            icon={Mic}
            variant="primary"
            onPress={() => router.push(Routes.createAccount)}
          />

          <View style={styles.loginLink}>
            <AuthLink
              label={t("auth.welcome.haveAccount")}
              onPress={() =>
                router.push({ pathname: "/(auth)/login", params: { method: "email" } })
              }
            />
          </View>

          <Text style={styles.mockNote}>{t("auth.welcome.mockNote")}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 16,
    minHeight: 220,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: palette.green,
    borderWidth: 4,
    borderColor: palette.greenDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    color: palette.text,
    textAlign: "center",
    padding: 10,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: palette.textSecondary,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 12,
  },
  actions: {
    gap: 12,
    paddingBottom: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 4,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: palette.border,
  },
  dividerText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.textMuted,
  },
  loginLink: {
    marginTop: 8,
  },
  mockNote: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: palette.textMuted,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 4,
  },
});