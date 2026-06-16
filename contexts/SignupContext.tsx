import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";

import {
  emptyOrthophonistSignup,
  emptyParentSignup,
  type OrthophonistSignupData,
  type ParentSignupData,
  type UserRole,
} from "@/lib/auth-types";

type SignupContextValue = {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  parent: ParentSignupData;
  setParent: (patch: Partial<ParentSignupData>) => void;
  orthophonist: OrthophonistSignupData;
  setOrthophonist: (patch: Partial<OrthophonistSignupData>) => void;
  reset: () => void;
  submitParentSignup: () => Promise<void>;
  submitOrthophonistSignup: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [parent, setParentState] = useState(emptyParentSignup);
  const [orthophonist, setOrthoState] = useState(emptyOrthophonistSignup);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitParentSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: parent.email,
        password: parent.password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("No user returned after signup");

      const userId = data.user.id;

      // Insert profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        role: "parent",
        first_name: parent.firstName,
        last_name: parent.lastName,
        phone: parent.phone,
      });
      if (profileError) throw profileError;

      // Insert kid
      const { data: kidData, error: kidError } = await supabase.from("kids").insert({
        parent_id: userId,
        name: parent.kidName,
        age_range: parent.kidAge,
        gender: parent.kidGender,
        orthophonist_id: parent.orthophonistId,
      }).select().single();
      if (kidError) throw kidError;

      // Insert kid_stats
      const { error: statsError } = await supabase.from("kid_stats").insert({
        kid_id: kidData.id,
      });
      if (statsError) throw statsError;

    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitOrthophonistSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: orthophonist.email,
        password: orthophonist.password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("No user returned after signup");

      const userId = data.user.id;

      // Insert profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        role: "orthophonist",
        first_name: orthophonist.firstName,
        last_name: orthophonist.lastName,
        phone: orthophonist.phone,
      });
      if (profileError) throw profileError;

      // Insert orthophonist details
      const { error: orthoError } = await supabase.from("orthophonists").insert({
        profile_id: userId,
        clinic_name: orthophonist.clinicName,
        license_number: orthophonist.licenseNumber,
        city: orthophonist.city,
        professional_email: orthophonist.professionalEmail,
      });
      if (orthoError) throw orthoError;

    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo<SignupContextValue>(
    () => ({
      role,
      setRole,
      parent,
      setParent: (patch) => setParentState((p) => ({ ...p, ...patch })),
      orthophonist,
      setOrthophonist: (patch) => setOrthoState((o) => ({ ...o, ...patch })),
      reset: () => {
        setRole(null);
        setParentState(emptyParentSignup());
        setOrthoState(emptyOrthophonistSignup());
        setError(null);
      },
      submitParentSignup,
      submitOrthophonistSignup,
      isLoading,
      error,
    }),
    [role, parent, orthophonist, isLoading, error],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used within SignupProvider");
  return ctx;
}