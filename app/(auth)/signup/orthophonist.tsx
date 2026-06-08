import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { StepIndicator } from "@/components/auth/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import { useSignup } from "@/contexts/SignupContext";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

const STEPS = 4;

export default function OrthophonistSignupScreen() {
  const { t } = useTranslation();
  const { orthophonist, setOrthophonist } = useSignup();
  const [step, setStep] = useState(0);

  const TITLES = [
    t("auth.signup.orthSteps.step1"),
    t("auth.signup.orthSteps.step2"),
    t("auth.signup.orthSteps.step3"),
    t("auth.signup.orthSteps.step4"),
  ];

  const next = () => {
    if (step < STEPS - 1) setStep((s) => s + 1);
    else router.replace(Routes.tabs);
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  };

  const canContinue = () => {
    if (step === 0)
      return (
        orthophonist.firstName.trim() &&
        orthophonist.lastName.trim() &&
        orthophonist.phone.trim() &&
        orthophonist.professionalEmail.trim()
      );
    if (step === 1) return orthophonist.clinicName.trim().length > 1;
    if (step === 2) return orthophonist.method !== null;
    if (step === 3) {
      if (orthophonist.method === "google") return true;
      return (
        orthophonist.email.trim().length > 3 &&
        orthophonist.password.length >= 6
      );
    }
    return false;
  };

  return (
    <AuthShell
      title={TITLES[step]}
      subtitle={t("auth.signup.stepCounter", { step: step + 1, total: STEPS })}
      onBack={back}
      accent="blue"
      footer={
        <PrimaryButton
          label={step === STEPS - 1 ? t("auth.signup.createBtn") : t("common.continue")}
          color="blue"
          onPress={() => {
            if (canContinue()) next();
          }}
        />
      }
    >
      <View className="mb-6 mt-2">
        <StepIndicator total={STEPS} current={step} accent={palette.blue} />
      </View>

      {step === 0 ? (
        <View className="gap-4">
          <AuthInput
            label={t("auth.signup.firstName")}
            value={orthophonist.firstName}
            onChangeText={(v) => setOrthophonist({ firstName: v })}
          />
          <AuthInput
            label={t("auth.signup.lastName")}
            value={orthophonist.lastName}
            onChangeText={(v) => setOrthophonist({ lastName: v })}
          />
          <AuthInput
            label={t("common.phone")}
            value={orthophonist.phone}
            onChangeText={(v) => setOrthophonist({ phone: v })}
            keyboardType="phone-pad"
          />
          <AuthInput
            label={t("auth.signup.profEmail")}
            value={orthophonist.professionalEmail}
            onChangeText={(v) => setOrthophonist({ professionalEmail: v })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      ) : null}

      {step === 1 ? (
        <View className="gap-4">
          <AuthInput
            label={t("auth.signup.clinicName")}
            value={orthophonist.clinicName}
            onChangeText={(v) => setOrthophonist({ clinicName: v })}
          />
          <AuthInput
            label={t("auth.signup.license")}
            value={orthophonist.licenseNumber}
            onChangeText={(v) => setOrthophonist({ licenseNumber: v })}
          />
          <AuthInput
            label={t("auth.signup.city")}
            value={orthophonist.city}
            onChangeText={(v) => setOrthophonist({ city: v })}
          />
        </View>
      ) : null}

      {step === 2 ? (
        <View className="gap-3">
          <SocialAuthButton
            label={t("auth.signup.googleSignup")}
            icon={Mail}
            variant="google"
            onPress={() => setOrthophonist({ method: "google" })}
          />
          <SocialAuthButton
            label={t("auth.signup.emailSignup")}
            icon={Mail}
            onPress={() => setOrthophonist({ method: "email" })}
          />
        </View>
      ) : null}

      {step === 3 ? (
        <View className="gap-4">
          {orthophonist.method === "google" ? (
            <Text variant="body">
              {t("auth.signup.googleMock")}
            </Text>
          ) : (
            <>
              <AuthInput
                label={t("common.email")}
                value={orthophonist.email}
                onChangeText={(v) => setOrthophonist({ email: v })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthInput
                label={t("common.password")}
                value={orthophonist.password}
                onChangeText={(v) => setOrthophonist({ password: v })}
                secureTextEntry
              />
            </>
          )}
        </View>
      ) : null}
    </AuthShell>
  );
}