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
  IconButton,
  Dialog,
  TextInput,
  Portal,
} from "react-native-paper";
import { View } from "../../components/Themed";
import { Task } from "../../components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  const { isDarkTheme } = React.useContext(Context) as ContextType;
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const setVisibility = (isVisible: boolean) => setVisible(isVisible);

  interface ITask {
    title: string;
    description: string;
    isCompleted: boolean;
    date: string;
  }

  const [tasks, setTasks] = React.useState<Array<ITask>>([]);

  React.useEffect(() => {
    getData();
  }, []);

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

  const isEmptyTitle = () => {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].title === title) {
        return false;
      }
    }
    return true;
  };

  function addTask() {
    if (title.trim()) {
      if (isEmptyTitle()) {
        const obj = {
          title: title,
          description: desc,
          isCompleted: false,
          date: new Date().toLocaleDateString(),
        };

        
        tasks.push(obj);
        setTasks(tasks);
        storeData();

        setTitle("");
        setDesc("");
      }
    }
  }

  function completedTask(id: any) {
    setTasks(
      tasks.map((task) => {
        if (task.title === id) {
          task.isCompleted = !task.isCompleted;
          
          console.log("SDasd")
          storeData();
        }
        return task;
      })
    );
  }

  const removeTask = async (id: any) => {
    setTasks(
      tasks.map((task, index) => {
        if (task.title === id) {
          tasks.splice(index, 1);
          storeData();
          getData();
          console.log(index)
        }
        return task;
      })
    );
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("task-list", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("task-list");
      return jsonValue != null
        ? setTasks(JSON.parse(jsonValue))
        : AsyncStorage.setItem("task-list", JSON.stringify(tasks));
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.horizontal}>
        <Text variant="titleMedium" style={{ textAlign: "center" }}>
          {`Выполнено:  ${completedCount} / ${tasks.length}`}
        </Text>
        <IconButton
          icon="plus"
          size={20}
          mode="contained"
          onPress={() => setVisibility(true)}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisibility(false)}>
          <Dialog.Title>Добавить задачу</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              style={{ marginBottom: 10 }}
              outlineStyle={styles.textInput}
              label="Название"
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
            <TextInput
              mode="outlined"
              outlineStyle={styles.textInput}
              label="Описание (необязательно)"
              value={desc}
              onChangeText={(desc) => setDesc(desc)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={addTask}>
              Добавить
            </Button>
            <Button onPress={() => setVisibility(false)}>Отмена</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView style={{ flex: 1, marginBottom: 5 }}>
        {categories
          .sort((a: any, b: any) => {
            a = a.split(".").reverse().join("");
            b = b.split(".").reverse().join("");
            return a < b ? 1 : a > b ? -1 : 0;
          })
          .map((category: any, index: number) => {
            return (
              <Task
                key={index}
                value={category}
                task={tasks}
                completed={completedTask}
                remove={removeTask}
              />
            );
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
  horizontal: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  textInput: {
    borderRadius: 8,
  },
});
