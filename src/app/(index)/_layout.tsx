import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
    ? {
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };

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
