import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text, BottomNavigation } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Context } from "../../context";
import { ContextType } from "../../types";
import { CommonActions } from "@react-navigation/native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
  isHideDesc: boolean;
}) {
  return (
    <MaterialIcons
      size={props.isHideDesc === true ? 27 : 23}
      style={{ height: 30, marginBottom: props.isHideDesc ? -22 : -30 }}
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

function SettingsButton(color: string) {
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <MaterialIcons
            name="cog"
            size={23}
            color={color}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const { isDarkTheme, isHideDesc } = React.useContext(Context) as ContextType;
  const colorScheme = isDarkTheme ? "dark" : "light";

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          elevation: 5,
          shadowRadius: 5,
          shadowColor: "black",
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTitleStyle: { color: Colors[colorScheme ?? "light"].text },
        tabBarStyle: {
          height: 65,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
              ? FocusedButton(color, "home", isHideDesc)
              : NormalButton(color, "home-outline", isHideDesc);
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
              ? FocusedButton(color, "home", isHideDesc)
              : NormalButton(color, "home-outline", isHideDesc);
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
