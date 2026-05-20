import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { AuthShell } from "@/components/auth/AuthShell";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import type { SignupMethod } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";

export default function LoginScreen() {
  const { method } = useLocalSearchParams<{ method?: SignupMethod }>();
  const authMethod = method ?? "email";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const title =
    authMethod === "google"
      ? "Google sign in"
      : authMethod === "phone"
        ? "Phone sign in"
        : "Email sign in";

  const subtitle =
    authMethod === "google"
      ? "Mock flow — tap continue to enter the app."
      : "Enter your details (mock — any value works).";

  const finish = () => router.replace(Routes.tabs);

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      onBack={() => router.back()}
      accent="blue"
      footer={<PrimaryButton label="CONTINUE" color="blue" onPress={finish} />}
    >
      <View className="gap-4 pt-2">
        {authMethod === "google" ? (
          <Text variant="body">
            We will connect your Google account in a future release. For now, continue to preview the app.
          </Text>
        ) : null}

        {authMethod === "phone" ? (
          <AuthInput
            label="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+212 6XX XXX XXX"
            autoComplete="tel"
          />
        ) : null}

        {authMethod === "email" ? (
          <>
            <AuthInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholder="you@email.com"
            />
            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Your password"
            />
          </>
        ) : null}
      </View>
    </AuthShell>
  );
}