import { Tabs } from "expo-router";

import { TalkyTabBar } from "@/components/navigation/TalkyTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TalkyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
