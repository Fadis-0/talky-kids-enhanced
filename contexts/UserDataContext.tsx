import { createContext, useContext, useEffect, useMemo, useState, useRef, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

export type UserData = {
  name: string;
  parentName: string;
  streakDays: number;
  lastPracticeDate: string | null;
  gender?: "male" | "female" | null;
  lettersGameLevel: number;
  videoQuestionsGameLevel: number;
  balloonGameLevel: number;
  candlesGameLevel: number;
  questionsPlacesLevel: number;
  questionsSizesLevel: number;
  questionsColorsLevel: number;
  questionsInteractiveLevel: number;
};

const defaultUserData: UserData = {
  name: "Buddy",
  parentName: "Parent",
  streakDays: 0,
  lastPracticeDate: null,
  gender: "male",
  lettersGameLevel: 0,
  videoQuestionsGameLevel: 0,
  balloonGameLevel: 0,
  candlesGameLevel: 0,
  questionsPlacesLevel: 0,
  questionsSizesLevel: 0,
  questionsColorsLevel: 0,
  questionsInteractiveLevel: 0,
};

type UserDataContextValue = {
  user: UserData;
  setUser: (patch: Partial<UserData>) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
};

const UserDataContext = createContext<UserDataContextValue | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [user, setUserState] = useState<UserData>(defaultUserData);
  const kidIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!authUser) {
      setUserState(defaultUserData);
      kidIdRef.current = null;
      return;
    }

    const fetchData = async () => {
      let currentParentName = defaultUserData.parentName;
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();
        
      if (profileData) {
        currentParentName = `${profileData.first_name || ""} ${profileData.last_name || ""}`.trim();
      }

      const { data: kidsData } = await supabase
        .from("kids")
        .select("*")
        .eq("parent_id", authUser.id)
        .limit(1);

      if (kidsData && kidsData.length > 0) {
        const kid = kidsData[0];
        kidIdRef.current = kid.id;

        const { data: statsData } = await supabase
          .from("kid_stats")
          .select("*")
          .eq("kid_id", kid.id)
          .single();

        if (statsData) {
          setUserState({
            name: kid.name,
            parentName: currentParentName,
            gender: kid.gender,
            streakDays: statsData.streak_days,
            lastPracticeDate: statsData.last_practice_date,
            lettersGameLevel: statsData.letters_game_level,
            videoQuestionsGameLevel: statsData.video_questions_game_level,
            balloonGameLevel: statsData.balloon_game_level,
            candlesGameLevel: statsData.candles_game_level,
            questionsPlacesLevel: statsData.questions_places_level,
            questionsSizesLevel: statsData.questions_sizes_level,
            questionsColorsLevel: statsData.questions_colors_level,
            questionsInteractiveLevel: statsData.questions_interactive_level,
          });
        } else {
            setUserState(prev => ({ ...prev, name: kid.name, parentName: currentParentName, gender: kid.gender }));
        }
      }
    };

    fetchData();
  }, [authUser]);

  const handleSetUser = async (patch: Partial<UserData>) => {
    setUserState((u) => ({ ...u, ...patch }));
    const currentKidId = kidIdRef.current;
    if (!currentKidId) return;

    const updates: any = {};
    if (patch.lettersGameLevel !== undefined) updates.letters_game_level = patch.lettersGameLevel;
    if (patch.videoQuestionsGameLevel !== undefined) updates.video_questions_game_level = patch.videoQuestionsGameLevel;
    if (patch.balloonGameLevel !== undefined) updates.balloon_game_level = patch.balloonGameLevel;
    if (patch.candlesGameLevel !== undefined) updates.candles_game_level = patch.candlesGameLevel;
    if (patch.questionsPlacesLevel !== undefined) updates.questions_places_level = patch.questionsPlacesLevel;
    if (patch.questionsSizesLevel !== undefined) updates.questions_sizes_level = patch.questionsSizesLevel;
    if (patch.questionsColorsLevel !== undefined) updates.questions_colors_level = patch.questionsColorsLevel;
    if (patch.questionsInteractiveLevel !== undefined) updates.questions_interactive_level = patch.questionsInteractiveLevel;
    
    if (Object.keys(updates).length > 0) {
      await supabase.from("kid_stats").update(updates).eq("kid_id", currentKidId);
    }
  };

  const handleIncrementStreak = async () => {
    const now = new Date().toISOString();
    setUserState((u) => ({
      ...u,
      streakDays: u.streakDays + 1,
      lastPracticeDate: now,
    }));
    
    const currentKidId = kidIdRef.current;
    if (!currentKidId) return;
    
    await supabase.from("kid_stats").update({
      streak_days: user.streakDays + 1,
      last_practice_date: now
    }).eq("kid_id", currentKidId);
  };

  const handleResetStreak = async () => {
    setUserState((u) => ({
      ...u,
      streakDays: 0,
      lastPracticeDate: null,
    }));
    
    const currentKidId = kidIdRef.current;
    if (!currentKidId) return;
    
    await supabase.from("kid_stats").update({
      streak_days: 0,
      last_practice_date: null
    }).eq("kid_id", currentKidId);
  };

  const value = useMemo<UserDataContextValue>(
    () => ({
      user,
      setUser: handleSetUser,
      incrementStreak: handleIncrementStreak,
      resetStreak: handleResetStreak,
    }),
    [user], // Only user dependency needed now, kidId is accessed via ref
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
