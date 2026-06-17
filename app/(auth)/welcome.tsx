import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { LogIn, UserPlus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { Routes } from "@/lib/routes";
import { fonts, getFontForLanguage, palette } from "@/lib/theme";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[palette.greenLight, palette.blueLight, palette.background]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Image
              source={require("@/assets/images/splash-logo.jpeg")}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>Talky Kids</Text>
          <Text

            style={[
              styles.subtitle,
              {
                fontFamily: getFontForLanguage(language, 'semi'),
              }
            ]}
          >
            {t("auth.welcome.subtitle")}
          </Text>
        </View>

        <View style={styles.actions}>
          <SocialAuthButton
            label={t("auth.welcome.createAccount")}
            icon={UserPlus}
            variant="primary"
            onPress={() => router.push(Routes.createAccount)}
          />

          <SocialAuthButton
            label={t("auth.welcome.loginBtn")}
            icon={LogIn}
            variant="outline"
            onPress={() =>
              router.push({ pathname: "/(auth)/login", params: { method: "email" } })
            }
          />
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
    paddingHorizontal: 24,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: palette.green,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: palette.greenDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  logoImage: {
    width: "110%",
    height: "110%",
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    color: palette.text,
    textAlign: "center",
    marginBottom: 8,
    paddingBottom: 12,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: palette.textSecondary,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  actions: {
    gap: 16,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
});