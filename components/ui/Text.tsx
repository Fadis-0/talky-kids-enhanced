import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/cn";
import { getFontForLanguage } from "@/lib/theme";

type Variant = "hero" | "title" | "subtitle" | "body" | "caption" | "label";

const getVariantStyle = (variant: Variant, language: 'en' | 'ar') => {
  const styleMap: Record<Variant, { weight: 'bold' | 'semi' | 'regular' }> = {
    hero: { weight: 'bold' },
    title: { weight: 'bold' },
    subtitle: { weight: 'regular' },
    body: { weight: 'regular' },
    caption: { weight: 'regular' },
    label: { weight: 'semi' },
  };

  const fontWeight = styleMap[variant].weight;
  return { fontFamily: getFontForLanguage(language, fontWeight) };
};

const variantClass: Record<Variant, string> = {
  hero: "font-display text-[28px] leading-9 text-tk-text",
  title: "font-display text-[22px] leading-8 text-tk-text",
  subtitle: "font-body text-base leading-6 text-tk-text-secondary",
  body: "font-body-regular text-base leading-6 text-tk-text-secondary",
  caption: "font-body text-sm leading-5 text-tk-text-muted",
  label: "font-display-semi text-xs uppercase tracking-wide text-tk-text-muted",
};

type AppTextProps = RNTextProps & {
  variant?: Variant;
  className?: string;
};

export function Text({
  variant = "body",
  className,
  style,
  ...props
}: AppTextProps) {
  const { language } = useLanguage();
  
  return (
    <RNText
      className={cn(variantClass[variant], className)}
      style={[getVariantStyle(variant, language), style]}
      {...props}
    />
  );
}