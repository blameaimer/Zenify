import {StyleSheet, View, TextInput, Button} from "react-native"
import {useState} from "react"

const AddTask = (props) => {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  const {addTask} = props;
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        onChangeText={changeHandler}
      ></TextInput>
       <Button
          style={styles.taskButton}
          title="add task"
          color="blue"
          onPress={() => addTask(text)}
        />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
