import { StyleSheet, Text, TouchableOpacity,View } from "react-native";


const TaskCard = ({ item, setTasks, prevTodos }) => {

  // const deleteHandler = () => {


    
  // }

  return (
    <View style={styles.item}>
      <TouchableOpacity >
        <Text>{item.task}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Text onPress={deleteHandler}>Delete</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
  },
});
