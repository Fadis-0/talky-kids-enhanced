import { BellOff, MessageCircle, PartyPopper } from "lucide-react-native";
import { View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

export default function NotificationsScreen() {
  return (
    <ScreenShell
      title="Inbox"
      subtitle="Reminders, cheers, and tips from Talky Kids."
      accent="purple"
    >
      <View className="-mt-2">
        <Card className="items-center px-6 py-10">
          <View
            className="mb-4 h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: palette.purpleLight }}
          >
            <BellOff size={32} color={palette.purple} strokeWidth={2.25} />
          </View>
          <Text variant="title" className="text-center text-lg">
            All caught up!
          </Text>
          <Text variant="body" className="mt-2 text-center">
            Practice reminders and celebration messages will appear here.
          </Text>
        </Card>

        <View className="mt-6 gap-3">
          <Text variant="label" className="px-1">
            You will see
          </Text>
          {[
            {
              icon: PartyPopper,
              text: "Milestone celebrations",
              color: palette.orange,
              bg: palette.orangeLight,
            },
            {
              icon: MessageCircle,
              text: "Gentle practice nudges",
              color: palette.blue,
              bg: palette.blueLight,
            },
          ].map((item) => (
            <View
              key={item.text}
              className="flex-row items-center gap-3 rounded-2xl border-2 border-tk-border bg-tk-surface px-4 py-3"
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={20} color={item.color} strokeWidth={2.25} />
              </View>
              <Text variant="subtitle" className="flex-1 text-tk-text">
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenShell>
  );
}