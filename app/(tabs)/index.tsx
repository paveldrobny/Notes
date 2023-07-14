import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Context } from "../../context";
import { ContextType } from "../../types";
import Colors from "../../constants/Colors";
import {
  SegmentedButtons,
  Text,
  Card,
  Divider,
  IconButton,
  useTheme,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";
import { View } from "../../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const theme = useTheme();
  const { isDarkTheme } = React.useContext(Context) as ContextType;
  const [visibleAddDialog, setVisibleAddDialog] = React.useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = React.useState(false);

  const [currentID, setCurrentID] = React.useState(0);
  const [currentName, setCurrentName] = React.useState("");

  const [notes, setNotes] = React.useState<Array<INote>>([]);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  interface INote {
    title: string;
    description: string;
    date: string;
  }

  React.useEffect(() => {
    getData();
  }, []);

  function addNotes() {
    if (title.trim()) {
      const obj = {
        title: title,
        description: desc,
        date: new Date().toLocaleString(),
      };

      notes.push(obj);
      setNotes(notes);
      storeData();

      setTitle("");
      setDesc("");
    }
  }

  function removeDialog(title: string, id: any) {
    setVisibleRemoveDialog(true);
    setCurrentName(title);
    setCurrentID(id);
  }

  function removeTask(id: any) {
    let array = notes;

    array.splice(id, 1);
    setNotes(array);
    storeData();
    getData();
    setCurrentName("")
    setCurrentID(-1);
    setVisibleRemoveDialog(false);
  }

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem("notes-list", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes-list");
      return jsonValue != null
        ? setNotes(JSON.parse(jsonValue))
        : AsyncStorage.setItem("notes-list", JSON.stringify(notes));
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.horizontal}>
        <Text variant="titleMedium" style={{ textAlign: "center" }}>
          {`Всего: ${notes.length}`}
        </Text>
        <IconButton
          icon="plus"
          size={20}
          mode="contained"
          onPress={() => setVisibleAddDialog(true)}
        />
      </View>
      <Portal>
        <Dialog
          visible={visibleAddDialog}
          onDismiss={() => setVisibleAddDialog(false)}
        >
          <Dialog.Title>Добавить заметку</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              outlineStyle={styles.textInput}
              label="Название"
              value={title}
              style={{ marginBottom: 10 }}
              onChangeText={(desc) => setTitle(desc)}
            />
            <TextInput
              mode="outlined"
              outlineStyle={[styles.textInput]}
              label="Описание (необязательно)"
              value={desc}
              multiline={true}
              style={{ height: 100 }}
              onChangeText={(desc) => setDesc(desc)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={addNotes}>
              Добавить
            </Button>
            <Button onPress={() => setVisibleAddDialog(false)}>Отмена</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={visibleRemoveDialog}
          onDismiss={() => setVisibleRemoveDialog(false)}
        >
          <Dialog.Title>Удалить заметку?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Заметка "{currentName}" будет удалена
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={() => removeTask(currentID)}>
              Удалить
            </Button>
            <Button onPress={() => setVisibleRemoveDialog(false)}>
              Отмена
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView style={styles.scroll}>
        {notes.map((note, index) => {
          return (
            <Card key={index} mode="elevated" style={{ marginVertical: 5 }}>
              <Card.Content>
                <Text variant="titleLarge">{note.title}</Text>
                <Text variant="bodyMedium">{note.description}</Text>
                <Divider style={{ marginVertical: 5 }} />

                <View style={styles.view}>
                  <Text variant="bodyMedium">{note.date}</Text>
                  <IconButton
                    icon="trash-can-outline"
                    iconColor={theme.colors.error}
                    size={22}
                    style={{ marginBottom: 0 }}
                    onPress={() => removeDialog(note.title, index)}
                  />
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  horizontal: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  view: {
    backgroundColor: "trasparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderRadius: 8,
  },
});
