import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Text } from "react-native-paper";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Не найденно" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Не найденно</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Вернутся на главную</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
