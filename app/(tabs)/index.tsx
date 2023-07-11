import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Context } from "../../context";
import { ContextType } from "../../types";
import Colors from "../../constants/Colors";
import { SegmentedButtons, Text, Card, Divider } from "react-native-paper";
import { View } from "../../components/Themed";

export default function TabOneScreen() {
  const [value, setValue] = React.useState("Бакалавриат");
  const { isDarkTheme } = React.useContext(Context) as ContextType;

  const [notes, setNotes] = React.useState([
    {
      title: "Заметка №1",
      description: "Описание заметки №1",
      date: "22.06.2023"
    },
    {
      title: "Заметка №1",
      description: "Описание заметки №1",
      date: "22.06.2023"
    },
  ]);

  return (
    <View style={[styles.container]}>
      {notes.map((note) => {
        return (
          <Card mode="elevated" style={{marginVertical: 5}}>
            <Card.Content>
              <Text variant="titleLarge">{note.title}</Text>
              <Text variant="bodyMedium">{note.description}</Text>
              <Divider style={{ marginVertical: 5 }} />
              <Text variant="bodyMedium" style={{textAlign: "right"}}>{note.date}</Text>
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
