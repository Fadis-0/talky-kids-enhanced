# Complete Translation Implementation Guide

## ✅ ALREADY TRANSLATED (Don't need changes)
- ✅ Auth screens (welcome, login, create-account, parent signup, orthophonist signup)
- ✅ Settings screen with language switcher
- ✅ Navigation (top bar, tab bar)
- ✅ 404 screen

---

## 📋 SCREENS THAT NEED TRANSLATION (With Translation Keys Already Prepared)

### 1. **Home Tab Screen** - `app/(tabs)/index.tsx`

**Translation Keys Already Prepared in locales:**
```json
"tabs.home.title": "Ready to practice?",
"tabs.home.subtitle": "Warm up your voice with fun mouth and speaking games.",
"tabs.home.dailyPractice": "Daily practice",
"tabs.home.startSession": "Start a session",
"tabs.home.dailyDesc": "Games for speaking and mouth movements...",
"tabs.home.exploreGames": "Explore Games",
"tabs.home.lettersGame": "Letters Game",
"tabs.home.videoQuestions": "Video Questions",
"tabs.home.notStarted": "Not started yet",
"tabs.home.completed": "Completed! 🎉",
"tabs.home.streakDay": "{{streak}} Day Streak"
```

**How to implement:**
```typescript
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  
  // Replace hardcoded strings with t() calls:
  // "Ready to practice?" → t("tabs.home.title")
  // "Warm up your voice..." → t("tabs.home.subtitle")
  // And so on...
}
```

---

### 2. **Stats Tab Screen** - `app/(tabs)/stats.tsx`

**Translation Keys Already Prepared:**
```json
"tabs.stats.title": "Your progress",
"tabs.stats.subtitle": "Track streaks, minutes practiced, and milestones.",
"tabs.stats.dayStreak": "Day streak",
"tabs.stats.minutes": "Minutes",
"tabs.stats.goalsMet": "Goals met",
"tabs.stats.insights": "Insights",
"tabs.stats.weeklyGoalsTitle": "Weekly goals",
"tabs.stats.practiceHistoryTitle": "Practice history",
"tabs.stats.achievementsTitle": "Achievements"
```

---

### 3. **Notifications Tab Screen** - `app/(tabs)/notifications.tsx`

**Translation Keys Already Prepared:**
```json
"tabs.notifications.title": "Inbox",
"tabs.notifications.subtitle": "Reminders, cheers, and tips from Talky Kids.",
"tabs.notifications.empty": "All caught up!",
"tabs.notifications.emptyDesc": "Practice reminders...",
"tabs.notifications.milestones": "Milestone celebrations",
"tabs.notifications.nudges": "Gentle practice nudges"
```

---

### 4. **Letters Game Screen** - `app/letters-game.tsx`

**Translation Keys Already Prepared:**
```json
"games.letters.title": "Letters Game",
"games.letters.subtitle": "Learn to pronounce with fun!",
"games.letters.levelFormat": "Level {{level}} of {{total}}",
"games.levelHeader": "Level {{levelNumber}} of {{totalLevels}}",
"games.progress": "{{progress}}%"
```

**Letter Words (26 sets of 3 words each):**
```json
"letters": {
  "A": ["Apple", "Ant", "Arrow"],
  "B": ["Ball", "Balloon", "Banana"],
  // ... all 26 letters with 3 words each
}
```

---

### 5. **Video Questions Screen** - `app/video-questions.tsx`

**Translation Keys Already Prepared:**
```json
"games.video.title": "Video Questions",
"games.video.subtitle": "Watch and answer!",
"videoQuestions": {
  "question1": "What animal do you see in the video?",
  "question2": "What color is the ball?",
  // ... 8 questions total
}
```

---

### 6. **Balloon Game Screen** - `app/balloon-game.tsx`

**Translation Keys Already Prepared:**
```json
"balloonGame": {
  "level1": "Easy peasy! 🎈",
  "level2": "A bit harder! 💨",
  // ... 10 levels total
}
```

---

### 7. **Candles Game Screen** - `app/candles-game.tsx`

**Translation Keys Already Prepared:**
```json
"candlesGame": {
  "level1": "Make a wish! 🎂",
  "level2": "Double trouble! 🕯️🕯️",
  // ... 6 levels total
}
```

---

## 🚀 HOW TO ADD TRANSLATIONS (Step-by-Step)

### **Method 1: For Simple Text Replacement (Like Home Screen)**

1. **Add import at top of file:**
   ```typescript
   import { useTranslation } from 'react-i18next';
   ```

2. **Inside your component, add:**
   ```typescript
   const { t } = useTranslation();
   ```

3. **Replace each string:**
   ```typescript
   // Old:
   <Text>Ready to practice?</Text>
   
   // New:
   <Text>{t("tabs.home.title")}</Text>
   ```

### **Method 2: For Dynamic Game Level Labels**

In game screens, you might have arrays of levels. Example for Balloon Game:

