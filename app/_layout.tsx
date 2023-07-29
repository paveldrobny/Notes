import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  useTheme,
} from "react-native-paper";
import Colors from "../constants/Colors";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context";
import React from "react";

// Pavel Drobny
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

// Parse.setAsyncStorage(AsyncStorage);
// Parse.initialize(
//   "yxPnWbQX9w1aSveJmbTIEJyWJUO7Lg4emp6rEmSX",
//   "7JUESLrz0P2ALkZBtUIPLi1XJ7IN1ItWySclh5lU"
// );
// Parse.serverURL = "https://parseapi.back4app.com/";

const lightTheme = {
  ...MD3LightTheme,

  roundness: 2,

  colors: {
    primary: "rgb(0, 85, 211)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(218, 226, 255)",
    onPrimaryContainer: "rgb(0, 24, 72)",
    secondary: "rgb(88, 94, 113)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(220, 226, 249)",
    onSecondaryContainer: "rgb(21, 27, 44)",
    tertiary: "rgb(115, 84, 113)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(254, 214, 249)",
    onTertiaryContainer: "rgb(43, 18, 43)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(254, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(254, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(225, 226, 236)",
    onSurfaceVariant: "rgb(69, 70, 79)",
    outline: "rgb(117, 119, 128)",
    outlineVariant: "rgb(197, 198, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(242, 240, 244)",
    inversePrimary: "rgb(178, 197, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(241, 243, 253)",
      level2: "rgb(234, 238, 252)",
      level3: "rgb(226, 233, 250)",
      level4: "rgb(224, 231, 250)",
      level5: "rgb(218, 228, 249)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(46, 48, 56, 0.4)",
  },
};

const darkTheme = {
  ...MD3DarkTheme,

  roundness: 2,

  colors: {
    primary: "rgb(178, 197, 255)",
    onPrimary: "rgb(0, 43, 116)",
    primaryContainer: "rgb(0, 64, 162)",
    onPrimaryContainer: "rgb(218, 226, 255)",
    secondary: "rgb(192, 198, 221)",
    onSecondary: "rgb(42, 48, 66)",
    secondaryContainer: "rgb(64, 70, 89)",
    onSecondaryContainer: "rgb(220, 226, 249)",
    tertiary: "rgb(225, 187, 220)",
    onTertiary: "rgb(66, 39, 65)",
    tertiaryContainer: "rgb(90, 61, 89)",
    onTertiaryContainer: "rgb(254, 214, 249)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(27, 27, 31)",
    onBackground: "rgb(228, 226, 230)",
    surface: "rgb(27, 27, 31)",
    onSurface: "rgb(228, 226, 230)",
    surfaceVariant: "rgb(69, 70, 79)",
    onSurfaceVariant: "rgb(197, 198, 208)",
    outline: "rgb(143, 144, 154)",
    outlineVariant: "rgb(69, 70, 79)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(228, 226, 230)",
    inverseOnSurface: "rgb(48, 48, 52)",
    inversePrimary: "rgb(0, 85, 211)",
    elevation: {
      level0: "transparent",
      level1: "rgb(35, 36, 42)",
      level2: "rgb(39, 41, 49)",
      level3: "rgb(44, 46, 56)",
      level4: "rgb(45, 47, 58)",
      level5: "rgb(48, 51, 62)",
    },
    surfaceDisabled: "rgba(228, 226, 230, 0.12)",
    onSurfaceDisabled: "rgba(228, 226, 230, 0.38)",
    backdrop: "rgba(46, 48, 56, 0.4)",
  },
};

function RootLayoutNav() {
  const theme = useTheme();
  const [currentID, setCurrentID] = React.useState<string>("");
  const [isDarkTheme, setDarkTheme] = React.useState<boolean>(false);
  const [isHideDesc, setHideDesc] = React.useState<boolean>(false);
  const [isHeaderLeft, setHeaderLeft] = React.useState<boolean>(false);
  const [isAnimation, setAnimation] = React.useState<boolean>(false);

  // DEV
  const [isHeaderShadow, setHeaderShadow] = React.useState<boolean>(false);

  return (
    <>
      <PaperProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Context.Provider
          value={{
            currentID,
            setCurrentID,
            isDarkTheme,
            setDarkTheme,
            isHideDesc,
            setHideDesc,
            isHeaderLeft,
            setHeaderLeft,
            isAnimation,
            setAnimation,
            isHeaderShadow,
            setHeaderShadow,
          }}
        >
          <Stack
            screenOptions={{
              statusBarColor: theme.colors.background,
              statusBarStyle: isDarkTheme ? "light" : "dark",
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="(tabs)"
            />
            {/* <Stack.Screen
              name="modal"
              options={{
                animation: isAnimation ? "slide_from_right" : "none",
                statusBarAnimation: "slide",
                title: "Настройки",
                headerTintColor: isDarkTheme
                  ? Colors.dark.text
                  : Colors.light.text,
                headerStyle: {
                  backgroundColor: isDarkTheme
                    ? Colors.dark.background
                    : Colors.light.background,
                },
                presentation: "modal",
                headerTitleAlign: isHeaderLeft ? "left" : "center",
              }}
            />
            <Stack.Screen
              name="modalProfile"
              options={{
                animation: isAnimation ? "slide_from_right" : "none",
                statusBarAnimation: "slide",
                title: `№ ${currentID}`,
                headerTintColor: isDarkTheme
                  ? Colors.dark.text
                  : Colors.light.text,
                headerStyle: {
                  backgroundColor: isDarkTheme
                    ? Colors.dark.background
                    : Colors.light.background,
                },
                presentation: "modal",
                headerTitleAlign: isHeaderLeft ? "left" : "center",
              }}
            /> */}
          </Stack>
        </Context.Provider>
      </PaperProvider>
    </>
  );
}
