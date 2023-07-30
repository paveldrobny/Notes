import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import React from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Context } from "../../context";
import { ContextType } from "../../types";
import { CommonActions } from "@react-navigation/native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  isHideDesc: boolean;
}) {
  return (
    <MaterialCommunityIcons
      size={props.isHideDesc === true ? 27 : 23}
      style={{ height: 30, marginBottom: props.isHideDesc ? -22 : -31 }}
      {...props}
    />
  );
}

function FocusedButton(color: string, icon: any, isHideDesc: boolean) {
  return (
    <View style={styles.navigationContent}>
      <TabBarIcon name={icon} color={color} isHideDesc={isHideDesc} />
    </View>
  );
}

function NormalButton(color: string, icon: any, isHideDesc: boolean) {
  return (
    <View style={styles.navigationContent}>
      <TabBarIcon name={icon} color={color} isHideDesc={isHideDesc} />
    </View>
  );
}

export default function TabLayout() {
  const theme = useTheme();
  const { isDarkTheme, isHideDesc, isHeaderShadow, setHeaderShadow } =
    React.useContext(Context) as ContextType;
  const colorScheme = isDarkTheme ? "dark" : "light";

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          elevation: isHeaderShadow ? 5 : 0,
          shadowRadius: isHeaderShadow ? 5 : 0,
          shadowColor: isHeaderShadow ? "black" : "transparent",
          borderBottomWidth: isHeaderShadow ? 1 : 0,
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontSize: 21,
          color: Colors[colorScheme ?? "light"].text,
        },
        tabBarStyle: {
          height: 65,
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: isHeaderShadow
          ? Colors[colorScheme ?? "light"].tint
          : "transparent",
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Заметки",
          tabBarLabel: isHideDesc ? "" : "Заметки",
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIcon: ({ color, focused }) => {
            return focused
              ? FocusedButton(color, "note", isHideDesc)
              : NormalButton(color, "note-outline", isHideDesc);
          },
          // headerRight: () =>
          //   SettingsButton(Colors[colorScheme ?? "light"].text),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Задачи",
          tabBarLabel: isHideDesc ? "" : "Задачи",
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIcon: ({ color, focused }) => {
            return focused
              ? FocusedButton(color, "text-box", isHideDesc)
              : NormalButton(color, "text-box-outline", isHideDesc);
          },
          // headerRight: () =>
          //   SettingsButton(Colors[colorScheme ?? "light"].text),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Настройки",
          tabBarLabel: isHideDesc ? "" : "Настройки",
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIcon: ({ color, focused }) => {
            return focused
              ? FocusedButton(color, "cog", isHideDesc)
              : NormalButton(color, "cog-outline", isHideDesc);
          },
          // headerRight: () =>
          //   SettingsButton(Colors[colorScheme ?? "light"].text),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navigationContent: {
    width: "100%",
    height: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    top: -21,
    width: 35,
    height: 4,
    borderRadius: 5,
    borderBottomWidth: 4,
  },
});
