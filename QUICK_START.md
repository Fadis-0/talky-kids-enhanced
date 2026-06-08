# Quick Start - Language Implementation

## Installation (One-time setup)

```bash
pnpm add i18next react-i18next
```

## That's it! 🚀

The app is ready to run:
```bash
pnpm start
```

---

## Default Behavior

✅ **Arabic is the default language**
✅ **Language preference is saved automatically**
✅ **Switch languages in Settings → Language**

---

## For Developers

### Use translations in any component:

```typescript
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  
  return <Text>{t("common.appName")}</Text>;  // Works in both languages
}
```

### For RTL layouts:

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyLayout() {
  const { isRTL } = useLanguage();
  
  return <View style={{ direction: isRTL ? 'rtl' : 'ltr' }}>{/* ... */}</View>;
}
```

---

## Translation Files Location

- **English:** `locales/en.json`
- **Arabic:** `locales/ar.json`

---

## Adding New Strings

1. Add the same key to both `en.json` and `ar.json`
2. Use in component with `t("key.path")`
3. Done!

Example:
```json
// en.json
"newString": "Hello"

// ar.json
"newString": "مرحبا"
```

---

## What's Translated

✅ All auth screens
✅ Settings with language switcher
✅ Navigation labels
✅ Game data
✅ Accessibility labels

---

## Documentation Files

- **`TRANSLATION_SUMMARY.md`** - Full overview
- **`I18N_GUIDE.md`** - Complete technical guide
- **This file** - Quick reference

---

## Support Multiple Languages?

Add a new language file:
1. Create `locales/fr.json` (for French, etc.)
2. Add to `lib/i18n.ts` resources
3. Update Settings UI to show the new option

---

**Need help? Check I18N_GUIDE.md for detailed examples.**
