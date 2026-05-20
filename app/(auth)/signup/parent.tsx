import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
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
const TITLES = [
  "About you",
  "Your child",
  "Speech therapist",
  "Sign up method",
  "Create account",
];

export default function ParentSignupScreen() {
  const { parent, setParent } = useSignup();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    router.replace(Routes.tabs);
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

  const footerLabel = step === STEPS - 1 ? "CREATE ACCOUNT" : "CONTINUE";

  return (
    <AuthShell
      title={TITLES[step]}
      subtitle={`Step ${step + 1} of ${STEPS}`}
      onBack={back}
      accent="green"
      footer={
        <PrimaryButton
          label={footerLabel}
          onPress={() => { if (canContinue()) next(); }}
          accessibilityLabel={footerLabel}
        />
      }
    >
      <View className="mb-6 mt-2">
        <StepIndicator total={STEPS} current={step} accent={palette.green} />
      </View>

      {step === 0 ? (
        <View className="gap-4">
          <AuthInput
            label="First name"
            value={parent.firstName}
            onChangeText={(v) => setParent({ firstName: v })}
            autoComplete="given-name"
          />
          <AuthInput
            label="Last name"
            value={parent.lastName}
            onChangeText={(v) => setParent({ lastName: v })}
            autoComplete="family-name"
          />
          <AuthInput
            label="Phone"
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
            label="Child's first name"
            value={parent.kidName}
            onChangeText={(v) => setParent({ kidName: v })}
          />
          <View className="gap-2">
            <Text style={{ fontFamily: fonts.displaySemi, fontSize: 14 }}>Age range</Text>
            <View className="flex-row gap-2">
              <OptionChip<KidAgeRange>
                label="3 – 5"
                value="3-5"
                selected={parent.kidAge}
                onSelect={(v) => setParent({ kidAge: v })}
              />
              <OptionChip<KidAgeRange>
                label="5 – 9"
                value="5-9"
                selected={parent.kidAge}
                onSelect={(v) => setParent({ kidAge: v })}
              />
            </View>
          </View>
          <View className="gap-2">
            <Text style={{ fontFamily: fonts.displaySemi, fontSize: 14 }}>Gender</Text>
            <View className="flex-row gap-2">
              <OptionChip<KidGender>
                label="Boy"
                value="male"
                selected={parent.kidGender}
                onSelect={(v) => setParent({ kidGender: v })}
              />
              <OptionChip<KidGender>
                label="Girl"
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
            Link an orthophonist now, or skip and add one later.
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
              Skip for now
            </Text>
          </Pressable>
        </View>
      ) : null}

      {step === 3 ? (
        <View className="gap-3">
          <SocialAuthButton
            label="Sign up with Google"
            icon={Mail}
            variant="google"
            onPress={() => setParent({ method: "google" })}
          />
          <SocialAuthButton
            label="Sign up with Email"
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
              Tap create account to finish with Google (mock — no real OAuth yet).
            </Text>
          ) : (
            <>
              <AuthInput
                label="Email"
                value={parent.email}
                onChangeText={(v) => setParent({ email: v })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthInput
                label="Password"
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