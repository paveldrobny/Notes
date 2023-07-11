import React from "react";
import { StyleSheet } from "react-native";
import {
  TouchableRipple,
  Text,
  List,
  Divider,
  Button,
  IconButton,
  useTheme,
} from "react-native-paper";
import { View } from "./Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function Task({ value, task }: { value: any; task: any }) {
  const theme = useTheme();

const [test, setTest] = React.useState("s");

  const taskFilter = (task: any) => {
    return task.date === value;
  };

  //   const countInSection = task.filter((t: any) => t.date === value).length;

  return (
    <View style={styles.content}>
      <List.Section>
        <List.Subheader
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            color: theme.colors.onBackground,
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          {value}
        </List.Subheader>
        {task
          .filter((t: any) => taskFilter(t))
          .map((t: any, index: number) => {
            return (
              <>
              <Text>{test}</Text>
                <List.Item
                  title={t.title}
                  description={t.description}
                  titleNumberOfLines={2}
                  descriptionNumberOfLines={3}
                  disabled={false}
                  titleStyle={{ fontWeight: "bold", marginBottom: 5 }}
                  left={(props) => (
                    <IconButton
                      icon={t.isCompleted ? "check-circle" : "circle-outline"}
                      style={{ borderRadius: 50 }}
                      onPress={() => setTest("11231")}
                    />
                    // <MaterialCommunityIcons
                    //   name={t.isCompleted ? "check-circle" : "circle-outline"}
                    //   size={23}
                    //   color={theme.colors.onBackground}
                    // />
                  )}
                  right={(props) => (
                    <IconButton
                      icon="trash-can-outline"
                      iconColor={theme.colors.error}
                      style={{ marginRight: -22, borderRadius: 50 }}
                      onPress={() => setTest("Sdasdasd")}
                    />
                    // <MaterialCommunityIcons
                    //   onPress={() => console.log("DELETED")}
                    //   name={"trash-can-outline"}
                    //   size={t.isCompleted ? 23 : 0}
                    //   color={theme.colors.error}
                    //   style={{ marginLeft: 10, marginRight: -21 }}
                    // />
                  )}
                />
                <Divider />
              </>
            );
          })}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 8,
    paddingHorizontal: 0,
  },
});
