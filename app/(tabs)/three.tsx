import * as React from "react";
import { StyleSheet } from "react-native";
import { Context } from "../../context";
import { ContextType } from "../../types";
import Colors from "../../constants/Colors";
import { expo } from "../../app.json";
import { Divider, List, Text } from "react-native-paper";
import { View } from "../../components/Themed";
import { Switch } from "../../components/Switch";

export default function TabThreeScreen() {
  const {
    isDarkTheme,
    setDarkTheme,
    isHideDesc,
    setHideDesc,
    isHeaderLeft,
    setHeaderLeft,
    isAnimation,
    setAnimation,
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
        <Divider />
        <Switch
          label="Титулка модальных окон слева"
          value={isHeaderLeft}
          setValue={setHeaderLeft}
        />
        <Divider />
        <Switch
          label="Анимации переходов"
          value={isAnimation}
          setValue={setAnimation}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader>{expo.name} v{expo.version}</List.Subheader>
      </List.Section>
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
});
