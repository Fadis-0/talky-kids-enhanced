import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="parent" />
      <Stack.Screen name="orthophonist" />
    </Stack>
  );
}