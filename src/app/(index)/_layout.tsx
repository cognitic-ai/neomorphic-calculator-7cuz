import { Stack } from "expo-router";
import * as AC from "@bacons/apple-colors";

const AppleStackPreset =
  process.env.EXPO_OS === "ios"
    ? {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      }
    : {};

export default function Layout() {
  return (
    <Stack screenOptions={AppleStackPreset}>
      <Stack.Screen
        name="index"
        options={{
          title: "Calculator",
          headerLargeTitle: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
