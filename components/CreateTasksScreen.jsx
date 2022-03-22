import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function CreateTasksScreen() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks((prevTodos) => {
      return [{ task: text, id: uuidv4() }, ...prevTodos];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <Text style={styles.title}>Tasklist</Text>
          <View style={styles.content}>
            <AddTask addTask={addTask} />
            <View style={styles.list}>
              <FlatList
                data={tasks}
                renderItem={({ item }) => (
                  <TaskCard setTasks={setTasks} item={item} />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  content: {
    padding: 40,
    paddingHorizontal: 20,
  },
  list: {
    marginTop: 30,
  },
  taskButton: {
    alignItems: "flex-end",
  },
});
