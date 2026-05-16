import { Flame, Mic, Sparkles } from "lucide-react-native";
import { View } from "react-native";

import { ScreenShell } from "@/components/ScreenShell";
import { Card } from "@/components/ui/Card";
import { EmptyStateCard } from "@/components/ui/EmptyStateCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Text } from "@/components/ui/Text";
import { palette } from "@/lib/theme";

function StreakBadge() {
  return (
    <View className="flex-row items-center gap-1.5 rounded-full border-2 border-tk-border bg-tk-surface px-3 py-2">
      <Flame size={20} color={palette.orange} fill={palette.orangeLight} />
      <Text
        style={{
          fontFamily: "Fredoka_700Bold",
          fontSize: 15,
          color: palette.orange,
        }}
      >
        0
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScreenShell
      title="Ready to practice?"
      subtitle="Warm up your voice with fun mouth and speaking games."
      accent="green"
      headerRight={<StreakBadge />}
    >
      <View className="-mt-2 gap-4">
        <Card className="overflow-hidden border-tk-green p-0">
          <View className="bg-tk-green-light px-5 py-4">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-tk-green">
                <Mic size={26} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View className="flex-1">
                <Text variant="label" className="text-tk-green-dark">
                  Daily practice
                </Text>
                <Text variant="title" className="text-lg">
                  Start a session
                </Text>
              </View>
              <Sparkles size={22} color={palette.green} />
            </View>
          </View>
          <View className="gap-3 p-5">
            <Text variant="body">
              Games for speaking and mouth movements are on the way. Tap below to
              preview the flow.
            </Text>
            <PrimaryButton
              label="CONTINUE"
              color="green"
              accessibilityLabel="Continue to practice"
            />
          </View>
        </Card>

        <Text variant="label" className="px-1">
          Coming soon
        </Text>

        <EmptyStateCard
          icon={Mic}
          title="Speaking games"
          description="Playful exercises to build confidence with sounds and words."
          iconColor={palette.green}
          iconBg={palette.greenLight}
        />
        <EmptyStateCard
          icon={Sparkles}
          title="Mouth movement"
          description="Mirror-friendly prompts for lips, tongue, and breath."
          iconColor={palette.blue}
          iconBg={palette.blueLight}
        />
      </View>
    </ScreenShell>
  );
}
