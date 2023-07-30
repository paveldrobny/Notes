import React from "react";
import { StyleSheet } from "react-native";
import {
  List,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";
import { View } from "./Themed";

export function Task({
  value,
  task,
  completed,
  remove,
}: {
  value: any;
  task: any;
  completed: any;
  remove: any;
}) {
  const theme = useTheme();

  const taskFilter = (task: any) => {
    return task.date === value;
  };

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
              <View key={index}>
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
                      onPress={() => completed(t.title)}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      icon="trash-can-outline"
                      iconColor={theme.colors.error}
                      size={t.isCompleted ? 24 : 0}
                      disabled={!t.isCompleted}
                      style={{ marginRight: -22, borderRadius: 50 }}
                      onPress={() => remove(t.title)}
                    />
                  )}
                />
                <Divider />
              </View>
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
