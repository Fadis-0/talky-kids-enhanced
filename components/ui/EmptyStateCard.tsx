import { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

type EmptyStateCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBg?: string;
};

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  iconColor = palette.blue,
  iconBg = palette.blueLight,
}: EmptyStateCardProps) {
  return (
    <Card className="p-5">
      <View className="flex-row items-center gap-4">
        <View
          className="h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={28} color={iconColor} strokeWidth={2.25} />
        </View>
        <View className="flex-1">
          <Text variant="title" className="text-lg">
            {title}
          </Text>
          <Text variant="body" className="mt-1">
            {description}
          </Text>
        </View>
      </View>
    </Card>
  );
}