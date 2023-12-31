import * as React from "react";
import { StyleSheet } from "react-native";
import { Context } from "../../context";
import { ContextType } from "../../types";
import { expo } from "../../app.json";
import { Divider, List, Text, useTheme } from "react-native-paper";
import { View } from "../../components/Themed";
import { Switch } from "../../components/Switch";

export default function TabThreeScreen() {
  const {
    isDarkTheme,
    setDarkTheme,
    isHideDesc,
    setHideDesc,
    isHeaderShadow,
    setHeaderShadow,
  } = React.useContext(Context) as ContextType;

  return (
    <View style={[styles.container]}>
      <List.Section style={styles.section}>
        <List.Subheader>Персонализация</List.Subheader>
        <Switch
          label="Темная тема"
          value={isDarkTheme}
          setValue={setDarkTheme}
        />
        <Divider />
        <Switch
          label="Скрыть описание иконок"
          value={isHideDesc}
          setValue={setHideDesc}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader>Dev</List.Subheader>
        <Switch
          label="Shadow in header"
          value={isHeaderShadow}
          setValue={setHeaderShadow}
        />
        <Divider />
      </List.Section>

      <View style={styles.about}>
        <Text style={styles.aboutText}>
          {expo.name} v{expo.version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  section: {
    width: "100%",
    marginTop: 5,
  },

  about: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    paddingLeft: 10,
  },
  aboutText: {
    fontSize: 18,
  },
});
