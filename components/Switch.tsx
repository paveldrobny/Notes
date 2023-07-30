import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Context } from "../context";
import { ContextType } from "../types";
import Colors from "../constants/Colors";
import { ISwitch } from "../constants/Interfaces";

export function Switch(props: ISwitch) {
  const theme = useTheme();
  const { isDarkTheme } = React.useContext(Context) as ContextType;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props.setValue(!props.value)}
      style={[styles.switchItem]}
    >
      <View style={styles.switchContent}>
        <Text
          style={[
            { color: isDarkTheme ? Colors.dark.text : Colors.light.text },
            styles.switchText,
          ]}
        >
          {props.label}
        </Text>
        <View
          style={[
            styles.switch,
            {
              borderColor: isDarkTheme ? Colors.dark.text : Colors.light.text,
              backgroundColor: isDarkTheme
                ? Colors.dark.background
                : Colors.light.background,
            },
            props.value
              ? { backgroundColor: theme.colors.primary }
              : styles.nonActive,
          ]}
        >
          <View
            style={[
              {
                backgroundColor: isDarkTheme
                  ? Colors.dark.text
                  : Colors.light.text,
              },
              props.value
                ? [
                    {
                      backgroundColor: isDarkTheme
                        ? Colors.light.text
                        : Colors.dark.text,
                    },
                    styles.dotActive,
                  ]
                : styles.dot,
            ]}
          ></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchItem: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  switchContent: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchText: {
    fontSize: 17,
  },
  switch: {
    width: 41,
    height: 20,
    borderRadius: 50,
    overflow: "hidden",
  },
  active: {
    backgroundColor: "rgb(0, 64, 162)",
  },
  nonActive: {
    borderWidth: 1,
  },
  dot: {
    position: "absolute",
    top: 3,
    left: 3,
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  dotActive: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 50,
  },
});
