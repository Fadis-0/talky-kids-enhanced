import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Pressable, ScrollView, TextInput, View } from "react-native";

import { AuthInput } from "@/components/auth/AuthInput";
import { AuthShell } from "@/components/auth/AuthShell";
import { OptionChip } from "@/components/auth/OptionChip";
import { StepIndicator } from "@/components/auth/StepIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSignup } from "@/contexts/SignupContext";
import type { KidAgeRange, KidGender } from "@/lib/auth-types";
import { Routes } from "@/lib/routes";
import { supabase } from "@/lib/supabase";
import { getFontForLanguage, palette } from "@/lib/theme";

const STEPS = 4;

export default function ParentSignupScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { parent, setParent, submitParentSignup, isLoading, error } = useSignup();
  const [step, setStep] = useState(0);
  const [orthophonists, setOrthophonists] = useState<any[]>([]);
  const [filteredOrthophonists, setFilteredOrthophonists] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingOrths, setLoadingOrths] = useState(false);

  // Set default method to email since we removed the method selection step
  useEffect(() => {
    if (!parent.method) {
      setParent({ method: "email" });
    }
  }, []);

  useEffect(() => {
    const fetchOrthophonists = async () => {
      setLoadingOrths(true);
      try {
        console.log("Fetching orthophonists from step:", step);
        
        // Fetch orthophonists with all columns
        const { data: orthsData, error: orthsError } = await supabase
          .from("orthophonists")
          .select("*");

        console.log("Orthophonists query result:", { orthsData, orthsError });

        if (orthsError) {
          console.error("RLS or query error:", orthsError);
          throw orthsError;
        }
        
        if (!orthsData || orthsData.length === 0) {
          console.log("No orthophonists found in table");
          setOrthophonists([]);
          setFilteredOrthophonists([]);
          return;
        }

        console.log("Found orthophonists count:", orthsData.length);

        // Fetch profile data for names
        const profileIds = orthsData.map((o: any) => o.profile_id);
        console.log("Profile IDs to fetch:", profileIds);
        
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name")
          .in("id", profileIds);

        console.log("Profiles query result:", { profiles, profileError });

        if (profileError) throw profileError;

        // Merge profile data with orthophonist data
        const merged = orthsData.map((orth: any) => {
          const profile = profiles?.find((p: any) => p.id === orth.profile_id);
          return {
            ...orth,
            firstName: profile?.first_name || "",
            lastName: profile?.last_name || "",
            clinicName: orth.clinic_name,
          };
        });

        console.log("Merged orthophonists:", merged);
        setOrthophonists(merged);
        setFilteredOrthophonists(merged);
      } catch (err) {
        console.error("Error fetching orthophonists:", err);
      } finally {
        setLoadingOrths(false);
      }
    };

    // Fetch orthophonists when we reach step 2
    if (step === 2) {
      fetchOrthophonists();
    }
  }, [step]);

  useEffect(() => {
    // Filter orthophonists based on search query
    const filtered = orthophonists.filter((orth) => {
      const fullName = `${orth.firstName} ${orth.lastName}`.toLowerCase();
      const clinic = orth.clinicName?.toLowerCase() || "";
      const city = orth.city?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || clinic.includes(query) || city.includes(query);
    });
    setFilteredOrthophonists(filtered);
  }, [searchQuery, orthophonists]);

  const TITLES = [
    t("auth.signup.parentSteps.step1"),
    t("auth.signup.parentSteps.step2"),
    t("auth.signup.parentSteps.step3"),
    t("auth.signup.parentSteps.step4"),
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
    // Step 2: Mandatory if orthophonists exist, optional if none
    if (step === 2) {
      if (orthophonists.length === 0) return true; // Allow skipping if no orthophonists exist
      return parent.orthophonistId !== null; // Mandatory when orthophonists exist
    }
    if (step === 3) {
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
            <Text >{t("auth.signup.ageRange")}</Text>
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
            <Text>{t("auth.signup.gender")}</Text>
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
          
          {/* Search Box */}
          <View className="rounded-2xl border-2 border-tk-border bg-tk-surface flex-row items-center px-4 py-3">
            <Search size={20} color={palette.textMuted} />
            <TextInput
              placeholder={t("common.search") || "Search..."}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={palette.textMuted}
              className="flex-1 ml-2 text-base text-tk-text"
              style={{
                fontFamily: getFontForLanguage(language, 'regular'),
                direction: 'rtl',
                textAlign: 'right',
              }}
            />
          </View>

          {loadingOrths ? (
            <View className="justify-center items-center py-8">
              <ActivityIndicator size="large" color={palette.green} />
            </View>
          ) : filteredOrthophonists.length === 0 ? (
            <View className="justify-center items-center py-8 gap-4">
              <Text className="text-center text-tk-text-muted">
                {searchQuery ? t("common.noResults") || "No results found" : "No orthophonists available yet"}
              </Text>
              {!searchQuery && orthophonists.length === 0 && (
                <Pressable onPress={() => { /* Continue to next step */ }}>
                  <Text
                    style={{
                      fontFamily: getFontForLanguage(language, 'semi'),
                      color: palette.blue,
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    {t("common.skip")}
                  </Text>
                </Pressable>
              )}
            </View>
          ) : (
            <ScrollView className="max-h-96">
              <View className="gap-2">
                {filteredOrthophonists.map((o) => {
                  const selected = parent.orthophonistId === o.id;
                  const fullName = `${o.firstName} ${o.lastName}`;
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
                        <Text style={{ fontFamily: getFontForLanguage(language, 'semi'), fontSize: 16 }}>
                          {fullName}
                        </Text>
                        <Text variant="caption" className="mt-1">
                          {o.clinicName} · {o.city}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      ) : null}

      {step === 3 ? (
        <View className="gap-4">
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
        </View>
      ) : null}

      {!canContinue() ? (
        <Text variant="caption" className="mt-4 text-center text-tk-text-muted">
          
        </Text>
      ) : null}
    </AuthShell>
  );
}