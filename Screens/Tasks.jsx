import { StyleSheet, SafeAreaView, FlatList, Text, View } from "react-native";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { useState, useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../firebase";

export default function CreateTasksScreen() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userName = auth.currentUser?.displayName;
    const taskRef = db.ref("users").child(userName).child("tasks");
    const listener = taskRef.orderByChild("index").on(
      "value",
      (snapshot) => {
        const fetchedTasks = [];
        snapshot.forEach((task) => {
          fetchedTasks.push(task);
        });
        setTasks(fetchedTasks);
      },
      (errorObject) => {
        console.log("The readfailed: " + errorObject);
      }
    );
    return () => taskRef.off("value", listener);
  }, [db]);

  const addTask = (text) => {
    const userName = auth.currentUser?.displayName;
    const taskRef = db.ref("users").child(userName).child("tasks");
    taskRef.child(text).set({
      index: tasks.length + 1,
      id: uuidv4(),
      key: text,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AddTask addTask={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard setTasks={setTasks} item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#121212",
  },

  content: {
    padding: 40,
    paddingHorizontal: 20,
  },
  taskButton: {
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
