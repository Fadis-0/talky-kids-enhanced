import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserData = {
  name: string;
  streakDays: number;
  lastPracticeDate: string | null;
  gender?: "male" | "female" | null;
  lettersGameLevel: number;
  videoQuestionsGameLevel: number;
};

const defaultUserData: UserData = {
  name: "Buddy",
  streakDays: 0,
  lastPracticeDate: null,
  gender: "male",
  lettersGameLevel: 0,
  videoQuestionsGameLevel: 0,
};

type UserDataContextValue = {
  user: UserData;
  setUser: (patch: Partial<UserData>) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
};

const UserDataContext = createContext<UserDataContextValue | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserData>(defaultUserData);

  const value = useMemo<UserDataContextValue>(
    () => ({
      user,
      setUser: (patch) => setUserState((u) => ({ ...u, ...patch })),
      incrementStreak: () => {
        setUserState((u) => ({
          ...u,
          streakDays: u.streakDays + 1,
          lastPracticeDate: new Date().toISOString(),
        }));
      },
      resetStreak: () => {
        setUserState((u) => ({
          ...u,
          streakDays: 0,
          lastPracticeDate: null,
        }));
      },
    }),
    [user],
  );

  return (
    <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
}