```typescript
import { useTranslation } from 'react-i18next';

export default function BalloonGameScreen() {
  const { t } = useTranslation();
  
  const getLevelLabel = (levelNumber: number) => {
    const key = `balloonGame.level${levelNumber}`;
    return t(key);
  };
  
  // Then use:
  const label = getLevelLabel(1); // Returns "Easy peasy! 🎈" or Arabic equivalent
}
```

### **Method 3: For Array Data (Like Letters Game)**

For the 26 letters with 3 words each:

```typescript
import { useTranslation } from 'react-i18next';

export default function LettersGameScreen() {
  const { t } = useTranslation();
  
  const getLetterWords = (letter: string) => {
    // Access the translation directly
    const words = t(`letters.${letter}`, { returnObjects: true });
    return words; // Returns array like ["Apple", "Ant", "Arrow"]
  };
  
  const appleWords = getLetterWords('A'); // ["Apple", "Ant", "Arrow"] in English
}
```

---

## 📊 PRIORITY ORDER (Easiest to Hardest)

1. **Stats Screen** - Simple title and label replacements (5 min)
2. **Notifications Screen** - Simple title and label replacements (3 min)
3. **Home Screen** - More text, but straightforward (10 min)
4. **Letters Game** - Simple level format, but lots of words (15 min)
5. **Video Questions** - Questions text (5 min)
6. **Balloon Game** - Level labels (5 min)
7. **Candles Game** - Level labels (5 min)

**Total time: ~45 minutes to complete all screens**

---

## ✅ VERIFICATION CHECKLIST

After adding translations to each screen:

- [ ] Import `useTranslation` from 'react-i18next'
- [ ] Call `const { t } = useTranslation();` inside component
- [ ] Replace all hardcoded strings with `t("key.path")`
- [ ] Test in English (bottom right Settings → Language → English)
- [ ] Test in Arabic (bottom right Settings → Language → العربية)
- [ ] Verify text fits the UI in both languages
- [ ] Check for typos in translation keys (exact case-sensitive match)

---

## 🔍 HOW TO FIND HARDCODED STRINGS IN YOUR CODE

Search your component file for any quoted strings that appear in the UI:

```typescript
// These need translation:
<Text>Ready to practice?</Text>  ❌
<Text>{t("tabs.home.title")}</Text>  ✅

// Translation keys with variables:
`Step ${step + 1} of ${STEPS}`  ❌
t("auth.signup.stepCounter", { step: step + 1, total: STEPS })  ✅
```

---

## 📝 EXAMPLE: Complete Home Screen Translation

**Before (Old Code):**
```typescript
export default function HomeScreen() {
  return (
    <ScreenShell
      title="Ready to practice?"
      subtitle="Warm up your voice with fun mouth and speaking games."
    >
      <Text>Explore Games</Text>
      <Text>Letters Game</Text>
      <Text>Not started yet</Text>
    </ScreenShell>
  );
}
```

**After (With Translation):**
```typescript
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  
  return (
    <ScreenShell
      title={t("tabs.home.title")}
      subtitle={t("tabs.home.subtitle")}
    >
      <Text>{t("tabs.home.exploreGames")}</Text>
      <Text>{t("tabs.home.lettersGame")}</Text>
      <Text>{t("tabs.home.notStarted")}</Text>
    </ScreenShell>
  );
}
```

---

## 🎯 NEXT STEPS

1. ✅ **Font issue FIXED** - Arabic now uses Fredoka font
2. 📋 **Choose a screen** from the list above
3. 🔍 **Find all hardcoded strings** in that file
4. 🔄 **Replace with t() calls** using keys from locales
5. ✅ **Test in both languages**
6. 🔁 **Repeat for next screen**

---

## ❓ QUICK REFERENCE

| Screen | File | Est. Time | Keys |
|--------|------|-----------|------|
| Home | `app/(tabs)/index.tsx` | 10 min | tabs.home.* |
| Stats | `app/(tabs)/stats.tsx` | 5 min | tabs.stats.* |
| Notifications | `app/(tabs)/notifications.tsx` | 3 min | tabs.notifications.* |
| Letters Game | `app/letters-game.tsx` | 15 min | games.*, letters.* |
| Video Questions | `app/video-questions.tsx` | 5 min | videoQuestions.* |
| Balloon Game | `app/balloon-game.tsx` | 5 min | balloonGame.* |
| Candles Game | `app/candles-game.tsx` | 5 min | candlesGame.* |

All translation keys already exist in `locales/en.json` and `locales/ar.json` ✅

---

## 💡 Pro Tips

1. **Copy-paste is your friend** - Use the same key structure
2. **Test both languages** - Don't assume it looks right
3. **Check text length** - Arabic text might be longer
4. **Use RTL layouts** - For Arabic, use `useLanguage().isRTL`
5. **Keep keys organized** - Use the namespace system (tabs.home.*, games.*)

Start with the **Stats Screen** - it's the easiest! 🚀
