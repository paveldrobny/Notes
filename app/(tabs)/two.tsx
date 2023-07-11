import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Context } from "../../context";
import { ContextType } from "../../types";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SegmentedButtons,
  Text,
  Card,
  Divider,
  Button,
  List,
} from "react-native-paper";
import { View } from "../../components/Themed";
import { Task } from "../../components/Task";

export default function TabTwoScreen() {
  const { isDarkTheme } = React.useContext(Context) as ContextType;

  interface ITask {
    title: string;
    description: string;
    isCompleted: boolean;
    date: string;
  }

  const [tasks, setTasks] = React.useState<Array<ITask>>([
    {
      title: "b",
      description:
        "Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 ",
      isCompleted: true,
      date: "05.05.2023",
    },
    {
      title: "a",
      description:
        "Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 Описание заметки №1 ",
      isCompleted: false,
      date: "15.05.2023",
    },
    {
      title: "Заметка №1",
      description: "Описание заметки №1",
      isCompleted: false,
      date: "05.06.2023",
    },
    {
      title: "Заметка №1",
      description: "",
      isCompleted: false,
      date: "05.06.2023",
    },
    {
      title: "Заметка №1",
      description: "",
      isCompleted: false,
      date: "05.06.2023",
    },
  ]);

  const unique = (array: any) => {
    return array.filter((item: any, index: number) => {
      return array.indexOf(item) === index;
    });
  };

  const categories = unique(
    tasks.map((task: any) => {
      return task.date;
    })
  );

  const completedCount = tasks
    .filter((task: any) => task.isCompleted === true)
    .map((task) => task.isCompleted).length;

  return (
    <View style={[styles.container]}>
      <Text
        variant="titleMedium"
        style={{ textAlign: "center", marginVertical: 15 }}
      >
        {`Выполненно:  ${completedCount} / ${tasks.length}`}
      </Text>
      <ScrollView style={{ flex: 1, marginBottom: 5 }}>
        {categories
          .sort((a: any, b: any) => {
            a = a.split(".").reverse().join("");
            b = b.split(".").reverse().join("");
            return a < b ? 1 : a > b ? -1 : 0;
          })
          .map((category: any, index: number) => {
            return <Task key={index} value={category} task={tasks} />;
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
