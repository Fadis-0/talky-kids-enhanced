import { supabase } from "@/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { AuthShell } from "@/components/auth/AuthShell";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import type { SignupMethod } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { method } = useLocalSearchParams<{ method?: SignupMethod }>();
  const authMethod = method ?? "email";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title =
    authMethod === "google"
      ? t("auth.login.googleTitle")
      : authMethod === "phone"
        ? t("auth.login.phoneTitle")
        : t("auth.login.emailTitle");

  const subtitle =
    authMethod === "google"
      ? t("auth.login.googleSubtitle")
      : t("auth.login.otherSubtitle");

  const finish = async () => {
    if (authMethod === "email") {
      setIsLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setIsLoading(false);

      if (error) {
        setError(error.message);
      } else {
        router.replace(Routes.tabs);
      }
    } else {
      router.replace(Routes.tabs);
    }
  };

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      onBack={() => router.back()}
      accent="blue"
      footer={
        <View className="gap-2">
          {error ? <Text className="text-red-500 text-center">{error}</Text> : null}
          <PrimaryButton
            label={isLoading ? "Loading..." : t("common.continue")}
            color="blue"
            onPress={finish}
            disabled={isLoading}
          />
        </View>
      }
    >
      <View className="gap-4 pt-2">
        {authMethod === "google" ? (
          <Text variant="body">
            {t("auth.login.googleNote")}
          </Text>
        ) : null}

        {authMethod === "phone" ? (
          <AuthInput
            label={t("common.phone")}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder={t("auth.login.phonePlaceholder")}
            autoComplete="tel"
          />
        ) : null}

        {authMethod === "email" ? (
          <>
            <AuthInput
              label={t("common.email")}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholder={t("auth.login.emailPlaceholder")}
            />
            <AuthInput
              label={t("common.password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder={t("auth.login.passwordPlaceholder")}
            />
          </>
        ) : null}
      </View>
    </AuthShell>
  );
}