import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState } from "react";

const AddTask = (props) => {
  const [inputText, setInputText] = useState("");

  const changeHandler = (val) => {
    setInputText(val);
  };

  const { addTask } = props;
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        onChangeText={changeHandler}
        value={inputText}
      ></TextInput>
      <Button
        style={styles.taskButton}
        title="add task"
        color="blue"
        onPress={() => {
          addTask(inputText)
          setInputText("");
        }}
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
