import { router } from "expo-router";
import { Baby, Stethoscope } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AuthShell } from "@/components/auth/AuthShell";
import { RoleCard } from "@/components/auth/RoleCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useSignup } from "@/contexts/SignupContext";
import type { UserRole } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";
import { palette } from "@/lib/theme";

export default function CreateAccountScreen() {
  const { role, setRole } = useSignup();
  const [picked, setPicked] = useState<UserRole | null>(role);

  const continueFlow = () => {
    if (!picked) return;
    setRole(picked);
    router.push(
      picked === "parent" ? Routes.signupParent : Routes.signupOrthophonist,
    );
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Tell us who you are so we can tailor Talky Kids for you."
      onBack={() => router.back()}
      accent="green"
      footer={
        <PrimaryButton
          label="CONTINUE"
          onPress={continueFlow}
          accessibilityLabel="Continue signup"
        />
      }
    >
      <View style={styles.cards}>
        <RoleCard
          title="Parent"
          description="Sign up for your child and track their speaking practice."
          icon={Baby}
          selected={picked === "parent"}
          accent={palette.green}
          accentLight={palette.greenLight}
          onPress={() => setPicked("parent")}
        />
        <RoleCard
          title="Orthophonist"
          description="Speech therapist — manage patients and assign exercises."
          icon={Stethoscope}
          selected={picked === "orthophonist"}
          accent={palette.blue}
          accentLight={palette.blueLight}
          onPress={() => setPicked("orthophonist")}
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