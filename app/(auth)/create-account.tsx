import { router } from "expo-router";
import { Baby } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { AuthShell } from "@/components/auth/AuthShell";
import { RoleCard } from "@/components/auth/RoleCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useSignup } from "@/contexts/SignupContext";
import type { UserRole } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

export default function CreateAccountScreen() {
  const { t } = useTranslation();
  const { role, setRole } = useSignup();
  const [picked, setPicked] = useState<UserRole | null>("parent");

  const continueFlow = () => {
    if (!picked) return;
    setRole(picked);
    router.push(
      picked === "parent" ? Routes.signupParent : Routes.signupOrthophonist,
    );
  };

  return (
    <AuthShell
      title={t("auth.createAccount.title")}
      subtitle={t("auth.createAccount.subtitle")}
      onBack={() => router.back()}
      accent="green"
      footer={
        <PrimaryButton
          label={t("common.continue")}
          onPress={continueFlow}
          accessibilityLabel={t("accessibilityLabels.continueSignup")}
        />
      }
    >
      <View style={styles.cards}>
        <RoleCard
          title={t("auth.createAccount.parentTitle")}
          description={t("auth.createAccount.parentDesc")}
          icon={Baby}
          selected={true}
          accent={palette.green}
          accentLight={palette.greenLight}
          onPress={() => setPicked("parent")}
        />
        
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 16,
    paddingTop: 8,
  },
});