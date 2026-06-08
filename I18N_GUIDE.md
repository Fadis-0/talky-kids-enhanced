# i18n Implementation Guide - Talky Kids

## Overview

The Talky Kids app now has a complete internationalization (i18n) system with **Arabic as the default language** and English as an alternative. Users can switch languages at any time from the Settings screen.

## Architecture & File Structure

### Core Files

1. **`locales/en.json`** - English translations
2. **`locales/ar.json`** - Arabic translations (default)
3. **`lib/i18n.ts`** - i18n configuration and initialization
4. **`contexts/LanguageContext.tsx`** - Language state management and persistence
5. **`app/_layout.tsx`** - Root layout with LanguageProvider wrapper

### Translation Organization

Translations are organized hierarchically by feature/namespace:

```
{
  "common": { /* Universal labels like buttons, common words */ },
  "auth": { 
    "welcome": { /* Welcome screen */ },
    "login": { /* Login screen */ },
    "createAccount": { /* Create account screen */ },
    "signup": { /* Signup screens for both roles */ }
  },
  "tabs": {
    "home": { /* Home tab screen */ },
    "stats": { /* Stats tab screen */ },
    "notifications": { /* Notifications tab screen */ },
    "settings": { /* Settings tab screen */ }
  },
  "games": { /* Game UI elements */ },
  "letters": { /* Letter words for letters game */ },
  "balloonGame": { /* Balloon game levels */ },
  "candlesGame": { /* Candles game levels */ },
  "videoQuestions": { /* Video question prompts */ },
  "notFound": { /* 404 screen */ },
  "tabAccess": { /* Accessibility labels for tabs */ },
  "accessibilityLabels": { /* All a11y labels */ }
}
```

## Usage Examples

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <Text>{t("common.appName")}</Text>  // "Talky Kids" or "أطفال تاكي"
  );
}
```

### Using the Language Context

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage();

  const switchToArabic = () => setLanguage('ar');
  const switchToEnglish = () => setLanguage('en');

  // isRTL is true when language is 'ar'
  return (
    <View style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* RTL/LTR layout */}
    </View>
  );
}
```

### Interpolation (Dynamic Variables)

```typescript
// Translation key in JSON:
// "auth.signup.stepCounter": "Step {{step}} of {{total}}"

const stepText = t("auth.signup.stepCounter", { step: 2, total: 5 });
// Result: "Step 2 of 5" or "الخطوة 2 من 5"
```

## Adding New Translations

### Step 1: Add to Both Translation Files

**`locales/en.json`:**
```json
{
  "newFeature": {
    "title": "My Feature Title",
    "description": "My feature description"
  }
}
```

**`locales/ar.json`:**
```json
{
  "newFeature": {
    "title": "عنوان الميزة الخاصة بي",
    "description": "وصف الميزة الخاصة بي"
  }
}
```

### Step 2: Use in Component

```typescript
import { useTranslation } from 'react-i18next';

export default function MyFeature() {
  const { t } = useTranslation();

  return (
    <>
      <Text>{t("newFeature.title")}</Text>
      <Text>{t("newFeature.description")}</Text>
    </>
  );
}
```

## Language Persistence

- Language preference is automatically saved to **localStorage** (web) or device storage (native)
- The app loads the saved language preference on startup
- If no preference is saved, **Arabic (ar)** is used as the default
- Language persists across app restarts

## RTL Support

### For Arabic Content

1. Use the `useLanguage()` hook to check `isRTL`
2. Set `direction` style to "rtl" when language is Arabic

```typescript
const { isRTL } = useLanguage();

<View style={{ direction: isRTL ? 'rtl' : 'ltr', alignItems: 'flex-start' }}>
  {/* Content automatically aligns right for RTL */}
</View>
```

### NativeWind Support

NativeWind automatically handles RTL if you use `direction-rtl` and `direction-ltr` classes (when available).

## Font Support

### Arabic Fonts

The app is configured to use **Cairo** font for Arabic text, which is similar in style to Fredoka (used for English).

Font files are located in `assets/fonts/`:
- `Cairo-Regular.ttf`
- `Cairo-Bold.ttf`
- `Cairo-SemiBold.ttf`

To use Arabic fonts in components:
```typescript
<Text style={{ fontFamily: 'Cairo_400Regular' }}>
  {t("arabic.text")}
</Text>
```

## Completed Translations

- ✅ All auth screens (welcome, login, signup)
- ✅ Settings screen with language switcher
- ✅ Navigation labels (bottom tabs, top nav)
- ✅ Not Found (404) screen
- ✅ All game data (letters, balloon, candles, video questions)
- ✅ Common UI labels
- ✅ Accessibility labels

## Partially Translated (Text Keys Prepared)

- Tab screens (home, stats, notifications) - Keys available, need component updates
- Game screens (letters-game, video-questions, balloon-game, candles-game) - Keys available, need component updates

## Environment Setup

### Required Dependencies

```bash
pnpm add i18next react-i18next
```

### Already Included

- i18n configuration in `lib/i18n.ts`
- LanguageProvider in root layout
- Translation files in `locales/`

## Best Practices

1. **Never hardcode strings** - Always use `t()` function
2. **Organize by feature** - Keep related translations in the same namespace
3. **Use semantic keys** - Use `auth.welcome.title` not `page1_heading`
4. **Keep translations updated** - Always add to BOTH en.json and ar.json
5. **Test both languages** - Verify text fits UI in both languages
6. **Use the language context** for RTL layout adjustments
7. **Document complex keys** - Add comments for interpolated strings

## Language Switcher Location

The language switcher is available in:
- **Settings Screen** (`app/(tabs)/settings.tsx`)
- Available as a dropdown/expandable section with radio buttons
- Shows current language
- Allows instant switching between Arabic and English

## Troubleshooting

### Translations not updating?
- Check if key exists in both `en.json` and `ar.json`
- Ensure correct key path (e.g., `"tabs.settings.language"`)
- Check for typos in `t()` function calls

### Font not appearing for Arabic?
- Verify Cairo fonts are in `assets/fonts/`
- Ensure `app.json` has font plugin configured
- Check `fontFamily` matches exported font name

### RTL layout issues?
- Use `direction: 'rtl'` in style for Arabic
- Test with flexbox and ensure `alignItems` behavior
- Check text alignment (`textAlign: 'right'` for Arabic)

## Future Enhancements

1. Add more languages (French, Spanish, etc.)
2. Implement language detection based on device locale
3. Add language-specific number formatting
4. Add language-specific date formatting
5. Translation management UI for admins

## File Dependencies

- `app/_layout.tsx` → imports and initializes i18n
- All screens/components → use `useTranslation()` hook
- Settings screen → uses `useLanguage()` for switching
- Navigation components → dynamically generate labels from translations
