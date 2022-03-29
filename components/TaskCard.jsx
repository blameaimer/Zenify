import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import DeleteTask from "./DeleteTask";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db, auth } from "../firebase";
const TaskCard = ({ item, setTasks }) => {
  const [completed, setCompleted] = useState(false);

  const userName = auth.currentUser?.displayName;
  const SessionRef = db.ref("users").child(userName);

  return (
    <Swipeable
      renderRightActions={() => <DeleteTask setTasks={setTasks} item={item} />}
    >
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setCompleted(!completed)}>
          {completed ? (
            <MaterialCommunityIcons
              name="circle-slice-8"
              color={"#008bbe"}
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="circle-outline"
              color={"#008bbe"}
              size={20}
            />
          )}
        </TouchableOpacity>
        <Text style={completed ? styles.text : styles.textcompleted}>
          {item.key}
        </Text>
      </View>
    </Swipeable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#22303C",
    color: "#8899A6",
    flexGrow: 1,
    padding: 15,
    borderColor: "#22303C",
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
    flexDirection: "row",
  },
  text: {
    color: "#404040",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  textcompleted: {
    color: "#8899A6",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
});
