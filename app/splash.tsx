import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { AnimatedSplash } from "@/components/splash/AnimatedSplash";
import { Routes } from "@/lib/routes";

export default function SplashRoute() {
  const navigated = useRef(false);

  const goToAuth = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    router.replace(Routes.welcome);
  }, []);

  return (
    <View style={styles.root}>
      <AnimatedSplash onFinish={goToAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});
