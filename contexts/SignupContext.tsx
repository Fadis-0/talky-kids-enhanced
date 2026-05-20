import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

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
};

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [parent, setParentState] = useState(emptyParentSignup);
  const [orthophonist, setOrthoState] = useState(emptyOrthophonistSignup);

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
      },
    }),
    [role, parent, orthophonist],
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