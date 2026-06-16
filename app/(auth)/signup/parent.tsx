import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { AuthShell } from "@/components/auth/AuthShell";
import { OptionChip } from "@/components/auth/OptionChip";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { StepIndicator } from "@/components/auth/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import { useSignup } from "@/contexts/SignupContext";
import { MOCK_ORTHOPHONISTS, type KidAgeRange, type KidGender } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";
import { fonts, palette } from "@/lib/theme";

const STEPS = 5;

export default function ParentSignupScreen() {
  const { t } = useTranslation();
  const { parent, setParent, submitParentSignup, isLoading, error } = useSignup();
  const [step, setStep] = useState(0);

  const TITLES = [
    t("auth.signup.parentSteps.step1"),
    t("auth.signup.parentSteps.step2"),
    t("auth.signup.parentSteps.step3"),
    t("auth.signup.parentSteps.step4"),
    t("auth.signup.parentSteps.step5"),
  ];

  const next = async () => {
    if (step < STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    try {
      await submitParentSignup();
      router.replace(Routes.tabs);
    } catch (err) {
      // Error is handled and shown via context/state
      console.error(err);
    }
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  };

  const canContinue = () => {
    if (step === 0)
      return parent.firstName.trim() && parent.lastName.trim() && parent.phone.trim();
    if (step === 1)
      return parent.kidName.trim() && parent.kidAge && parent.kidGender;
    if (step === 2) return true;
    if (step === 3) return parent.method !== null;
    if (step === 4) {
      if (parent.method === "google") return true;
      return parent.email.trim().length > 3 && parent.password.length >= 6;
    }
    return false;
  };

  const footerLabel = step === STEPS - 1 ? t("auth.signup.createBtn") : t("common.continue");

  return (
    <AuthShell
      title={TITLES[step]}
      subtitle={t("auth.signup.stepCounter", { step: step + 1, total: STEPS })}
      onBack={back}
      accent="green"
      footer={
        <View className="gap-2">
          {error ? <Text className="text-red-500 text-center">{error}</Text> : null}
          <PrimaryButton
            label={isLoading ? "Loading..." : footerLabel}
            onPress={() => { if (canContinue() && !isLoading) next(); }}
            accessibilityLabel={footerLabel}
          />
        </View>
      }
    >
      <View className="mb-6 mt-2">
        <StepIndicator total={STEPS} current={step} accent={palette.green} />
      </View>

      {step === 0 ? (
        <View className="gap-4">
          <AuthInput
            label={t("auth.signup.firstName")}
            value={parent.firstName}
            onChangeText={(v) => setParent({ firstName: v })}
            autoComplete="given-name"
          />
          <AuthInput
            label={t("auth.signup.lastName")}
            value={parent.lastName}
            onChangeText={(v) => setParent({ lastName: v })}
            autoComplete="family-name"
          />
          <AuthInput
            label={t("common.phone")}
            value={parent.phone}
            onChangeText={(v) => setParent({ phone: v })}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
        </View>
      ) : null}

      {step === 1 ? (
        <View className="gap-4">
          <AuthInput
            label={t("auth.signup.childFirstName")}
            value={parent.kidName}
            onChangeText={(v) => setParent({ kidName: v })}
          />
          <View className="gap-2">
            <Text style={{ fontFamily: fonts.displaySemi, fontSize: 14 }}>{t("auth.signup.ageRange")}</Text>
            <View className="flex-row gap-2">
              <OptionChip<KidAgeRange>
                label={t("auth.signup.age3to5")}
                value="3-5"
                selected={parent.kidAge}
                onSelect={(v) => setParent({ kidAge: v })}
              />
              <OptionChip<KidAgeRange>
                label={t("auth.signup.age5to9")}
                value="5-9"
                selected={parent.kidAge}
                onSelect={(v) => setParent({ kidAge: v })}
              />
            </View>
          </View>
          <View className="gap-2">
            <Text style={{ fontFamily: fonts.displaySemi, fontSize: 14 }}>{t("auth.signup.gender")}</Text>
            <View className="flex-row gap-2">
              <OptionChip<KidGender>
                label={t("auth.signup.boy")}
                value="male"
                selected={parent.kidGender}
                onSelect={(v) => setParent({ kidGender: v })}
              />
              <OptionChip<KidGender>
                label={t("auth.signup.girl")}
                value="female"
                selected={parent.kidGender}
                onSelect={(v) => setParent({ kidGender: v })}
              />
            </View>
          </View>
        </View>
      ) : null}

      {step === 2 ? (
        <View className="gap-3">
          <Text variant="body">
            {t("auth.signup.linkOrthNow")}
          </Text>
          {MOCK_ORTHOPHONISTS.map((o) => {
            const selected = parent.orthophonistId === o.id;
            return (
              <Pressable
                key={o.id}
                onPress={() =>
                  setParent({ orthophonistId: selected ? null : o.id })
                }
                className="active:opacity-90"
              >
                <View
                  className="rounded-2xl border-2 p-4"
                  style={{
                    borderColor: selected ? palette.green : palette.border,
                    backgroundColor: selected ? palette.greenLight : palette.surface,
                  }}
                >
                  <Text style={{ fontFamily: fonts.displaySemi, fontSize: 16 }}>
                    {o.name}
                  </Text>
                  <Text variant="caption" className="mt-1">
                    {o.clinic} · {o.city}
                  </Text>
                </View>
              </Pressable>
            );
          })}
          <Pressable onPress={() => setParent({ orthophonistId: null })}>
            <Text
              style={{
                fontFamily: fonts.displaySemi,
                color: palette.blue,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {t("common.skip")}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {step === 3 ? (
        <View className="gap-3">
          <SocialAuthButton
            label={t("auth.signup.googleSignup")}
            icon={Mail}
            variant="google"
            onPress={() => setParent({ method: "google" })}
          />
          <SocialAuthButton
            label={t("auth.signup.emailSignup")}
            icon={Mail}
            onPress={() => setParent({ method: "email" })}
          />
          {parent.method ? (
            <Text variant="caption" className="text-center">
              Selected: {parent.method === "google" ? "Google" : "Email & password"}
            </Text>
          ) : null}
        </View>
      ) : null}

      {step === 4 ? (
        <View className="gap-4">
          {parent.method === "google" ? (
            <Text variant="body">
              {t("auth.signup.googleMock")}
            </Text>
          ) : (
            <>
              <AuthInput
                label={t("common.email")}
                value={parent.email}
                onChangeText={(v) => setParent({ email: v })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthInput
                label={t("common.password")}
                value={parent.password}
                onChangeText={(v) => setParent({ password: v })}
                secureTextEntry
                placeholder="At least 6 characters"
              />
            </>
          )}
        </View>
      ) : null}

      {!canContinue() ? (
        <Text variant="caption" className="mt-4 text-center text-tk-text-muted">
          Fill required fields to continue
        </Text>
      ) : null}
    </AuthShell>
  );
}