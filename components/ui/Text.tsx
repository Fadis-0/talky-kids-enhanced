import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { cn } from "@/lib/cn";
import { fonts } from "@/lib/theme";

type Variant = "hero" | "title" | "subtitle" | "body" | "caption" | "label";

const variantClass: Record<Variant, string> = {
  hero: "font-display text-[28px] leading-9 text-tk-text",
  title: "font-display text-[22px] leading-8 text-tk-text",
  subtitle: "font-body text-base leading-6 text-tk-text-secondary",
  body: "font-body-regular text-base leading-6 text-tk-text-secondary",
  caption: "font-body text-sm leading-5 text-tk-text-muted",
  label: "font-display-semi text-xs uppercase tracking-wide text-tk-text-muted",
};

const variantStyle: Record<Variant, { fontFamily: string }> = {
  hero: { fontFamily: fonts.displayBold },
  title: { fontFamily: fonts.displayBold },
  subtitle: { fontFamily: fonts.body },
  body: { fontFamily: fonts.bodyRegular },
  caption: { fontFamily: fonts.body },
  label: { fontFamily: fonts.displaySemi },
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
  return (
    <RNText
      className={cn(variantClass[variant], className)}
      style={[variantStyle[variant], style]}
      {...props}
    />
  );
}