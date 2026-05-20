/** Central route paths for Expo Router */
export const Routes = {
  splash: "/",
  welcome: "/(auth)/welcome",
  login: "/(auth)/login",
  createAccount: "/(auth)/create-account",
  signupParent: "/(auth)/signup/parent",
  signupOrthophonist: "/(auth)/signup/orthophonist",
  tabs: "/(tabs)",
  settings: "/(tabs)/settings",
  lettersGame: "/letters-game",
} as const;