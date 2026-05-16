import { ReactNode } from "react";
import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
};

export function Card({ children, className, bordered = true }: CardProps) {
  return (
    <View
      className={cn(
        "overflow-hidden rounded-2xl bg-tk-surface",
        bordered && "border-2 border-tk-border",
        className,
      )}
    >
      {children}
    </View>
  );
}

type CardPressableProps = CardProps &
  Pick<PressableProps, "onPress" | "accessibilityLabel" | "accessibilityRole">;

export function CardPressable({
  children,
  className,
  bordered = true,
  onPress,
  accessibilityLabel,
}: CardPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={cn("active:opacity-90", className)}
    >
      {({ pressed }) => (
        <Card
          bordered={bordered}
          className={pressed ? "border-tk-green-dark" : undefined}
        >
          {children}
        </Card>
      )}
    </Pressable>
  );
}