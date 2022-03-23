import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

const TaskCard = ({ item, setTasks }) => {
  const deleteHandler = () => {
    setTasks((prevTasks) => {
      console.log(prevTasks);
      const newTasks = prevTasks.filter((el) => el.id != item.id);
      return [...newTasks];
    });
  };

  const createDeleteAlert = () =>
    Alert.alert("Warning", "Are you sure you want to delete this?", [
      {
        text: "Yes",
        onPress: () => {
          deleteHandler();
        },
      },
      {
        text: "No",
        onPress: () => {
          null;
        },
      },
    ]);

  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <Text>{item.task}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={createDeleteAlert}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    padding: 15,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
  },
});

// fade affect onpress for addin task,
// pop up text pad 
//signout to be in the nav top left, 
